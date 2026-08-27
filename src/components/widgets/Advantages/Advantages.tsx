import AdvantagesCard from "@/components/entities/AdvantagesCard/AdvantagesCard";
import React from "react";

import styles from "./Advantages.module.scss";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import { IAdvantageCards } from "@/components/entities/AdvantagesCard/advantages-card.types";

const advantageCards: IAdvantageCards[] = [
  {
    image: "/img/icons/timer.svg",
    title: "Полис за 5 минут",
    descr: "Получите полис онлайн без ожидания в очередях",
    alt: "Таймер",
  },
  {
    image: "/img/icons/wallet.svg",
    title: "Лучшая цена",
    descr: "Покупайте только то, что нужно именно вам",
    alt: "Кошелек",
  },
  {
    image: "/img/icons/folder.svg",
    title: "Всегда в телефоне",
    descr: "Электронный полис примут с экрана, распечатывать не нужно",
    alt: "Папка",
  },
];

const Advantages = () => {
  return (
    <ContentContainer>
      <section className={styles.root}>
        {advantageCards.map((card, idx) => (
          <AdvantagesCard
            className={styles.card}
            key={`advCard${idx}`}
            cardInfo={card}
          />
        ))}
      </section>
    </ContentContainer>
  );
};

export default Advantages;
