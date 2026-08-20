import React from "react";

import styles from "./TariffPrice.module.scss";

import Loader from "@/components/ui/Loader/Loader";

interface IProps {
  preliminaryCost?: number;
  finalCost?: number;
  isLoading?: boolean;
  hint: string;
  className?: string;
}

const TariffPrice = ({
  preliminaryCost,
  finalCost,
  isLoading = false,
  hint,
  className,
}: IProps) => {
  const isPriceReady = finalCost !== undefined && !isLoading;
  const isDiscounted =
    isPriceReady &&
    preliminaryCost !== undefined &&
    preliminaryCost > (finalCost as number);

  return (
    <div
      className={`${styles.root} ${isPriceReady ? styles.ready : ""} ${
        className ? className : ""
      }`}
    >
      <div className={styles.title}>Стоимость полиса</div>

      {isLoading ? (
        <div className={styles.loading}>
          <Loader className={styles.loader} />
          <span>Рассчитываем</span>
        </div>
      ) : isPriceReady ? (
        <div className={styles.priceWrapper}>
          {isDiscounted && (
            <span className={styles.preliminaryCost}>{preliminaryCost} ₽</span>
          )}
          <span className={styles.finalCost}>{finalCost} ₽</span>
        </div>
      ) : (
        <div className={styles.hint}>{hint}</div>
      )}
    </div>
  );
};

export default TariffPrice;
