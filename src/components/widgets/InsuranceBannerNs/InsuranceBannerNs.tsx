import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import styles from "./InsuranceBannerNs.module.scss";
import Substrate from "@/components/ui/Substrate/Substrate";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Link from "next/link";
import { PAGES } from "@/config/pages-url.config";

interface IProps {
  className?: string;
}

// Основания – Правила обязательного страхования от несчастных случаев,
// приложение 1 к Постановлению КМ РА № 189: раздел 1 (определения),
// п. 5.1 (страховая сумма 70 000 ₽).
export function InsuranceBannerNs({ className }: IProps) {
  return (
    <section className={`${className} ${styles.root}`}>
      <ContentContainer>
        <Substrate withShadow="light" className={styles.substrate}>
          <CustomTitle tag="h2" className={styles.title}>
            Что покрывает полис от несчастного случая
          </CustomTitle>

          <p className={styles.lead}>
            Полис обязателен для всех иностранных граждан, въезжающих в Абхазию,
            – не только для водителей. Страховая сумма составляет
            70&nbsp;000&nbsp;₽ на каждого застрахованного, а тариф зависит только
            от срока пребывания.
          </p>

          <CustomTitle tag="h3" className={styles.subtitle}>
            Что считается несчастным случаем
          </CustomTitle>

          <p className={styles.paragraph}>
            Внезапное внешнее воздействие, произошедшее помимо вашей воли и
            приведшее к травме или гибели. В правилах перечислены стихийное
            явление природы, взрыв, ожог, обморожение, утопление, действие
            электрического тока, удар молнии, нападение злоумышленников или
            животных, падение предмета.
          </p>

          <p className={styles.exception}>
            <svg
              className={styles.exceptionIcon}
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
              <circle cx="12" cy="12" r="9" />
              <path d="m5.6 5.6 12.8 12.8" />
            </svg>
            <span>
              Не признаются страховыми случаями обострение хронических
              заболеваний и вред, причинённый себе умышленно.
            </span>
          </p>

          <CustomTitle tag="h3" className={styles.subtitle}>
            Сколько выплатят
          </CustomTitle>

          <p className={styles.paragraph}>
            Выплата составляет до 70&nbsp;000&nbsp;₽ и зависит от последствий
            несчастного случая. При травме или увечье её рассчитывают исходя из
            стоимости необходимой медицинской помощи.
          </p>

          <CustomTitle tag="h3" className={styles.subtitle}>
            Чем это отличается от медицинской страховки
          </CustomTitle>

          <p className={styles.paragraph}>
            Полис от несчастного случая – это страхование жизни и здоровья: он
            выплачивает деньги, если в поездке произошло несчастье. Медицинская
            страховка оплачивает лечение напрямую клинике. Для въезда в Абхазию
            обязателен именно полис от несчастного случая, отдельную медицинскую
            страховку при въезде не требуют.
          </p>

          <p className={styles.paragraph}>
            Если вы едете на автомобиле, дополнительно потребуется{" "}
            <Link href={PAGES.OSAGO} className={styles.link}>
              полис ОСАГО
            </Link>
            .
          </p>
        </Substrate>
      </ContentContainer>
    </section>
  );
}
