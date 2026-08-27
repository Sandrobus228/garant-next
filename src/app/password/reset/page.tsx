import RecoveryPassword from "@/components/widgets/RecoveryPassword/RecoveryPassword";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import type { Metadata } from "next";
import { Suspense } from "react";
import { formPageViewport } from "@/config/viewport.config";

export const viewport = formPageViewport;

export const metadata: Metadata = {
  title: "Новый пароль",
  ...NO_INDEX_PAGE,
};
export default function NewPasswordPage() {
  return (
    <Suspense>
      <RecoveryPassword />
    </Suspense>
  );
}
