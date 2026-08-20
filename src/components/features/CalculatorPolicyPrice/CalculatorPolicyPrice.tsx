import React from "react";

import Button from "@/components/ui/Button/Button";

import styles from "./CalculatorPolicyPrice.module.scss";
import useCurrientCar from "@/stores/Cars/currientCar";
import useCurrientOsagoPolicy from "@/stores/Policy/currientOsagoPolicy";
import useCurrientNsPolicy from "@/stores/Policy/currientNsPolicy";

interface IProps {
  price: number;
  policyType: "osago" | "ns";
  className: string;
  applyHref: string;
}

const CalculatorPolicyPrice = ({
  price,
  policyType,
  className,
  applyHref,
}: IProps) => {
  const setCar = useCurrientCar((state) => state.setCar);
  const setOsagoPolicy = useCurrientOsagoPolicy((state) => state.setPolicy);
  const setNsPolicy = useCurrientNsPolicy((state) => state.setPolicy);

  // оформление начинается с чистого листа — данные для формы придут из ссылки
  const handleClick = () => {
    setCar(undefined);
    setOsagoPolicy(undefined);
    setNsPolicy(undefined);
  };

  return (
    <div className={`${styles.root} ${className}`}>
      <div className={styles.priceWrapper}>
        <h3 className={styles.title}>Стоимость полиса</h3>
        <p className={styles.price}>{price} ₽</p>
      </div>
      <Button
        className={styles.button}
        isLink={true}
        href={applyHref}
        onClickEvent={handleClick}
      >
        Купить полис
      </Button>
    </div>
  );
};

export default CalculatorPolicyPrice;
