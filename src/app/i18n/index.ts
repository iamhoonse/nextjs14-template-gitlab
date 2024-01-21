import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions } from "./settings";

/**
 * i18next 인스턴스를 초기화하고 참조를 반환하는 함수 타입
 */
type initI18Next = (
  lng: Parameters<typeof getOptions>[0],
  ns: Parameters<typeof getOptions>[1],
) => Promise<ReturnType<typeof createInstance>>;

/**
 * i18next 인스턴스를 초기화하고 참조를 반환합니다.
 * @param lng - 언어 설정
 * @param ns - 네임스페이스 설정
 */
const initI18next: initI18Next = async (lng, ns) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (
          language: Parameters<initI18Next>[0],
          namespace: Parameters<initI18Next>[1],
        ) => import(`./locales/${language}/${namespace}.json`),
      ),
    )
    .init(getOptions(lng, ns));
  return i18nInstance;
};

/**
 * 호출한 위치에서 i18next 인스턴스를 초기화 및 생성하고, 설정 구성 및 인스턴스 참조를 반환하는 Hook 타입
 */
type UseTranslation = (
  lng: Parameters<typeof initI18next>[0],
  ns: Parameters<typeof initI18next>[1],
  options?: { keyPrefix?: string },
) => Promise<{
  t: ReturnType<typeof createInstance>["t"];
  i18n: ReturnType<typeof createInstance>;
}>;

/**
 * Hook 을 호출한 위치에서 i18next 인스턴스를 초기화 및 생성하고, 설정 구성 및 인스턴스 참조를 반환합니다.
 * @param lng - 언어 설정
 * @param ns - 네임스페이스 설정
 * @param options - 인스턴스를 이용한 t() 함수를
 * @returns 설정 구성 및 인스턴스 참조를 반환합니다.
 */
export const useTranslation: UseTranslation = async (lng, ns, options = {}) => {
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT(
      lng,
      ns, // Array.isArray(ns) ? ns[0] : ns
      options.keyPrefix,
    ),
    i18n: i18nextInstance,
  };
};
