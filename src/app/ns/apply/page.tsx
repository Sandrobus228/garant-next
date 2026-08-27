import NsApply from "@/components/widgets/NsApply/NsApply";
import Breadcrumbs from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { PAGES } from "@/config/pages-url.config";
import {
  parseNsApplyPrefill,
  TSearchParams,
} from "@/helpers/Apply/applyPrefill.helper";
import type { Metadata } from "next";

import "react-day-picker/style.css";
import { formPageViewport } from "@/config/viewport.config";

export const viewport = formPageViewport;

export const metadata: Metadata = {
  title: "Оформить полис от несчастного случая в Абхазии онлайн",
  description:
    "Оформление полиса от несчастного случая в Абхазии онлайн. Укажите данные застрахованных, срок пребывания и рассчитайте стоимость страховки.",
};

interface IProps {
  searchParams: Promise<TSearchParams>;
}

export default async function NsApplyPage({ searchParams }: IProps) {
  const prefill = parseNsApplyPrefill(await searchParams);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Главная", href: PAGES.HOME },
          { name: "От несчастного случая", href: PAGES.NS },
          { name: "Оформление", href: PAGES.NS_APPLY },
        ]}
      />
      <NsApply prefill={prefill} />
    </>
  );
}
