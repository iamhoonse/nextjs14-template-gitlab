import { type NextMiddleware, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import {
  fallbackLng,
  supportedLngs,
  languageCookieName,
} from "@/app/i18n/settings";

/*
  지원할 언어 목록을 설정합니다.
 */
acceptLanguage.languages(supportedLngs);

/**
 *
 */
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};

/**
 * HTTP 요청을 처리하기 전에 언어 감지 로직을 실행하여 Request Handler 에게 전달해 줍니다.
 * @param req - HTTP Request 정보 객체
 */
export const middleware: NextMiddleware = req => {
  let lang: ReturnType<(typeof acceptLanguage)["get"]> = null;
  if (req.cookies.has(languageCookieName))
    lang = acceptLanguage.get(req.cookies.get(languageCookieName)?.value);
  if (!lang) lang = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lang) lang = fallbackLng;

  // Redirect if lng in path is not supported
  if (
    !supportedLngs.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(
      new URL(`/${lang}${req.nextUrl.pathname}`, req.url),
    );
  }

  const referer = req.headers.get("referer");
  if (referer) {
    const refererUrl = new URL(referer);
    const lngInReferer = supportedLngs.find(l =>
      refererUrl.pathname.startsWith(`/${l}`),
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(languageCookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
};
