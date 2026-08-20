"use client";

import React, { useEffect, useRef, useState } from "react";

import styles from "./OsagoApply.module.scss";

import SvgSelector from "@/components/ui/SvgSelector/SvgSelector";
import { ESvgName } from "@/constants/svg-ids.constants";

import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { IOsagoApplyForm } from "@/types/OsagoApplyForm/IOsagoApplyForm";
import { IOsagoPaymentCalculation } from "@/types/policy.types";
import { IOsagoApplyPrefill } from "@/helpers/Apply/applyPrefill.helper";

import { useOsagoFormConfig } from "@/hooks/useOsagoFormConfig";
import { useGetCarBrands } from "@/hooks/cars/useGetCarBrands";
import { useNavigation } from "@/hooks/navigation/useNavigation";
import { useGetPaymentCalculation } from "@/hooks/policy/useGetPaymentCalculation";

import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Substrate from "@/components/ui/Substrate/Substrate";
import Button from "@/components/ui/Button/Button";
import Loader from "@/components/ui/Loader/Loader";
import CountedPrice from "@/components/features/CountedPrice/CountedPrice";
import TariffPrice from "@/components/features/TariffPrice/TariffPrice";

import useOsagoApplyCarMark from "@/stores/OsagoApply/osagoApplyCarMark.store";
import useCurrientCar from "@/stores/Cars/currientCar";
import useCurrientOsagoPolicy from "@/stores/Policy/currientOsagoPolicy";
import usePromocodeEvent from "@/stores/Promocode/promocodeEvent.store";

import { formatDataToCreateOsagoRequest } from "@/helpers/OsagoApply/formatDataToCreateOsagoRequest";
import {
  pickOsagoApplyFormData,
  pickOsagoApplyFormDataFromPolicy,
} from "@/helpers/OsagoApply/pickOsagoApplyFormData";
import OsagoApplyFields from "@/components/features/OsagoApplyFields/OsagoApplyFields";
import useCurrientOsagoPolicyCalculation from "@/stores/Policy/currientOsagoPolicyCalculation";
import useCurrientCarCategoryAndDuration from "@/stores/Policy/currientCarCategoryAndDuration.store";
import { useGetCarBrandsV2 } from "@/hooks/cars/useGetCarBrandsV2";
import { isAuthorized } from "@/helpers/auth/isAuthorized.helper";
import useShadow from "@/stores/Shadow/shadow.store";
import { ModalAuth } from "../ModalAuth/ModalAuth";

const TAXI_CATEGORY =
  "Автотранспортные средства, используемые в качестве такси и по найму";
const MINIMAL_DURATION = "До 15 суток";
const DEFAULT_TAXI_DURATION = "До 30 суток";
const DEFAULT_MINIMAL_DURATION_CATEGORY =
  "Легковые автомобили, микроавтобусы с числом посадочных мест до 8 включительно";

// небольшая задержка, чтобы не дёргать расчёт дважды,
// когда категория и срок меняются друг за другом
const AUTO_CALCULATION_DELAY = 350;

interface IProps {
  prefill?: IOsagoApplyPrefill;
}

const OsagoApply = ({ prefill }: IProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const promocodeRef = useRef<string>("");
  const { reloadPage } = useNavigation();

  const { config, isLoading } = useOsagoFormConfig();
  const { navigateToOsagoConfirm } = useNavigation();

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    watch,
    clearErrors,
    unregister,
  } = useForm<IOsagoApplyForm>({
    defaultValues: {
      transport_category: prefill?.transport_category || "",
      duration_of_stay: prefill?.duration_of_stay || "",
    },
  });

  const [isCarsBrandsLoaded, setIsCarsBrandsLoaded] = useState(false);
  const [isInitialLoaded, setIsInitialLoaded] = useState(false);
  const [isAuthVisible, setIsAuthVisible] = useState<boolean>(false);
  const [isOwner, setIsOwner] = useState<boolean>(true);
  const [appliedPromocode, setAppliedPromocode] = useState<string>("");
  const [price, setPrice] = useState<IOsagoPaymentCalculation | undefined>();

  const currientCar = useCurrientCar((state) => state.car);
  const setIsAnotherCarMark = useOsagoApplyCarMark(
    (state) => state.setCarMarkValue
  );
  const currientPolicy = useCurrientOsagoPolicy((state) => state.policy);
  const setPolicy = useCurrientOsagoPolicy((state) => state.setPolicy);
  const setPolicyCalculationData = useCurrientOsagoPolicyCalculation(
    (state) => state.setCalculationData
  );
  const setTrigger = usePromocodeEvent((state) => state.setTrigger);
  const carCategoryOsago = useCurrientCarCategoryAndDuration(
    (state) => state.carCategory
  );
  const durationOsago = useCurrientCarCategoryAndDuration(
    (state) => state.duration
  );
  const setCarCategoryOsago = useCurrientCarCategoryAndDuration(
    (state) => state.setCarCategory
  );

  const { carsBrands, isLoading: isCarsBrandsLoading } = useGetCarBrandsV2();
  const {
    data: paymentCalculationData,
    isError: isPaymentCalculationError,
    isPending: isPaymentCalculationPending,
    isSuccess: isPaymentCalculationSuccess,
    mutate: mutatePaymentCalculation,
  } = useGetPaymentCalculation();

  const [transportCategoryWatch, durationOfStayWatch, promocodeWatch] = watch([
    "transport_category",
    "duration_of_stay",
    "promocode",
  ]);
  const brandWatch = watch(["brand"]);

  useEffect(() => {
    // такси нельзя оформить на 15 суток — подставляем ближайший доступный срок
    if (carCategoryOsago !== TAXI_CATEGORY) return;

    const currientDuration = getValues("duration_of_stay");

    if (!currientDuration || currientDuration === MINIMAL_DURATION) {
      setValue("duration_of_stay", DEFAULT_TAXI_DURATION);
    }
  }, [carCategoryOsago]);

  useEffect(() => {
    // на 15 суток доступны только легковые — остальные категории не подменяем
    if (durationOsago !== MINIMAL_DURATION) return;

    const currientCategory = getValues("transport_category");

    if (!currientCategory || currientCategory === TAXI_CATEGORY) {
      setValue("transport_category", DEFAULT_MINIMAL_DURATION_CATEGORY);
    }
  }, [durationOsago]);

  useEffect(() => {
    // категория из ссылки может устареть — сверяем со списком с бэкенда
    if (isLoading || !config.tariff) return;

    const currientCategory = getValues("transport_category");

    if (!currientCategory) return;

    const categoryOptions = config.tariff.find(
      (field) => field.name === "transport_category"
    )?.options;

    if (!categoryOptions) return;

    const isKnownCategory = categoryOptions.some(
      (option) => option.value === currientCategory
    );

    if (!isKnownCategory) {
      setValue("transport_category", "");
      setCarCategoryOsago("");
    }
  }, [isLoading]);

  useEffect(() => {
    if (carsBrands && !isCarsBrandsLoaded) {
      setIsCarsBrandsLoaded(true);
    }
  }, [isCarsBrandsLoading]);

  useEffect(() => {
    console.log("Текущий автомобиль");
    console.log(currientCar);
    async function resetValues() {
      if ((currientCar || currientPolicy) && carsBrands) {
        let pickedData;

        if (currientCar && !currientPolicy) {
          pickedData = await pickOsagoApplyFormData(currientCar, carsBrands);
        } else if (currientPolicy) {
          pickedData = await pickOsagoApplyFormDataFromPolicy(
            currientPolicy,
            carsBrands
          );
        }

        let found;

        if (currientCar) {
          found = await carsBrands.find(
            (item) => item.name === currientCar.brand
          );
          await setValue(
            "brand",
            Boolean(found) ? currientCar.brand : "Другое ТС"
          );
        } else if (currientPolicy) {
          found = await carsBrands.find(
            (item) => item.name === currientPolicy.brand
          );

          if (
            currientPolicy.insurant_fio &&
            (currientPolicy.insurant_fio !== currientPolicy.fio ||
              currientPolicy.insurant_passport_number !==
                currientPolicy.passport_number)
          ) {
            setIsOwner(false);
          } else {
            setIsOwner(true);
          }

          await setValue(
            "brand",
            Boolean(found) ? currientPolicy.brand : "Другое ТС"
          );
        }
        await setIsAnotherCarMark(!Boolean(found));

        await resetForm(pickedData);
        // setValue("model", pickedData?.model ? pickedData?.model : "");
      }
    }

    resetValues();
  }, [currientCar, isCarsBrandsLoaded]);

  const onSubmit: SubmitHandler<IOsagoApplyForm> = (data) => {
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
      const formatedData = formatDataToCreateOsagoRequest(data, isOwner);

      setPolicy(formatedData);
      setPolicyCalculationData(price);

      navigateToOsagoConfirm();
    }
  };

  function onFormError() {
    toast.error("Заполните все обязательные поля");
  }

  async function resetForm(data?: Partial<IOsagoApplyForm>) {
    await reset(data);

    setValue(
      "duration_of_stay",
      data?.duration_of_stay ? data?.duration_of_stay : ""
    );

    const timeoutId = setTimeout(() => {
      setIsInitialLoaded(true);
      clearTimeout(timeoutId);
    }, 900);
  }

  function scrollToTariff() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // расчёт стоимости идёт сам, как только выбраны категория ТС и срок
  useEffect(() => {
    if (!transportCategoryWatch || !durationOfStayWatch) {
      setPrice(undefined);
      return;
    }

    // ждём список категорий, чтобы не считать по значению из устаревшей ссылки
    if (isLoading) return;

    const timeoutId = setTimeout(() => {
      mutatePaymentCalculation({
        transport_category: transportCategoryWatch,
        duration_of_stay: durationOfStayWatch,
        promo_code: appliedPromocode,
      });
    }, AUTO_CALCULATION_DELAY);

    return () => clearTimeout(timeoutId);
  }, [transportCategoryWatch, durationOfStayWatch, appliedPromocode, isLoading]);

  useEffect(() => {
    if (isPaymentCalculationSuccess && paymentCalculationData) {
      setPrice(paymentCalculationData);
    }
  }, [isPaymentCalculationSuccess, paymentCalculationData]);

  useEffect(() => {
    promocodeRef.current = promocodeWatch || "";

    // промокод изменили — скидка действует только для применённого кода
    if (appliedPromocode && promocodeWatch !== appliedPromocode) {
      setAppliedPromocode("");
    }
  }, [promocodeWatch]);

  useEffect(() => {
    // кнопка «Применить» у поля промокода пересчитывает стоимость
    setTrigger(() => setAppliedPromocode(promocodeRef.current));
  }, []);

  useEffect(() => {
    if (isInitialLoaded || (!currientCar && !currientPolicy)) {
      setValue("model", "");
      setValue("vehicle_refined_make", "");
    }
  }, [JSON.stringify(brandWatch)]);

  useEffect(() => {
    let isMounted = true;

    if (isPaymentCalculationError && isMounted) {
      toast.error("Ошибка. Проверьте данные");
    }

    return () => {
      isMounted = false;
    };
  }, [isPaymentCalculationError]);

  useEffect(() => {
    if (isOwner) {
      setValue("insurant_fio", "");
      setValue("insurant_passport_number", "");
      unregister(["insurant_fio", "insurant_passport_number", "insurant_type"]);
    }
  }, [isOwner]);

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
          Оформить полис ОСАГО в Абхазии
        </CustomTitle>
        <p className={styles.subtitle}>
          <SvgSelector className={styles.subtitleIcon} id={ESvgName.TOOLTIP} />
          <span>
            Заполните данные автомобиля и срок пребывания, чтобы оформить
            обязательный полис ОСАГО для въезда в Абхазию онлайн. Готовый
            документ придёт на вашу почту.
          </span>
        </p>

        {isLoading ? (
          <Loader className={styles.loader} />
        ) : (
          <Substrate withShadow="light" className={styles.substrate}>
            <form
              ref={formRef}
              noValidate
              onSubmit={handleSubmit(onSubmit, onFormError)}
              action=""
            >
              <OsagoApplyFields
                config={config}
                control={control}
                clearErrors={clearErrors}
                isOwner={isOwner}
                setIsOwner={setIsOwner}
                priceSlot={
                  <TariffPrice
                    isLoading={isPaymentCalculationPending}
                    preliminaryCost={
                      price ? Number(price.base_tarif) : undefined
                    }
                    finalCost={price ? Number(price.tarif) : undefined}
                    hint="Появится, как только выберете категорию ТС и срок пребывания"
                  />
                }
              />

              {price ? (
                <CountedPrice
                  discount={Number(price.base_tarif) - Number(price.tarif)}
                  finalCost={Number(price.tarif)}
                  preliminaryCost={Number(price.base_tarif)}
                  className={styles.priceWrapper}
                />
              ) : (
                <Button
                  type="button"
                  className={styles.countButton}
                  variant="wide"
                  onClickEvent={scrollToTariff}
                  isLoading={isPaymentCalculationPending}
                >
                  Узнать стоимость
                </Button>
              )}
            </form>
          </Substrate>
        )}
      </ContentContainer>
    </section>
  );
};

export default OsagoApply;
