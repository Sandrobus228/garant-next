import type { Metadata, Viewport } from "next";

import { Toaster } from "react-hot-toast";

import Header from "@/components/widgets/Header/Header";
import Footer from "@/components/widgets/Footer/Footer";

import "./globals.scss";

import Head from "next/head";
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
    "Предлагаем оформить обязательную и необязательную страховку в Абхазии. Гарантируем подлинность выдаваемого документа. Полис установленного образца. Работаем с юридическими и физическими лицами. Располагаем доступными ценами. Предлагаем программу лояльности для постоянных клиентов, сезонные скидки на услуги.",
  openGraph: {
    siteName: "Гарант-Страхование",
    description: "Страхование в Абхазии онлайн. Быстро, надёжно, официально."
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <Head>
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/favicon/android-chrome-512x512.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />

        {/* <meta property="og:site_name" content="Гарант-Страхование"></meta> */}
        {/* <meta
          property="og:description"
          content="Страхование в Абхазии онлайн. Быстро, надёжно, официально."
        ></meta> */}
      </Head>
      <body>
        {/*
          Safari на iOS увеличивает страницу при фокусе на поле со шрифтом
          мельче 16px и обратно масштаб не возвращает. maximum-scale подавляет
          именно автозум — жест увеличения на iOS 10+ продолжает работать.
          Ставим его только для iOS: в Android автозума нет, а тег там лишь
          отнял бы у пользователя возможность масштабировать страницу.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var u=navigator.userAgent;if(/iP(ad|hone|od)/.test(u)||(/Macintosh/.test(u)&&"ontouchend" in document)){var m=document.querySelector('meta[name=viewport]');if(m)m.content="width=device-width, initial-scale=1, maximum-scale=1"}})()`,
          }}
        />

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
