import type { Metadata, Viewport } from "next";

import { Toaster } from "react-hot-toast";

import Header from "@/components/widgets/Header/Header";
import Footer from "@/components/widgets/Footer/Footer";

import "./globals.scss";

import { Providers } from "./providers";
import Shadow from "@/components/ui/Shadow/Shadow";
import YandexMetrika from "@/utils/YandexMetrika";
import TrackPageView from "@/utils/TrackPageView";
import GoogleAnalytics from "@/utils/GoogleAnalytics";
import TrackGAView from "@/utils/TrackGAView";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://garant-abh.com"),
  alternates: {
    canonical: "./",
  },
  title: {
    // default: SITE_NAME,
    // template: `%s | ${SITE_NAME}`,
    absolute: "Страховка в Абхазии – ОСАГО онлайн | Гарант-Страхование",
  },
  description:
    "Страховка в Абхазии на автомобиль от 1 000 ₽ за 15 суток. Полис ОСАГО онлайн за 3–5 минут, приходит на email. Штраф за отсутствие полиса – 3 000 ₽.",
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    siteName: "Гарант-Страхование",
    description: "Страхование в Абхазии онлайн. Быстро, надёжно, официально.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
          <Toaster />
          <Shadow />
        </Providers>

        <YandexMetrika ymid={103203587} />
        <TrackPageView ymId={103203587} />
        <GoogleAnalytics gaId="G-J81PQX1RCJ" />
        <TrackGAView gaId="G-J81PQX1RCJ" />

        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="5ec4de52-61e0-446a-beba-15042b428ad4"
        ></script>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Гарант-Страхование",
              alternateName: "Гарант Страхование",
              url: "https://garant-abh.com",
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "InsuranceAgency",
              name: "Гарант-Страхование",
              legalName:
                "ЗАО «Страховая компания «Гарант-Страхование»",
              url: "https://garant-abh.com",
              logo: "https://garant-abh.com/favicon/android-chrome-512x512.png",
              image:
                "https://garant-abh.com/favicon/android-chrome-512x512.png",
              email: "info@garant-abh.com",
              telephone: "+79407411000",
              address: {
                "@type": "PostalAddress",
                addressCountry: "Абхазия",
                addressLocality: "Сухум",
                streetAddress: "проспект Аиааира, 15",
              },
              areaServed: "Республика Абхазия",
              sameAs: ["https://t.me/garantabh", "https://wa.me/79407411000"],
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "SiteNavigationElement",
                  position: 1,
                  name: "Автострахование",
                  url: "https://garant-abh.com/osago",
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 2,
                  name: "Здоровье",
                  url: "https://garant-abh.com/ns",
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 3,
                  name: "Блог",
                  url: "https://garant-abh.com/blog",
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 4,
                  name: "Контакты",
                  url: "https://garant-abh.com/contacts",
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 5,
                  name: "Помощь",
                  url: "https://garant-abh.com/support",
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
