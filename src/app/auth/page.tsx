import Auth from "@/components/widgets/Auth/Auth";
import type { Metadata } from "next";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { formPageViewport } from "@/config/viewport.config";

export const viewport = formPageViewport;

export const metadata: Metadata = {
  title: "Личный кабинет - страховка в Абхазии | Гарант-Страхование",
  description: "Войдите в личный кабинет, чтобы оформить страховку в Абхазию, скачать полис, оплатить и проверить статус онлайн.",
  ...NO_INDEX_PAGE,
};

export default function HelpPage() {
  return <Auth />;
}
