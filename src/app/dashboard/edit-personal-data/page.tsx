import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import EditPersonalData from "@/components/widgets/EditPersonalData/EditPersonalData";
import type { Metadata } from "next";

import "react-day-picker/style.css";
import { formPageViewport } from "@/config/viewport.config";

export const viewport = formPageViewport;

export const metadata: Metadata = {
  title: "Личный кабинет",
};

export default function EditPersonalDataPage() {
  return <EditPersonalData />;
}
