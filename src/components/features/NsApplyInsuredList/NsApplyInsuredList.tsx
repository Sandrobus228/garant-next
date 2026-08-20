"use client";

import React from "react";

import styles from "./NsApplyInsuredList.module.scss";

import { ICreateNsPolicyRequest } from "@/types/policy.types";
import {
  Control,
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormClearErrors,
} from "react-hook-form";
import NsApplyInsuredListItem from "@/components/entities/NsApplyInsuredListItem/NsApplyInsuredListItem";
import Button from "@/components/ui/Button/Button";
import { defaultInsuredValues } from "@/components/widgets/NsApply/NsApply";
import { MAX_INSURED_COUNT } from "@/constants/insured.constants";

interface IProps {
  control: Control<ICreateNsPolicyRequest, any, ICreateNsPolicyRequest>;
  fields: FieldArrayWithId<ICreateNsPolicyRequest, "insured", "id">[];
  append: UseFieldArrayAppend<ICreateNsPolicyRequest, "insured">;
  remove: UseFieldArrayRemove;
  clearErrors?: UseFormClearErrors<ICreateNsPolicyRequest>;
}

const NsApplyInsuredList = ({ control, fields, append, remove, clearErrors }: IProps) => {
  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} className={styles.listItem}>
          <NsApplyInsuredListItem
            removeItem={() => remove(index)}
            control={control}
            itemIndex={index}
            field={field}
            clearErrors={clearErrors}
          />
        </div>
      ))}

      {fields.length < MAX_INSURED_COUNT && (
        <Button
          className={styles.appendButton}
          type="button"
          onClickEvent={() => append(defaultInsuredValues)}
          style="outlined"
        >
          + Добавить застрахованного
        </Button>
      )}
    </div>
  );
};

export default NsApplyInsuredList;
