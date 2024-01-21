"use client";

import { useEffect, useState } from "react";
import i18next from "i18next";
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from "react-i18next";
import { useCookies } from "react-cookie";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import {
  getOptions,
  supportedLngs,
  languageCookieName,
  fallbackLng,
  defaultNS,
} from "./settings";

const runsOnServerSide = typeof window === "undefined";

/*
  i18next 객체를 초기화합니다.
  이 과정은 클라이언트 어플리케이션이 마운트될 때 최초 1 회만 실행되어야 합니다.
 */
void i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`),
    ),
  )
  .init({
    ...getOptions(fallbackLng, defaultNS),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
    preload: runsOnServerSide ? supportedLngs : [],
  });

/**
 * (CSR 컴포넌트) Hook 을 호출한 위치에서 i18next 인스턴스를 초기화 및 생성하고, 설정 구성 및 인스턴스 참조를 반환합니다.
 * @param lng - 언어 설정
 * @param ns - 네임스페이스 설정
 * @param options - 인스턴스를 이용한 t() 함수를
 * @returns 설정 구성 및 인스턴스 참조를 반환합니다.
 */
export function useTranslation(
  lng: Parameters<
    ReturnType<typeof useTranslationOrg>["i18n"]["changeLanguage"]
  >[0],
  ns: Parameters<typeof useTranslationOrg>[0],
  options?: Parameters<typeof useTranslationOrg>[1],
) {
  const [cookies, setCookie] = useCookies([languageCookieName]);
  const ret = useTranslationOrg(ns, options);
  const { i18n } = ret;
  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    void i18n.changeLanguage(lng);
  } else {
  }
  const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);
  useEffect(() => {
    if (activeLng === i18n.resolvedLanguage) return;
    setActiveLng(i18n.resolvedLanguage);
  }, [activeLng, i18n.resolvedLanguage]);
  useEffect(() => {
    if (!lng || i18n.resolvedLanguage === lng) return;
    void i18n.changeLanguage(lng);
  }, [lng, i18n]);
  useEffect(() => {
    if (cookies.i18next === lng) return;
    setCookie(languageCookieName, lng, { path: "/" });
  }, [lng, setCookie, cookies.i18next]);
  return ret;
}
