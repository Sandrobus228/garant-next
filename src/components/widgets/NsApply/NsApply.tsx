"use client";

import React, { useEffect, useRef, useState } from "react";

import styles from "./NsApply.module.scss";

import SvgSelector from "@/components/ui/SvgSelector/SvgSelector";
import { ESvgName } from "@/constants/svg-ids.constants";

import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import Substrate from "@/components/ui/Substrate/Substrate";
import { useFieldArray, useForm } from "react-hook-form";
import {
  EGenders,
  ICalculateNsPolicyResponseData,
  ICreateNsPolicyRequest,
  IInsuredCreationFilelds,
} from "@/types/policy.types";
import NsApplyInsuredList from "@/components/features/NsApplyInsuredList/NsApplyInsuredList";
import Button from "@/components/ui/Button/Button";
import NsApplyStaticFields from "@/components/entities/NsApplyStaticFields/NsApplyStaticFields";
import { useCalculateNs } from "@/hooks/policy/useCalculateNs";
import CountedPrice from "@/components/features/CountedPrice/CountedPrice";
import TariffPrice from "@/components/features/TariffPrice/TariffPrice";
import usePromocodeError from "@/stores/Promocode/promocodeError.store";
import usePromocodeEvent from "@/stores/Promocode/promocodeEvent.store";
import { useNavigation } from "@/hooks/navigation/useNavigation";
import useCurrientNsPolicy from "@/stores/Policy/currientNsPolicy";
import toast from "react-hot-toast";
import { isAuthorized } from "@/helpers/auth/isAuthorized.helper";
import { INsApplyPrefill } from "@/helpers/Apply/applyPrefill.helper";
import { ModalAuth } from "../ModalAuth/ModalAuth";

export const defaultInsuredValues: IInsuredCreationFilelds = {
  date_of_birth: "",
  fio: "",
  gender: EGenders.MAN,
  passport_number: "",
};

// небольшая задержка, чтобы не дёргать расчёт на каждое переключение
const AUTO_CALCULATION_DELAY = 350;

interface IProps {
  prefill?: INsApplyPrefill;
}

const NsApply = ({ prefill }: IProps) => {
  const { reloadPage } = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);
  const promocodeRef = useRef<string>("");

  const [appliedPromocode, setAppliedPromocode] = useState<string>("");
  const [price, setPrice] = useState<
    ICalculateNsPolicyResponseData | undefined
  >();

  const {
    data: calculateNsData,
    isError: isCalculateNsError,
    isPending: isCalculateNsPending,
    isSuccess: isCalculateNsSuccess,
    isPromocodeError,
    mutate: calculateNsMutate,
  } = useCalculateNs();

  const setTrigger = usePromocodeEvent((state) => state.setTrigger);
  const setPromocodeError = usePromocodeError((state) => state.setError);
  const currientNsPolicy = useCurrientNsPolicy((state) => state.policy);
  const setCurrientNsPolicy = useCurrientNsPolicy((state) => state.setPolicy);
  const setCurrientNsPolicyCalculation = useCurrientNsPolicy(
    (state) => state.setCalculationData
  );

  const [isAuthVisible, setIsAuthVisible] = useState<boolean>(false);

  const { navigateToNsConfirm } = useNavigation();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    clearErrors,
  } = useForm<ICreateNsPolicyRequest>({
    defaultValues: {
      insured: Array.from({ length: prefill?.quantity || 1 }, () => ({
        ...defaultInsuredValues,
      })),
      duration_of_stay: prefill?.duration_of_stay || "",
      promocode: "",
      start_date: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "insured",
    control,
  });

  const quantity = fields.length;

  useEffect(() => {
    if (currientNsPolicy) {
      reset(currientNsPolicy);
    }
  }, [currientNsPolicy]);

  const [durationOfStayWatch, promocodeWatch] = watch([
    "duration_of_stay",
    "promocode",
  ]);

  function handleQuantityChange(nextQuantity: number) {
    if (nextQuantity > quantity) {
      append(
        Array.from({ length: nextQuantity - quantity }, () => ({
          ...defaultInsuredValues,
        }))
      );
    } else if (nextQuantity < quantity) {
      remove(
        Array.from(
          { length: quantity - nextQuantity },
          (_, index) => nextQuantity + index
        )
      );
    }
  }

  // расчёт стоимости идёт сам, как только выбран срок пребывания
  useEffect(() => {
    if (!durationOfStayWatch) {
      setPrice(undefined);
      return;
    }

    const timeoutId = setTimeout(() => {
      calculateNsMutate({
        duration_of_stay: durationOfStayWatch,
        promocode: appliedPromocode,
        quantity,
      });
    }, AUTO_CALCULATION_DELAY);

    return () => clearTimeout(timeoutId);
  }, [durationOfStayWatch, quantity, appliedPromocode]);

  useEffect(() => {
    if (isCalculateNsSuccess && calculateNsData) {
      setPrice(calculateNsData);
    }
  }, [isCalculateNsSuccess, calculateNsData]);

  useEffect(() => {
    promocodeRef.current = promocodeWatch || "";

    // промокод изменили — скидка действует только для применённого кода
    if (appliedPromocode && promocodeWatch !== appliedPromocode) {
      setAppliedPromocode("");
    }
  }, [promocodeWatch]);

  useEffect(() => {
    // кнопка «Применить» у поля промокода пересчитывает стоимость
    setTrigger(() => {
      setPromocodeError(false);
      setAppliedPromocode(promocodeRef.current);
    });
  }, []);

  function onSubmit(data: ICreateNsPolicyRequest): void {
    if (!price) {
      toast.error("Не удалось рассчитать стоимость. Проверьте тариф");
      scrollToTariff();
      return;
    }

    if (!isAuthorized()) {
      toast.success("Войдите, чтобы продолжить", {
        duration: 4000,
      });

      setIsAuthVisible(true);
    } else {
      setCurrientNsPolicy(data);
      setCurrientNsPolicyCalculation(price);

      navigateToNsConfirm();
    }
  }

  function onFormError() {
    toast.error("Заполните все обязательные поля");
  }

  function scrollToTariff() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  useEffect(() => {
    if (!isCalculateNsError) return;

    if (isPromocodeError) {
      toast.error("Введите действующий промокод или оставьте поле пустым");
      setPromocodeError(true);
      // считаем стоимость без промокода, чтобы цена осталась на экране
      setAppliedPromocode("");
    } else {
      toast.error("Ошибка. Проверьте данные");
    }
  }, [isCalculateNsError, isPromocodeError]);

  function triggerSubmitForm() {
    formRef.current?.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    );
  }

  function handleSuccessAuth() {
    triggerSubmitForm();
    reloadPage();
    setIsAuthVisible(false);
  }

  return (
    <section className={styles.root}>
      <ModalAuth
        handleSuccessAuth={handleSuccessAuth}
        handleCloseAuth={() => setIsAuthVisible(false)}
        isOpen={isAuthVisible}
        setIsOpen={setIsAuthVisible}
      />

      <ContentContainer>
        <CustomTitle tag="h1" isCentered>
          Оформить полис от несчастного случая в Абхазии
        </CustomTitle>
        <p className={styles.subtitle}>
          <SvgSelector className={styles.subtitleIcon} id={ESvgName.TOOLTIP} />
          <span>
            Заполните данные застрахованных и срок пребывания, чтобы оформить
            обязательную страховку от несчастного случая для въезда в Абхазию
            онлайн. Готовый документ придёт на вашу почту.
          </span>
        </p>

        <form
          ref={formRef}
          action=""
          noValidate
          onSubmit={handleSubmit(onSubmit, onFormError)}
        >
          <Substrate withShadow="light" className={styles.substrate}>
            <NsApplyStaticFields
              clearErrors={clearErrors}
              control={control}
              quantity={quantity}
              setQuantity={handleQuantityChange}
              priceSlot={
                <TariffPrice
                  isLoading={isCalculateNsPending}
                  preliminaryCost={price ? price.base_tariff : undefined}
                  finalCost={price ? price.to_be_paid : undefined}
                  hint="Появится, как только выберете срок пребывания"
                />
              }
            />

            <div className={styles.insuredListWrapper}>
              <NsApplyInsuredList
                control={control}
                fields={fields}
                append={append}
                remove={remove}
                clearErrors={clearErrors}
              />
            </div>

            {price ? (
              <CountedPrice
                className={styles.countedPrice}
                finalCost={price.to_be_paid}
                preliminaryCost={price.base_tariff}
                discount={price.discount}
                type="ns"
              />
            ) : (
              <Button
                type="button"
                variant="wide"
                className={styles.submitButton}
                onClickEvent={scrollToTariff}
                isLoading={isCalculateNsPending}
              >
                Узнать стоимость
              </Button>
            )}
          </Substrate>
        </form>
      </ContentContainer>
    </section>
  );
};

export default NsApply;
