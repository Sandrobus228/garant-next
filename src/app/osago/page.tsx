import { IAudienceInfoItem } from "@/components/entities/AudienceInfoItem/audience-info-item.types";
import AudienceInfoBlock from "@/components/widgets/AudienceInfoBlock/AudienceInfoBlock";
import DiscountBanner from "@/components/widgets/DiscountBanner/DiscountBanner";
import FAQ from "@/components/widgets/FAQ/FAQ";
import { InsuranceBannerOsago } from "@/components/widgets/InsuranceBannerOsago/InsuranceBannerOsago";
import PolicyPromo from "@/components/widgets/PolicyPromo/PolicyPromo";
import ReviwesYandex from "@/components/widgets/ReviwesYandex/ReviwesYandex";
import TariffTable from "@/components/widgets/TariffTable/TariffTable";
import Breadcrumbs from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { PAGES } from "@/config/pages-url.config";
import type { Metadata } from "next";

const audienceItems: IAudienceInfoItem[] = [
  {
    title: "Обязателен по закону",
    description:
      "Требование действует с 2022 года, за отсутствие полиса штрафуют на 3 000 ₽",
    imageAlt: "Весы правосудия",
    imageUrl: "/img/scales.png",
  },
  {
    title: "Выплата до 50 000 ₽",
    description:
      "Столько получит пострадавшая сторона, если виновником ДТП окажетесь вы",
    imageAlt: "Денежные купюры",
    imageUrl: "/img/cash.png",
  },
  {
    title: "Действует по всей Абхазии",
    description:
      "Полис работает на всей территории республики весь выбранный срок",
    imageAlt: "Спокойный отдых",
    imageUrl: "/img/meditation.png",
  },
];

export const metadata: Metadata = {
  title: "ОСАГО в Абхазии – страховка онлайн для граждан РФ",
  description:
    "ОСАГО в Абхазии для россиян: тарифы на все категории транспорта, от 1 000 ₽ за 15 суток. Полис онлайн за 3–5 минут, приходит на email.",
};

export default function OsagoPage() {
  return (
    <div>
      <Breadcrumbs
        items={[
          { name: "Главная", href: PAGES.HOME },
          { name: "ОСАГО", href: PAGES.OSAGO },
        ]}
      />
      {/* <DiscountBanner /> */}
      <PolicyPromo variant="osago" />
      <AudienceInfoBlock
        title="Почему нужен полис ОСАГО"
        audienceItems={audienceItems}
      />
      <InsuranceBannerOsago />
      <TariffTable variant="osago" isAttached />
      <ReviwesYandex title="Отзывы об оформлении ОСАГО" />
      <FAQ
        isIsolated
        set="osago"
        title="Вопросы об ОСАГО в Абхазии"
      />
    </div>
  );
}
