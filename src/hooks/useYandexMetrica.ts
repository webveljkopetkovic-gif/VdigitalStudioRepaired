import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
  }
}

const YM_ID = 113158297;

export function useYandexMetrica() {
  const location = useLocation();
  const prevUrl = useRef<string>(document.referrer);

  useEffect(() => {
    const url = window.location.href;
    window.ym?.(YM_ID, "hit", url, {
      title: document.title,
      referer: prevUrl.current,
    });
    prevUrl.current = url;
  }, [location.pathname, location.search]);
}
