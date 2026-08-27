import Link from "next/link";
import type { Metadata } from "next";

import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import Substrate from "@/components/ui/Substrate/Substrate";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Breadcrumbs from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { PAGES } from "@/config/pages-url.config";

import styles from "./about.module.scss";

export const metadata: Metadata = {
  title: "О компании «Гарант-Страхование» – страхование в Абхазии",
  description:
    "ЗАО «Страховая компания «Гарант-Страхование»: обязательное страхование иностранного транспорта и граждан в Абхазии. Реквизиты, лицензия, контакты.",
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Главная", href: PAGES.HOME },
          { name: "О компании", href: PAGES.ABOUT },
        ]}
      />
      <ContentContainer>
        <Substrate withShadow="light" className={styles.root}>
          <CustomTitle className={styles.title}>
            О компании «Гарант-Страхование»
          </CustomTitle>

          <p className={styles.lead}>
            ЗАО «Страховая компания «Гарант-Страхование» – страховая компания
            Республики Абхазия. Мы оформляем обязательные полисы для иностранных
            граждан и транспортных средств, въезжающих в республику, и работаем
            как с физическими, так и с юридическими лицами.
          </p>

          <CustomTitle tag="h2" className={styles.subtitle}>
            Чем мы занимаемся
          </CustomTitle>

          <ul className={styles.ul}>
            <li className={styles.li}>
              <Link href={PAGES.OSAGO} className={styles.link}>
                Обязательное страхование гражданской ответственности
              </Link>{" "}
              владельцев транспортных средств иностранных физических и
              юридических лиц. Полис нужен каждому, кто въезжает в Абхазию на
              автомобиле, мотоцикле, автобусе или грузовике.
            </li>
            <li className={styles.li}>
              <Link href={PAGES.NS} className={styles.link}>
                Обязательное страхование от несчастных случаев
              </Link>{" "}
              иностранных граждан и лиц без гражданства, прибывающих на
              территорию республики. Страховая сумма – 70&nbsp;000&nbsp;₽ на
              человека.
            </li>
          </ul>

          <p className={styles.paragraph}>
            Оба полиса оформляются онлайн на этом сайте: расчёт занимает меньше
            минуты, готовый документ приходит на электронную почту и остаётся
            доступен в личном кабинете.
          </p>

          <CustomTitle tag="h2" className={styles.subtitle}>
            На каком основании мы работаем
          </CustomTitle>

          <p className={styles.paragraph}>
            Обязательное страхование в Абхазии регулируется Законами Республики
            Абхазия «Об обязательном страховании гражданской ответственности
            владельцев транспортных средств иностранных физических и юридических
            лиц» и «Об обязательном страховании от несчастных случаев иностранных
            граждан и лиц без гражданства, прибывающих на территорию Республики
            Абхазия».
          </p>

          <p className={styles.paragraph}>
            Тарифы и правила страхования утверждает Кабинет Министров Республики
            Абхазия – они одинаковы во всех страховых компаниях, и повлиять на
            цену полиса страховщик не может. Лицензия на страховую деятельность и
            полные тексты нормативных актов опубликованы в разделе{" "}
            <Link href={PAGES.DOCUMENTS} className={styles.link}>
              «Документы»
            </Link>
            .
          </p>

          <CustomTitle tag="h2" className={styles.subtitle}>
            Реквизиты
          </CustomTitle>

          <dl className={styles.requisites}>
            <div className={styles.requisite}>
              <dt>Полное наименование</dt>
              <dd>ЗАО «Страховая Компания «Гарант-Страхование»</dd>
            </div>
            <div className={styles.requisite}>
              <dt>ИНН</dt>
              <dd>11004300</dd>
            </div>
            <div className={styles.requisite}>
              <dt>ОГРН</dt>
              <dd>117РА00241</dd>
            </div>
            <div className={styles.requisite}>
              <dt>Юридический адрес</dt>
              <dd>Республика Абхазия, Сухумский р-н, Бзыпское ш. 518</dd>
            </div>
            <div className={styles.requisite}>
              <dt>Фактический адрес</dt>
              <dd>Республика Абхазия, г. Сухум, проспект Аиааира, д. 15</dd>
            </div>
          </dl>

          <p className={styles.paragraph}>
            Полные банковские реквизиты – на странице{" "}
            <Link href={PAGES.LEGAL} className={styles.link}>
              «Правовая информация»
            </Link>
            .
          </p>

          <CustomTitle tag="h2" className={styles.subtitle}>
            Как с нами связаться
          </CustomTitle>

          <p className={styles.paragraph}>
            Общие вопросы и оформление –{" "}
            <a href="tel:+79407411000" className={styles.link}>
              +7 (940) 741-10-00
            </a>
            , почта{" "}
            <a href="mailto:info@garant-abh.com" className={styles.link}>
              info@garant-abh.com
            </a>
            . При наступлении страхового случая звоните по номеру{" "}
            <a href="tel:+79407704863" className={styles.link}>
              +7 (940) 770-48-63
            </a>
            . Адрес офиса, карта и мессенджеры – на странице{" "}
            <Link href={PAGES.CONTACTS} className={styles.link}>
              «Контакты»
            </Link>
            .
          </p>
        </Substrate>
      </ContentContainer>
    </>
  );
}
