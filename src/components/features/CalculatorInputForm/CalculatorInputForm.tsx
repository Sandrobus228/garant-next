"use client";

import React, { useEffect, useState } from "react";

import CustomSelect, {
  IOptions,
} from "@/components/ui/CustomSelect/CustomSelect";
import Button from "@/components/ui/Button/Button";

import styles from "./CalculatorInputForm.module.scss";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  ICalculatorNsForm,
  ICalculatorNsFormFields,
  ICalculatorOsagoForm,
  ICalculatorOsagoFormFields,
} from "@/types/ICalculatorForms";
import { IFieldConfig } from "@/types/IFieldConfig";
import CalculatorPolicyPrice from "../CalculatorPolicyPrice/CalculatorPolicyPrice";
import { IOsagoApplyForm } from "@/types/OsagoApplyForm/IOsagoApplyForm";
import { calculatorPromoCategories, osagoTable } from "./tables.data";
import { useGetCarCategories } from "@/hooks/cars/useGetCarCategories";
import { useGetPaymentCalculation } from "@/hooks/policy/useGetPaymentCalculation";
import { useCalculateNs } from "@/hooks/policy/useCalculateNs";
import {
  buildNsApplyHref,
  buildOsagoApplyHref,
} from "@/helpers/Apply/applyPrefill.helper";

interface FormData {
  [key: string]: any;
}

interface IProps {
  config: { fields: IFieldConfig<ICalculatorOsagoForm & ICalculatorNsForm>[] };
  variant: "osago" | "ns";
}

function findValue(
  variant: "osago" | "ns",
  data: ICalculatorOsagoFormFields & ICalculatorNsFormFields
): string {
  if (variant === "osago") {
    const row = osagoTable.find((r) => r.rowHeader === data.car_category.value);
    if (row) {
      return row.columns[data.duration_of_stay_osago.value];
    }
  }

  if (variant === "ns") {
    const foundPrice = calculatorPromoCategories.find(
      (item) => item.value === data.duration_of_stay_ns.value
    )?.price;

    if (foundPrice) {
      const ammount = foundPrice * Number(data.number_of_people.value);

      return ammount.toString();
    }
  }

  return "";
}

const CalculatorInputForm = ({ config, variant }: IProps) => {
  const [isCorrect, setIsCorrect] = useState(false);
  const [foundPrice, setFoundPrice] = useState(0);
  const [isSubmittedOnce, setIsSubmittedOnce] = useState(false);
  const [formatedCarCategories, setFormatedCarCategories] =
    useState<IOptions[]>();
  const [filteredOsagoDuration, setFilteredOsagoDuration] = useState<
    IOptions[] | undefined
  >(config.fields[1].options);

  const [isFilteredOsagoDurationChanged, setIsFilteredOsagoDurationChanged] =
    useState<boolean>(false);
  const [isTaxiSelected, setIsTaxiSelected] = useState<boolean>(false);
  const [isMinimalDaysSelected, setIsMinimalDaysSelected] =
    useState<boolean>(false);

  const { categoriesData, isError, isLoading } = useGetCarCategories();
  const { data, mutate, isPending } = useGetPaymentCalculation();
  const {
    data: calculateNsData,
    mutate: calculateNs,
    isPending: isCalculateNsPending,
  } = useCalculateNs();

  useEffect(() => {
    if (categoriesData) {
      let formatedCategories: IOptions[] = [];

      formatedCategories = categoriesData.map((item) => ({
        label: item.Category,
        value: item.Category,
      }));

      setFormatedCarCategories(formatedCategories);
    }
  }, [isLoading]);

  const defaultValues = config.fields.reduce((acc, field) => {
    acc[field.name] =
      field.type === "checkbox" ? false : field.type === "select" ? null : "";
    return acc;
  }, {} as FormData);

  const { control, handleSubmit, reset, watch, formState, setValue } = useForm<
    ICalculatorOsagoFormFields & ICalculatorNsFormFields
  >({
    defaultValues,
    mode: "onSubmit",
  });

  const watchedFields = watch();

  useEffect(() => {
    console.log("carCategoryWatch");
    if (
      watchedFields?.car_category?.value ===
        "Автотранспортные средства, используемые в качестве такси и по найму" &&
      !isFilteredOsagoDurationChanged
    ) {
      console.log("seccess");
      setFilteredOsagoDuration((prev) => {
        if (prev) {
          const result = prev.filter((item) => item.label !== "До 15 суток");
          return result;
        }
        return prev;
      });

      setIsTaxiSelected(true);
      setIsFilteredOsagoDurationChanged(true);

      setValue("duration_of_stay_osago", {
        label: "До 30 суток",
        value: "До 30 суток",
      });
    } else if (
      watchedFields?.car_category?.value !==
        "Автотранспортные средства, используемые в качестве такси и по найму" &&
      !isFilteredOsagoDurationChanged &&
      isTaxiSelected
    ) {
      console.log("taxiActive");
      setFilteredOsagoDuration((prev) => {
        const prevCopy = prev;
        let isValueContains: boolean = false;

        if (prevCopy) {
          prevCopy.forEach((item) => {
            if (item.label === "До 15 суток") {
              isValueContains = true;
            }
          });

          if (!isValueContains) {
            prevCopy.unshift({
              label: "До 15 суток",
              value: "category_3",
            });
          }
          return prevCopy;
        }
        return prev;
      });

      setIsTaxiSelected(false);
    }
  }, [watchedFields?.car_category?.value]);

  useEffect(() => {
    if (watchedFields?.duration_of_stay_osago?.label === "До 15 суток") {
      console.log("seccess");
      setFormatedCarCategories((prev) => {
        if (prev) {
          const result = prev.filter(
            (item) =>
              item.label !==
              "Автотранспортные средства, используемые в качестве такси и по найму"
          );
          return result;
        }
        return prev;
      });

      setIsMinimalDaysSelected(true);
    } else if (
      watchedFields?.car_category?.value !==
        "Автотранспортные средства, используемые в качестве такси и по найму" &&
      isMinimalDaysSelected
    ) {
      console.log("taxiActive");
      setFormatedCarCategories((prev) => {
        const prevCopy = prev;
        let isValueContains: boolean = false;

        if (prevCopy) {
          prevCopy.forEach((item) => {
            if (
              item.label ===
              "Автотранспортные средства, используемые в качестве такси и по найму"
            ) {
              isValueContains = true;
            }
          });

          if (!isValueContains) {
            prevCopy.push({
              label:
                "Автотранспортные средства, используемые в качестве такси и по найму",
              value:
                "Автотранспортные средства, используемые в качестве такси и по найму",
            });
          }
          return prevCopy;
        }
        return prev;
      });

      setIsMinimalDaysSelected(false);
    }
  }, [watchedFields?.duration_of_stay_osago?.value]);

  useEffect(() => {
    if (isSubmittedOnce && formState.isDirty) {
      // let value = findValue(variant, watchedFields);
      // setFoundPrice(value ? +value : 0);
      // console.log("recount");
      // console.log({
      //   duration_of_stay: watchedFields?.duration_of_stay_osago?.label,
      //   promo_code: "",
      //   transport_category: watchedFields?.car_category?.label,
      // });

      if (variant === "ns") {
        console.log({
          duration_of_stay: watchedFields?.duration_of_stay_ns?.value,
          promocode: "",
          quantity: Number(watchedFields?.number_of_people?.value) || 1,
        });
        calculateNs({
          duration_of_stay: watchedFields?.duration_of_stay_ns?.value,
          promocode: "",
          quantity: Number(watchedFields?.number_of_people?.value) || 1,
        });
      } else {
        mutate({
          duration_of_stay: watchedFields?.duration_of_stay_osago?.label,
          promo_code: "",
          transport_category: watchedFields?.car_category?.label,
        });
      }
    }
  }, [
    watchedFields?.car_category?.label,
    watchedFields?.duration_of_stay_ns?.label,
    watchedFields?.duration_of_stay_osago?.label,
    watchedFields?.number_of_people?.label,
    isSubmittedOnce,
    formState.isDirty,
  ]);

  useEffect(() => {
    console.log("watchedFields");
  }, [watchedFields]);

  useEffect(() => {
    console.log("isSubmittedOnce");
  }, [isSubmittedOnce]);

  useEffect(() => {
    console.log("formState.isDirty");
  }, [formState.isDirty]);

  useEffect(() => {
    console.log("isFilteredOsagoDurationChanged");
    console.log(isFilteredOsagoDurationChanged);

    let timoutId = setTimeout(() => {
      setIsFilteredOsagoDurationChanged(false);
    }, 200);

    // return
  }, [isFilteredOsagoDurationChanged]);

  const onSubmit: SubmitHandler<
    ICalculatorOsagoFormFields & ICalculatorNsFormFields
  > = () => {
    if (variant === "ns") {
      calculateNs({
        duration_of_stay: watchedFields?.duration_of_stay_ns?.value,
        promocode: "",
        quantity: Number(watchedFields?.number_of_people?.value) || 1,
      });
    } else {
      mutate({
        duration_of_stay: watchedFields?.duration_of_stay_osago?.label,
        promo_code: "",
        transport_category: watchedFields?.car_category?.label,
      });
    }

    setIsCorrect(true);
    setIsSubmittedOnce(true);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  // параметры расчёта переносим в форму оформления, чтобы не выбирать их заново
  const applyHref =
    variant === "osago"
      ? buildOsagoApplyHref(
          watchedFields?.car_category?.label,
          watchedFields?.duration_of_stay_osago?.label
        )
      : buildNsApplyHref(
          watchedFields?.duration_of_stay_ns?.value,
          Number(watchedFields?.number_of_people?.value) || 1
        );

  const renderField = (
    config: IFieldConfig<ICalculatorOsagoForm & ICalculatorNsForm>
  ) => {
    switch (config.type) {
      case "select":
        return (
          <Controller
            key={config.name}
            name={config.name}
            control={control}
            rules={{
              required: {
                value: config.required ? config.required : false,
                message: "error",
              },
            }}
            render={({ field, fieldState }) => (
              <CustomSelect
                isSearchable={false}
                key={config.name}
                className={styles.select}
                name={config.name}
                placeholder={config.placeholder}
                label={config.label}
                required={config.required}
                options={
                  config.name === "car_category"
                    ? formatedCarCategories || []
                    : config.name === "duration_of_stay_osago"
                    ? filteredOsagoDuration || []
                    : config.options || []
                }
                selectedValue={field.value}
                setFullValue={(value: IOptions) => field.onChange(value)}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        );

      default:
        return null;
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} action="">
      {config.fields.map((field) => renderField(field))}
      <Button
        className={`${styles.submit} ${data ? styles.submitHidden : ""}`}
        type="submit"
        isLoading={isPending || isCalculateNsPending}
      >
        Рассчитать
      </Button>
      {((isCorrect && data) || (isCorrect && calculateNsData)) && (
        <CalculatorPolicyPrice
          className={styles.price}
          policyType={variant}
          applyHref={applyHref}
          price={Number(data ? data.base_tarif : calculateNsData?.base_tariff)}
        />
      )}
    </form>
  );
};

export default CalculatorInputForm;
