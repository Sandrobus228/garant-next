import React from "react";

import Link from "next/link";

import { ESvgName } from "@/constants/svg-ids.constants";
import { PAGES } from "@/config/pages-url.config";

import SvgSelector from "@/components/ui/SvgSelector/SvgSelector";
import Substrate from "@/components/ui/Substrate/Substrate";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";

import styles from "./Footer.module.scss";
import SocialLinks from "@/components/ui/SocialLinks/SocialLinks";
import CustomLink from "@/components/ui/CustomLink/CustomLink";

const Footer = () => {
  return (
    <Substrate className={styles.root}>
      <div className={styles.container}>
        <Link className={styles.logoLink} href={PAGES.HOME}>
          <SvgSelector className={styles.logoSvg} id={ESvgName.LOGO} />
        </Link>

        <div className={styles.columnsWrapper}>
          <div className={styles.column}>
            <CustomTitle tag="h3" className={styles.title}>
              Страхование в Абхазии
            </CustomTitle>

            <CustomLink className={styles.link} href={PAGES.OSAGO}>
              ОСАГО
            </CustomLink>
            <CustomLink className={styles.link} href={PAGES.NS}>
              От несчастного случая
            </CustomLink>
            <CustomLink className={styles.link} href={PAGES.HOME}>
              Калькулятор стоимости
            </CustomLink>
            <CustomLink className={styles.link} href={PAGES.DOCUMENTS}>
              Нормативные документы
            </CustomLink>
          </div>

          <div className={styles.column}>
            <CustomTitle tag="h3" className={styles.title}>
              Компания
            </CustomTitle>

            <CustomLink className={styles.link} href={PAGES.ABOUT}>
              О нас
            </CustomLink>
            <CustomLink className={styles.link} href={PAGES.CONTACTS}>
              Контакты
            </CustomLink>
            <CustomLink className={styles.link} href={PAGES.SUPPORT}>
              Помощь
            </CustomLink>
          </div>

          <div className={styles.column}>
            <a className={styles.linkLarge} href="mailto:info@garant-abh.com">
              info@garant-abh.com
            </a>
            <a className={styles.linkLarge} href="tel:79407411000">
              +7 940 741 10 00
            </a>

            <SocialLinks className={styles.socialLinks} />
          </div>
        </div>

        <p className={styles.bottomLinks}>
          <Link href={PAGES.LEGAL} className={styles.bottomLink}>
            Правовая информация
          </Link>

          <Link href={PAGES.POLICY} className={styles.bottomLink}>
            Политика конфиденциальности
          </Link>
        </p>

        <p className={styles.address}>Республика Абхазия, г. Сухум, проспект Аиааира, 15</p>

        <p className={styles.copyright}>
          © ЗАО «Страховая компания «Гарант-Страхование», 2026
        </p>
      </div>
    </Substrate>
  );
};

export default Footer;
