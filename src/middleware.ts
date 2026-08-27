import { NextRequest, NextResponse } from "next/server";

import { PAGES } from "./config/pages-url.config";
import { privatePages } from "./config/pages-privacy.config";

// Параметры формы калькулятора на главной. Форма отправляется методом GET,
// поэтому нативный сабмит (робот, отключённый JS) превращает поля в пустые
// query-параметры и порождает полный дубль главной вида
// /?car_category=&duration_of_stay_osago= — Вебмастер отмечал такие URL.
const CALCULATOR_QUERY_KEYS = [
  "car_category",
  "duration_of_stay_osago",
  "duration_of_stay_ns",
  "number_of_people",
];

export async function middleware(request: NextRequest, response: NextResponse) {
  const { cookies, nextUrl } = request;

  if (
    nextUrl.pathname === PAGES.HOME &&
    CALCULATOR_QUERY_KEYS.some((key) => nextUrl.searchParams.has(key))
  ) {
    const canonical = new URL(PAGES.HOME, request.url);
    return NextResponse.redirect(canonical, 301);
  }

  const token = cookies.get("token2");
  let isPublicPage = true;

  for (let i = 0; i < privatePages.length; i++) {
    if (nextUrl.pathname === privatePages[i]) {
      isPublicPage = false;
      break;
    }
  }

  if (isPublicPage) {
    if (token && nextUrl.pathname === "/auth") {
      return NextResponse.redirect(new URL(PAGES.HOME, request.url));
    }

    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|ttf|eot|otf|js|css|map|pdf|docx|zip)).*)",
  ],
  // matcher: [
  //   "/",
  //   "/calculator",
  //   "/osago",
  //   "/ns",
  //   "/contacts",
  //   "/help",
  //   "/dashboard",
  //   "/documents",
  //   "/about",
  //   "/policy",
  //   "/recovery",
  //   "/auth",
  //   "/osago/apply",
  //   "/ns/apply",
  // ],
  // matcher
};
