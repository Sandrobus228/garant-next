"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./ReviwesYandex.module.scss";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";

interface IProps {
  /** Заголовок блока: на каждой странице свой, иначе h2 дублируется по сайту. */
  title?: string;
}

const ReviwesYandex = ({ title = "Отзывы о нас" }: IProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <ContentContainer>
      <section className={styles.root}>
        <CustomTitle tag="h2" isCentered className={styles.title} isLarge>
          {title}
        </CustomTitle>

        <div className={styles.reviewsWrapper} ref={ref}>
          {isVisible && (
            <iframe
              className={styles.iframe}
              style={{
                width: "100%",
                height: "100%",
                border: "1px solid #e6e6e6",
                borderRadius: "8px",
                boxSizing: "border-box",
              }}
              src="https://yandex.ru/maps-reviews-widget/153217679303?comments"
            />
          )}
          <a
            href="https://yandex.com/maps/org/garant_strakhovaniye/153217679303/"
            target="_blank"
            rel="nofollow noopener"
          >
            Гарант-Страхование на Яндекс.Картах, Сухум
          </a>
        </div>
      </section>
    </ContentContainer>
  );
};

export default ReviwesYandex;
