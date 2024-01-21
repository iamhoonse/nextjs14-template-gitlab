import { type FC } from "react";
import Link from "next/link";
import { Trans } from "react-i18next/TransWithoutContext";
import { supportedLngs } from "@/app/i18n/settings";
import { type useTranslation } from "@/app/i18n";

/**
 * LanguageSwitchPanel 컴포넌트 props 목록 정의
 */
interface LanguageSwitchPanelProps {
  /**
   * 현재 사용 중인 언어
   */
  lng: Parameters<typeof useTranslation>[0];
  /**
   * 현재 위치한 페이지의 pathname
   */
  currentPathName: string;
  /**
   * 다국어 메세지 반환 함수
   */
  t: Awaited<ReturnType<typeof useTranslation>>["t"];
}

/**
 * 언어 변경 패널 컴포넌트
 * @param lng - 현재 사용 중인 언어
 * @param currentPathName - 현재 위치한 페이지의 pathname
 * @param t - 다국어 메세지 반환 함수
 */
const LanguageSwitchPanel: FC<LanguageSwitchPanelProps> = ({
  lng,
  currentPathName,
  t,
}) => {
  /*
    컴포넌트 구조
   */
  return (
    <footer style={{ marginTop: 50 }}>
      <Trans i18nKey="languageSwitcher" t={t}>
        {/* @ts-expect-error TS2353 */}
        Switch from <strong>{{ lng }}</strong> to:
      </Trans>
      {supportedLngs
        .filter(l => lng !== l)
        .map((l, index) => {
          return (
            <span key={l}>
              {index > 0 && " or "}
              <Link href={`/${l}/${currentPathName}`}>{l}</Link>
            </span>
          );
        })}
    </footer>
  );
};
export default LanguageSwitchPanel;
