import Substrate from "@/components/ui/Substrate/Substrate";
import styles from "./InsuranceBannerMain.module.scss";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Link from "next/link";
import { PAGES } from "@/config/pages-url.config";

interface IProps {
  className?: string;
}

// Обновляется вручную вместе с тарифами – дата и год попадают в блок актуальности
// под текстом. Яндекс считает такие отметки сигналом свежести, поэтому дата должна
// соответствовать реальной сверке с постановлением, а не дате сборки.
const TARIFFS_YEAR = "2026";
const TARIFFS_CHECKED_AT = "27 августа 2026";

const facts = [
  { value: "от 1 000 ₽", label: "полис на 15 суток для легкового автомобиля" },
  { value: "3 000 ₽", label: "штраф за отсутствие полиса" },
  { value: "до 50 000 ₽", label: "выплата пострадавшей стороне" },
  { value: "3–5 минут", label: "от оплаты до полиса на email" },
];

const steps = [
  {
    title: "Заполните данные автомобиля.",
    text: "Категория и срок пребывания – стоимость увидите сразу.",
  },
  {
    title: "Зарегистрируйтесь.",
    text: "Нужен только email – на него придёт полис.",
  },
  {
    title: "Оплатите онлайн.",
    text: "Картой или через СБП.",
  },
  {
    title: "Получите полис на почту.",
    text: "Сразу после оплаты, полис также доступен в личном кабинете.",
  },
];

export function InsuranceBannerMain({ className }: IProps) {
  return (
    <section className={`${className} ${styles.root}`}>
      <ContentContainer>
        <Substrate withShadow="light" className={styles.substrate}>
          <CustomTitle tag="h2" className={styles.title}>
            Нужна ли страховка в Абхазию?
          </CustomTitle>

          <p className={styles.lead}>
            <b className={styles.leadAccent}>Да, если едете на автомобиле.</b>{" "}
            Российские ОСАГО и КАСКО в Абхазии не действуют. Местный полис
            обязателен с 2022 года, а с июня 2026 за его отсутствие штрафуют на
            3&nbsp;000&nbsp;₽ по статье 116 КоАП Абхазии.
          </p>

          <dl className={styles.facts}>
            {facts.map((fact) => (
              <div className={styles.fact} key={fact.value}>
                <dt className={styles.factValue}>{fact.value}</dt>
                <dd className={styles.factLabel}>{fact.label}</dd>
              </div>
            ))}
          </dl>

          <p className={styles.paragraph}>
            Тарифы утверждены Кабинетом Министров Республики Абхазия, полная
            таблица по всем категориям транспорта доступна на странице{" "}
            <Link href={PAGES.OSAGO} className={styles.link}>
              ОСАГО в Абхазии
            </Link>
            .
          </p>

          <p className={styles.notice}>
            <svg
              className={styles.noticeIcon}
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M20 10c0 5.25-8 12-8 12s-8-6.75-8-12a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="2.75" />
            </svg>
            <span>
              Полис проверяют на границе в Псоу и на постах «Бзыбь» и
              «Приморское».
            </span>
          </p>

          <p className={styles.paragraph}>
            Если вы едете без машины, автостраховка не нужна – остаётся оформить
            только{" "}
            <Link href={PAGES.NS} className={styles.link}>
              полис страхования от несчастного случая
            </Link>
            : от 50&nbsp;₽ за сутки, страховая сумма 70&nbsp;000&nbsp;₽.
          </p>

          <CustomTitle tag="h2" className={styles.subhead}>
            Как оформить страховку в Абхазию онлайн
          </CustomTitle>

          <p className={styles.paragraph}>
            Оформление на этом сайте онлайн за 3–5&nbsp;минут.
          </p>

          <ol className={styles.steps}>
            {steps.map((step, i) => (
              <li className={styles.step} key={step.title}>
                <span className={styles.stepNumber} aria-hidden="true">
                  {i + 1}
                </span>
                <span className={styles.stepText}>
                  <b>{step.title}</b> {step.text}
                </span>
              </li>
            ))}
          </ol>

          <p className={styles.paragraph}>
            Распечатывать необязательно: электронный полис принимают с экрана
            телефона. Оформить можно заранее, хоть за месяц до поездки – даты
            начала и окончания вы выбираете сами.
          </p>

          <CustomTitle tag="h2" className={styles.subhead}>
            Кому нужен полис
          </CustomTitle>

          <ul className={styles.ul}>
            <li className={styles.li}>
              <b>Туристам на своём автомобиле.</b> С момента въезда и до конца
              поездки.
            </li>
            <li className={styles.li}>
              <b>Тем, кто едет на чужой машине.</b> Дополнительно нужна
              нотариальная доверенность с отметкой «с правом выезда за рубеж».
            </li>
            <li className={styles.li}>
              <b>Владельцам прицепов, автобусов и грузовиков.</b> По отдельным
              тарифам, прицеп страхуется как самостоятельное транспортное
              средство.
            </li>
          </ul>

          <p className={styles.fresh}>
            <b>Актуально на {TARIFFS_YEAR} год.</b> Тарифы и размер штрафа
            сверены с Постановлением Кабинета Министров Республики Абхазия
            №&nbsp;189 и Законом Республики Абхазия №&nbsp;6467-с-VII от
            29&nbsp;июня 2026 года. Обновлено {TARIFFS_CHECKED_AT}.
          </p>
        </Substrate>
      </ContentContainer>
    </section>
  );
}
