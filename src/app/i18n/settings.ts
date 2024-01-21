import { type HTMLAttributes } from "react";
import { createInstance } from "i18next";

/**
 * <html> 태그 'lang' attr 타입
 */
type HTMLLanguage = HTMLAttributes<HTMLHtmlElement>["lang"];

/**
 * i18next config 데이터 구조 타입
 */
type I18nConfig = Parameters<ReturnType<typeof createInstance>["init"]>[0];

/**
 * 기본 언어
 */
export const fallbackLng = "ko";

/**
 * 지원 언어 목록
 */
export const supportedLngs: NonNullable<HTMLLanguage>[] = [fallbackLng, "en"];

/**
 * 언어 정보 담을 쿠키 이름
 */
export const languageCookieName = "i18next";

/**
 * 기본 네임스페이스
 */
export const defaultNS = "translation";

/**
 * 전달받은 언어 및 네임스페이스를 반영한 config 구성 객체를 반환합니다.
 * @param lng - 언어 설정
 * @param ns - 네임스페이스 설정
 */
export const getOptions: (
  lng: NonNullable<HTMLLanguage>,
  ns: string,
) => I18nConfig = (lng = fallbackLng, ns = defaultNS) => {
  return {
    supportedLngs,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
};
