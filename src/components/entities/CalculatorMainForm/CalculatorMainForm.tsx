"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import Substrate from "@/components/ui/Substrate/Substrate";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import CalculatorInputForm from "@/components/features/CalculatorInputForm/CalculatorInputForm";

import styles from "./CalculatorMainForm.module.scss";
import { selectsNSProps, selectsOsagoProps } from "./fields.data";
import { IOptions } from "@/components/ui/CustomSelect/CustomSelect";
import { useGetCarCategories } from "@/hooks/cars/useGetCarCategories";

export interface ICalculatorMainFormProps {
  variant: "osago" | "ns";
}

// Заголовок этого блока – единственный h1 главной: блок стоит первым в разметке,
// и до правки h1 из текстового блока ниже шёл в DOM после h2 калькулятора.
// В подзаголовке держим цену: именно оттуда цифра попадает в сниппет выдачи.
const titles = {
  osago: "Страховка в Абхазии на автомобиль",
  ns: "Страховка от несчастного случая в Абхазии",
};

const subtitles = {
  osago:
    "Обязательное страхование для въезда в Абхазию. Полис онлайн за 3–5 минут, от 1 000 ₽ за 15 суток.",
  ns: "Обязательное страхование жизни и здоровья иностранных граждан в Абхазии",
};

const CalculatorMainForm = ({ variant }: ICalculatorMainFormProps) => {

  return (
    <Substrate withShadow="light" className={styles.root}>
      <div className={styles.formWrapper}>
        <CustomTitle className={styles.title}>{titles[variant]}</CustomTitle>
        <p className={styles.subtitle}>{subtitles[variant]}</p>
        {variant === "osago" ? (
          <CalculatorInputForm variant="osago" config={{ fields: selectsOsagoProps }} />
        ) : (
          <CalculatorInputForm variant="ns" config={{ fields: selectsNSProps }} />
        )}
      </div>

      <div className={styles.imageWrapper}>
        {variant === "osago" ? (
          <Image
            className={`${styles.image} ${styles.osagoImage}`}
            src="/img/calculator-osago-bg.png"
            alt=""
            width={5652}
            height={3001}
            priority
            fetchPriority="high"
            sizes="(max-width: 1149px) 100vw, 770px"
          />
        ) : (
          <Image
            className={`${styles.image} ${styles.nsImage}`}
            src="/img/calculator-ns-bg.png"
            alt=""
            width={6187}
            height={3289}
            priority
            fetchPriority="high"
            sizes="(max-width: 1149px) 100vw, 770px"
          />
        )}
      </div>
    </Substrate>
  );
};

export default CalculatorMainForm;
