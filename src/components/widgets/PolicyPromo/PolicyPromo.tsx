import React from "react";

import styles from "./PolicyPromo.module.scss";

import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import Substrate from "@/components/ui/Substrate/Substrate";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Image from "next/image";
import Text from "@/components/ui/Text/Text";
import Button from "@/components/ui/Button/Button";
import { PAGES } from "@/config/pages-url.config";

interface IProps {
  variant: "osago" | "ns";
}

const titles = {
  osago: "Полис ОСАГО в Абхазии",
  ns: "Страхование от несчастного случая в Абхазии",
};

const descriptions = {
  osago:
    "Обязательное страхование для иностранных автомобилей. Тарифы от 1 000 ₽ за 15 суток, полис онлайн за 3–5 минут.",
  ns: "Обязательное страхование жизни и здоровья иностранных граждан. Страховая сумма 70 000 ₽, тариф от 50 ₽ за сутки.",
};

const PolicyPromo = ({ variant }: IProps) => {
  return (
    <section>
      <ContentContainer>
        <Substrate withShadow="light" className={styles.root}>
          <div className={styles.formWrapper}>
            {variant === "osago" && (
              <div className={styles.required}>Обязательное страхование</div>
            )}

            <CustomTitle className={styles.title}>{titles[variant]}</CustomTitle>
            <Text className={styles.descr}>{descriptions[variant]}</Text>

            {variant === "osago" ? (
              <Button isLink href={PAGES.OSAGO_APPLY} className={styles.applyButton}>
                Купить ОСАГО
              </Button>
            ) : (
              <Button isLink href={PAGES.NS_APPLY} className={styles.applyButton}>
                Оформить
              </Button>
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
              />
            ) : (
              <Image
                className={`${styles.image} ${styles.nsImage}`}
                src="/img/calculator-ns-bg.png"
                alt=""
                width={6187}
                height={3289}
                priority
              />
            )}
          </div>
        </Substrate>
      </ContentContainer>
    </section>
  );
};

export default PolicyPromo;
