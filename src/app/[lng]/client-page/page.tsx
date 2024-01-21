"use client";

import Link from "next/link";
import { useTranslation } from "@/app/i18n/client";
import ClientLanguageSwitcher from "@/containers/LanguageSwitcher/client";
import { type HTMLAttributes, useState } from "react";
import { type NextPage } from "next";

/**
 * 페이지 : /[lng]
 * @param lang - URL Parameter 에 포함된 언어
 */
const ClientPage: NextPage<{
  params: { lng: NonNullable<HTMLAttributes<HTMLHtmlElement>["lang"]> };
}> = ({ params: { lng } }) => {
  const { t } = useTranslation(lng, "client-page");
  const [counter, setCounter] = useState(0);
  return (
    <>
      <h1>{t("title")}</h1>
      <p>{t("counter", { count: counter })}</p>
      <div>
        <button onClick={() => setCounter(Math.max(0, counter - 1))}>-</button>
        <button onClick={() => setCounter(Math.min(10, counter + 1))}>+</button>
      </div>
      <Link href={`/${lng}`}>
        <button type="button">{t("back-to-home")}</button>
      </Link>
      <ClientLanguageSwitcher lng={lng} currentPathName="/client-page" />
    </>
  );
};
export default ClientPage;
