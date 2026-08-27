import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Страница была заглушкой с прошлогодней акцией и индексировалась
        // с description главной. Калькулятор живёт на главной, ведём туда.
        source: "/calculator",
        destination: "/",
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://xn----nbck7b7ald8atlv.xn--y9a3aq/strahovanie.loc/public/:path*",
      },
    ];
  },
};

export default nextConfig;
