import React from "react";

import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import Substrate from "@/components/ui/Substrate/Substrate";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";

import {
  TARIFFS_SOURCE,
  formatPrice,
  nsTariffs,
  osagoDurations,
  osagoTariffs,
} from "@/data/tariffs";

import styles from "./TariffTable.module.scss";

interface IProps {
  variant: "osago" | "ns";
  className?: string;
  /**
   * Таблица идёт сразу за текстовым блоком той же темы: убираем крупный отступ,
   * чтобы пара читалась как один раздел, а не как два независимых экрана.
   */
  isAttached?: boolean;
}

const titles = {
  osago: "Сколько стоит ОСАГО в Абхазии",
  ns: "Сколько стоит полис от несчастного случая",
};

const captions = {
  osago:
    "Страховые тарифы по обязательному страхованию гражданской ответственности владельцев транспортных средств иностранных физических и юридических лиц",
  ns: "Страховые тарифы по обязательному страхованию от несчастных случаев иностранных граждан и лиц без гражданства",
};

export function TariffTable({ variant, className, isAttached }: IProps) {
  return (
    <section
      className={`${className ?? ""} ${styles.root} ${
        isAttached ? styles.attached : ""
      }`}
    >
      <ContentContainer>
        <Substrate withShadow="light" className={styles.substrate}>
          <CustomTitle tag="h2" className={styles.title}>
            {titles[variant]}
          </CustomTitle>

          <p className={styles.lead}>
            {variant === "osago" ? (
              <>
                Тарифы устанавливает Кабинет Министров Республики Абхазия.
                Стоимость зависит только от типа транспорта и срока пребывания.
              </>
            ) : (
              <>
                Тариф зависит только от срока пребывания и не зависит от
                возраста застрахованного. Страховая сумма по полису –
                70&nbsp;000&nbsp;₽ на человека.
              </>
            )}
          </p>

          {/* Семь колонок на мобильном не помещаются: таблица скроллится
              по горизонтали, первая колонка липкая, чтобы при прокрутке было
              видно, к какой строке относится цена. */}
          <div className={styles.scroller} tabIndex={0} role="group">
            {variant === "osago" ? (
              <table className={styles.table} aria-label={captions.osago}>
                <thead>
                  <tr>
                    <th scope="col" className={styles.rowHead}>
                      Тип транспортного средства
                    </th>
                    {osagoDurations.map((duration) => (
                      <th scope="col" key={duration} className={styles.colHead}>
                        {duration}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {osagoTariffs.map((row) => (
                    <tr key={row.vehicle}>
                      <th scope="row" className={styles.rowHead}>
                        {row.vehicle}
                      </th>
                      {row.prices.map((price, i) => (
                        <td
                          key={`${row.vehicle}-${osagoDurations[i]}`}
                          className={styles.price}
                        >
                          {formatPrice(price)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className={styles.table} aria-label={captions.ns}>
                <thead>
                  <tr>
                    <th scope="col" className={styles.rowHead}>
                      Срок пребывания
                    </th>
                    <th scope="col" className={styles.colHead}>
                      Стоимость на одного человека
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {nsTariffs.map((row) => (
                    <tr key={row.duration}>
                      <th scope="row" className={styles.rowHead}>
                        {row.duration}
                      </th>
                      <td className={styles.price}>{formatPrice(row.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <p className={styles.tableNote}>{captions[variant]}</p>

          <p className={styles.source}>
            <b>Актуально на {TARIFFS_SOURCE.year} год.</b> Тарифы установлены
            документом «{TARIFFS_SOURCE.document}», {TARIFFS_SOURCE.revision}.{" "}
            <a
              href={TARIFFS_SOURCE.href}
              className={styles.link}
              target="_blank"
              rel="nofollow noopener"
            >
              Открыть документ
            </a>
          </p>
        </Substrate>
      </ContentContainer>
    </section>
  );
}

export default TariffTable;
