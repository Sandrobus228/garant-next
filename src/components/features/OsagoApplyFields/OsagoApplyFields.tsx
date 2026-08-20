import React, { ReactNode } from "react";

import styles from "./OsagoApplyFields.module.scss";

import { ISplitFieldConfig } from "@/helpers/OsagoApply/getOsagoApplyFields.helper";
import { IOsagoApplyForm } from "@/types/OsagoApplyForm/IOsagoApplyForm";
import { Control, UseFormClearErrors, UseFormTrigger } from "react-hook-form";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import DynamicFormSection from "@/components/entities/DynamicFormSection/DynamicFormSection";
import { CustomSwitch } from "@/components/ui/CustomSwitch/CustomSwitch";
import { IS_PROMOCODE_ENABLED } from "@/constants/promocode.constants";

interface IProps {
  config: ISplitFieldConfig;
  control: Control<IOsagoApplyForm, any, IOsagoApplyForm>;
  clearErrors?: UseFormClearErrors<IOsagoApplyForm>;
  isOwner: boolean;
  setIsOwner: (value: boolean) => void;
  priceSlot?: ReactNode;
}

const OsagoApplyFields = ({
  config,
  control,
  clearErrors,
  isOwner,
  setIsOwner,
  priceSlot,
}: IProps) => {
  return (
    <>
      <div className={styles.section}>
        <CustomTitle tag="h2">Тариф страхования</CustomTitle>

        <div className={styles.inputsWrapper}>
          {config.tariff && (
            <DynamicFormSection
              clearErrors={clearErrors}
              fields={config.tariff}
              control={control}
              className={styles.input}
              isTopItemSingle
            />
          )}
        </div>

        {IS_PROMOCODE_ENABLED && config.promocode && (
          <DynamicFormSection
            clearErrors={clearErrors}
            fields={config.promocode}
            control={control}
          />
        )}

        {priceSlot}
      </div>

      <div className={styles.section}>
        <CustomTitle tag="h2" className={styles.sectionTitle}>
          Транспортное средство
        </CustomTitle>

        <div className={styles.inputsWrapper}>
          {config.vehicleDetails && (
            <DynamicFormSection
              clearErrors={clearErrors}
              fields={config.vehicleDetails}
              control={control}
              className={styles.input}
            />
          )}
        </div>
      </div>

      <div className={styles.section}>
        <CustomTitle tag="h2" className={styles.sectionTitle}>
          Собственник
        </CustomTitle>
        <div className={styles.inputsWrapper}>
          {config.owner && (
            <DynamicFormSection
              key={1}
              clearErrors={clearErrors}
              fields={config.owner}
              control={control}
              isTopItemSingle
              personTypeID="owner"
            />
          )}
        </div>
      </div>

      <div className={styles.ownerSwitcher}>
        <CustomSwitch isChecked={isOwner} setIsChecked={setIsOwner} />
        Страхователь — собственник ТС
      </div>

      {!isOwner && (
        <div className={styles.section}>
          <CustomTitle tag="h2" className={styles.sectionTitle}>
            Страхователь
          </CustomTitle>
          <div className={styles.inputsWrapper}>
            {config.insurant && (
              <DynamicFormSection
                key={2}
                clearErrors={clearErrors}
                fields={config.insurant}
                control={control}
                isTopItemSingle
                personTypeID="insurant"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OsagoApplyFields;
