import Blog from "@/components/widgets/Blog/Blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Блог – страховка в Абхазии, ОСАГО и автострахование онлайн",
  description:
    "Статьи о страховании в Абхазии: нужен ли полис, сколько стоит ОСАГО, какие документы нужны для въезда на автомобиле и что делать при ДТП.",
};

export default function BlogPage() {
  return <Blog />;
}
