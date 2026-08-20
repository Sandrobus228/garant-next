import React, { ReactNode } from "react";

import styles from "./NsApplyStaticFields.module.scss";

import { Control, Controller, UseFormClearErrors } from "react-hook-form";
import { ICreateNsPolicyRequest } from "@/types/policy.types";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import CustomSelect from "@/components/ui/CustomSelect/CustomSelect";
import { durationOfStayListItems } from "./fields.data";
import CustomInput from "@/components/ui/CustomInput/CustomInput";
import { useGetDurationOfStayVariants } from "@/hooks/policy/useGetDurationOfStayVariants";
import Loader from "@/components/ui/Loader/Loader";
import { generateNsOptions } from "@/helpers/CalculatorPromo/generateNsOptions";
import { MAX_INSURED_COUNT } from "@/constants/insured.constants";
import { IS_PROMOCODE_ENABLED } from "@/constants/promocode.constants";

interface IProps {
  control: Control<ICreateNsPolicyRequest, any, ICreateNsPolicyRequest>;
  clearErrors?: UseFormClearErrors<ICreateNsPolicyRequest>;
  quantity: number;
  setQuantity: (value: number) => void;
  priceSlot?: ReactNode;
}

const quantityOptions = generateNsOptions(MAX_INSURED_COUNT);

const NsApplyStaticFields = ({
  control,
  clearErrors,
  quantity,
  setQuantity,
  priceSlot,
}: IProps) => {
  const { data: durationOfStayVariants } = useGetDurationOfStayVariants();

  return (
    <div className={styles.root}>
      <CustomTitle tag="h2">Тариф страхования</CustomTitle>

      <div className={styles.fieldsRow}>
        {durationOfStayVariants ? (
          <Controller
            control={control}
            key="NsApply_duration_of_stay"
            name="duration_of_stay"
            rules={{
              required: "Обязательное поле",
            }}
            render={({ field, fieldState }) => (
              <CustomSelect
                isSearchable={false}
                key={field.name}
                className={styles.input}
                name={field.name}
                placeholder="Длительность пребывания"
                label="Длительность пребывания"
                required={true}
                options={durationOfStayListItems}
                selectedValue={
                  field.value
                    ? {
                        label: field.value.slice(field.value.indexOf("до")),
                        value: field.value,
                      }
                    : null
                }
                setValue={(value) => {
                  if (clearErrors) {
                    clearErrors(field.name);
                  }
                  field.onChange(value);
                }}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        ) : (
          <Loader />
        )}

        <CustomSelect
          isSearchable={false}
          key="NsApply_quantity"
          className={styles.input}
          name="quantity"
          placeholder="Количество застрахованных"
          label="Количество застрахованных"
          required={true}
          options={quantityOptions}
          selectedValue={quantity.toString()}
          setValue={(value) => setQuantity(Number(value))}
        />
      </div>

      <div className={styles.fieldsRow}>
        <Controller
          control={control}
          key="NsApply_start_date"
          name="start_date"
          rules={{
            required: "Обязательное поле",
          }}
          render={({ field, fieldState }) => (
            <CustomInput
              className={styles.input}
              name={field.name}
              setValue={(value) => {
                if (clearErrors) {
                  clearErrors(field.name);
                }
                field.onChange(value);
              }}
              value={field.value}
              errorMessage={fieldState.error?.message}
              label="Дата начала"
              placeholder="Выберите дату"
              inputType="date"
              startDate={new Date()}
              limitYears={true}
            />
          )}
        />

        {IS_PROMOCODE_ENABLED && (
          <Controller
            control={control}
            key="NsApply_promocode"
            name="promocode"
            render={({ field, fieldState }) => (
              <CustomInput
                className={styles.input}
                name={field.name}
                setValue={(value) => {
                  if (clearErrors) {
                    clearErrors(field.name);
                  }
                  field.onChange(value);
                }}
                value={field.value}
                errorMessage={fieldState.error?.message}
                label="Промокод"
                placeholder="Введите промокод"
                inputType="promocode"
              />
            )}
          />
        )}
      </div>

      {priceSlot}
    </div>
  );
};

export default NsApplyStaticFields;
