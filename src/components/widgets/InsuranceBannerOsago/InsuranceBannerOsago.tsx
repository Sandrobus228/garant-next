import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import styles from "./InsuranceBannerOsago.module.scss";
import Substrate from "@/components/ui/Substrate/Substrate";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";

interface IProps {
  className?: string;
}

// Основания – Правила обязательного страхования гражданской ответственности,
// приложение 4 к Постановлению КМ РА № 189: п. 2.3 (страховой случай),
// п. 2.4 подпункт «д» (ДТП без регистрации в ДПС), раздел 9 (порядок выплаты).
const payoutSteps = [
  "Вызвать ГАИ по номеру 002 и дождаться оформления.",
  "Позвонить в страховую по номеру +7 940 770 48 63.",
  "Подать заявление и документы – страховщик составит акт о страховом случае.",
  "Размер ущерба определяют по стоимости ремонта.",
  "Деньги получает пострадавший или напрямую сервис, который делал ремонт.",
];

export function InsuranceBannerOsago({ className }: IProps) {
  return (
    <section className={`${className} ${styles.root}`}>
      <ContentContainer>
        <Substrate withShadow="light" className={styles.substrate}>
          <CustomTitle tag="h2" className={styles.title}>
            Страховка в Абхазию для россиян на автомобиле
          </CustomTitle>

          <p className={styles.lead}>
            Российские ОСАГО и КАСКО в Абхазии не действуют, поэтому на въезде
            нужен местный полис. Он оформляется на любое транспортное средство:
            легковой автомобиль, мотоцикл, автобус или грузовик.
          </p>

          <CustomTitle tag="h3" className={styles.subtitle}>
            Что покрывает полис
          </CustomTitle>

          <p className={styles.paragraph}>
            Полис покрывает вред, причинённый в ДТП жизни, здоровью или
            имуществу участников движения. Возмещение получает пострадавшая
            сторона – это может быть и владелец полиса, если ДТП произошло не по
            его вине. Выплата составляет до 50&nbsp;000&nbsp;₽.
          </p>

          <p className={styles.warning}>
            <svg
              className={styles.warningIcon}
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
              <path d="M10.3 3.9 1.8 18.2a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
            <span>
              ДТП должно быть зарегистрировано сотрудниками ГАИ, иначе выплату
              получить невозможно.
            </span>
          </p>

          <CustomTitle tag="h3" className={styles.subtitle}>
            Как получить выплату
          </CustomTitle>

          <ol className={styles.steps}>
            {payoutSteps.map((step, i) => (
              <li className={styles.step} key={step}>
                <span className={styles.stepNumber} aria-hidden="true">
                  {i + 1}
                </span>
                <span className={styles.stepText}>{step}</span>
              </li>
            ))}
          </ol>
        </Substrate>
      </ContentContainer>
    </section>
  );
}
