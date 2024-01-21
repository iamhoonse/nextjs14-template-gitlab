import { NextPage } from "next";
import Link from "next/link";
import type { HTMLAttributes } from "react";
import { useTranslation } from "@/app/i18n";
import { fallbackLng } from "@/app/i18n/settings";
import LanguageSwitcher from "@/containers/LanguageSwitcher";

/**
 * 페이지 : /[lng]/second-page
 * @param lang - URL Parameter 에 포함된 언어
 */
const Page: NextPage<{
  params: { lng: HTMLAttributes<HTMLHtmlElement>["lang"] };
}> = async ({ params: { lng = fallbackLng } }) => {
  /*
    i18next 인스턴스를 초기화 및 생성하고, 설정 구성 및 인스턴스 참조를 가져옵니다.
   */
  const { t } = await useTranslation(lng, "second-page");
  /*
    컴포넌트 구조
   */
  return (
    <>
      <h1>{t("title")}</h1>
      <Link href={`/${lng}`}>{t("back-to-home")}</Link>
      <LanguageSwitcher lng={lng} currentPathName="/second-page" />
    </>
  );
};
export default Page;
