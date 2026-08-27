import { IAudienceInfoItem } from "@/components/entities/AudienceInfoItem/audience-info-item.types";
import AudienceInfoBlock from "@/components/widgets/AudienceInfoBlock/AudienceInfoBlock";
import DiscountBanner from "@/components/widgets/DiscountBanner/DiscountBanner";
import FAQ from "@/components/widgets/FAQ/FAQ";
import { InsuranceBannerNs } from "@/components/widgets/InsuranceBannerNs/InsuranceBannerNs";
import PolicyPromo from "@/components/widgets/PolicyPromo/PolicyPromo";
import ReviwesYandex from "@/components/widgets/ReviwesYandex/ReviwesYandex";
import TariffTable from "@/components/widgets/TariffTable/TariffTable";
import Breadcrumbs from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { PAGES } from "@/config/pages-url.config";
import type { Metadata } from "next";

const audienceItems: IAudienceInfoItem[] = [
  {
    title: "Любителям активного отдыха",
    description: "Увлекаетесь спортом или активно проводите время",
    imageAlt: "backpack",
    imageUrl: "/img/backpack.png",
  },
  {
    title: "Семьям с детьми",
    description:
      "Безопасность и защита от непредвиденных ситуаций для всей семьи",
    imageAlt: "baby_carriage",
    imageUrl: "/img/baby_carriage.png",
  },
  {
    title: "Пожилым туристам",
    description: "Защита от случайных травм и внезапных ухудшений здоровья",
    imageAlt: "elderly",
    imageUrl: "/img/elderly.png",
  },
];

export const metadata: Metadata = {
  title: "Страховка от несчастного случая в Абхазии",
  description:
    "Обязательное страхование от несчастного случая в Абхазии: от 50 ₽ за сутки, страховая сумма 70 000 ₽. Полис онлайн за 3–5 минут на email.",
};

export default function NsPage() {
  return (
    <div>
      <Breadcrumbs
        items={[
          { name: "Главная", href: PAGES.HOME },
          { name: "От несчастного случая", href: PAGES.NS },
        ]}
      />
      {/* <DiscountBanner /> */}
      <PolicyPromo variant="ns" />
      <AudienceInfoBlock
        title="Кого защищает полис"
        audienceItems={audienceItems}
      />
      <InsuranceBannerNs />
      <TariffTable variant="ns" isAttached />
      <ReviwesYandex title="Отзывы о страховании в Абхазии" />
      <FAQ
        isIsolated
        set="ns"
        title="Вопросы о страховании от несчастного случая"
      />
    </div>
  );
}
