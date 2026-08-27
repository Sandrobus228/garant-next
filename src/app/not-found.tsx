import Link from "next/link";
import type { Metadata } from "next";

import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import Substrate from "@/components/ui/Substrate/Substrate";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Button from "@/components/ui/Button/Button";
import { PAGES } from "@/config/pages-url.config";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";

import styles from "./not-found.module.scss";

export const metadata: Metadata = {
  title: "Страница не найдена – Гарант-Страхование",
  description:
    "Такой страницы на сайте нет. Вернитесь на главную или перейдите к оформлению полиса ОСАГО и страхования от несчастного случая в Абхазии.",
  ...NO_INDEX_PAGE,
};

const links = [
  { href: PAGES.OSAGO, label: "ОСАГО в Абхазии" },
  { href: PAGES.NS, label: "Страхование от несчастного случая" },
  { href: PAGES.SUPPORT, label: "Ответы на вопросы" },
  { href: PAGES.CONTACTS, label: "Контакты" },
];

const NotFound = () => {
  return (
    <ContentContainer>
      <Substrate withShadow="light" className={styles.root}>
        <p className={styles.code}>404</p>

        <CustomTitle className={styles.title}>
          Такой страницы не существует
        </CustomTitle>

        <p className={styles.text}>
          Возможно, страница была удалена или в адресе опечатка. Вернитесь на
          главную или выберите нужный раздел.
        </p>

        <Button isLink href={PAGES.HOME} className={styles.button}>
          На главную
        </Button>

        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={styles.link}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </Substrate>
    </ContentContainer>
  );
};

export default NotFound;
