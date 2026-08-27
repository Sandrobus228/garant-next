import RecoveryEmail from "@/components/widgets/RecoveryEmail/RecoveryEmail";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import type { Metadata } from "next";
import { Suspense } from "react";
import { formPageViewport } from "@/config/viewport.config";

export const viewport = formPageViewport;

export const metadata: Metadata = {
  title: "Восстановление",
  ...NO_INDEX_PAGE,
};
export default function Recovery() {
  return (
    <Suspense>
      <RecoveryEmail />
    </Suspense>
  );
}
