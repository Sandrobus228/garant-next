import OsagoApply from "@/components/widgets/OsagoApply/OsagoApply";
import Breadcrumbs from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { PAGES } from "@/config/pages-url.config";
import {
  parseOsagoApplyPrefill,
  TSearchParams,
} from "@/helpers/Apply/applyPrefill.helper";
import type { Metadata } from "next";

import "react-day-picker/style.css";

export const metadata: Metadata = {
  title: "Оформить ОСАГО в Абхазии онлайн",
  description:
    "Оформите полис ОСАГО в Абхазии онлайн. Удобная подача заявки, быстрое оформление и доступ к страховому полису через сервис компании.",
};

interface IProps {
  searchParams: Promise<TSearchParams>;
}

export default async function OsagoApplyPage({ searchParams }: IProps) {
  const prefill = parseOsagoApplyPrefill(await searchParams);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Главная", href: PAGES.HOME },
          { name: "ОСАГО", href: PAGES.OSAGO },
          { name: "Оформление", href: PAGES.OSAGO_APPLY },
        ]}
      />
      <OsagoApply prefill={prefill} />
    </>
  );
}
