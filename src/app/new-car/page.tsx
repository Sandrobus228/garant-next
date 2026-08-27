import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import CarsNew from "@/components/widgets/CarsNew/CarsNew";
import type { Metadata } from "next";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { formPageViewport } from "@/config/viewport.config";

export const viewport = formPageViewport;

export const metadata: Metadata = {
  title: "Добавить авто",
  ...NO_INDEX_PAGE,
};

export default function CarsPage() {
  return (
    <ContentContainer>
      <CarsNew />
    </ContentContainer>
  );
}
