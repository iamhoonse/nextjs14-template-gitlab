import { NextPage } from "next";
import Link from "next/link";
import type { HTMLAttributes } from "react";
import { useTranslation } from "@/app/i18n";
import LanguageSwitcher from "@/containers/LanguageSwitcher";

/**
 * 페이지 : /[lng]
 * @param lang - URL Parameter 에 포함된 언어
 */
const Page: NextPage<{
  params: { lng: NonNullable<HTMLAttributes<HTMLHtmlElement>["lang"]> };
}> = async ({ params: { lng } }) => {
  /*
    i18next 인스턴스를 초기화 및 생성하고, 설정 구성 및 인스턴스 참조를 가져옵니다.
   */
  const { t } = await useTranslation(lng, "home-page");
  /*
    컴포넌트 구조
   */
  return (
    <>
      <h1>{t("title")}</h1>
      <ul>
        <li>
          <Link href={`/${lng}/second-page`}>{t("to-second-page")}</Link>
        </li>
        <li>
          <Link href={`/${lng}/client-page`}>{t("to-client-page")}</Link>
        </li>
      </ul>
      <LanguageSwitcher lng={lng} currentPathName="/" />
    </>
  );
};
export default Page;
