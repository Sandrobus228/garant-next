"use client";

import React, { useState } from "react";

import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import FAQItem from "@/components/entities/FAQItem/FAQItem";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";

import { buildFaqJsonLd, faqSets, TFAQSet } from "@/data/faq";

import styles from "./FAQ.module.scss";

interface IProps {
  className?: string;
  isIsolated?: boolean;
  isBordered?: boolean;
  /**
   * Набор вопросов для страницы. По умолчанию полный список: он нужен только
   * на /support, остальные страницы передают свой набор, иначе блок дублируется
   * и Яндекс считает страницы копиями друг друга.
   */
  set?: TFAQSet;
  /** Заголовок блока: на каждой странице свой, чтобы не совпадал h2. */
  title?: string;
}

const FAQ = ({
  className,
  isIsolated,
  isBordered,
  set = "all",
  title = "Ответы на вопросы",
}: IProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = faqSets[set];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const render = (
    <section
      className={`${styles.root} ${className} ${
        isIsolated ? styles.isolated : ""
      }`}
    >
      <CustomTitle tag={isIsolated ? "h2" : "h1"} isCentered isLarge>
        {title}
      </CustomTitle>

      <div className={styles.FAQItemsWrapper}>
        {items.map((item, i) => (
          <FAQItem
            key={item.question}
            data={item}
            isOpen={openIndex === i}
            onToggle={() => handleToggle(i)}
            isBordered={isBordered}
          />
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqJsonLd(items)),
        }}
      />
    </section>
  );

  return (
    <>{isIsolated ? <ContentContainer>{render}</ContentContainer> : render}</>
  );
};

export default FAQ;
