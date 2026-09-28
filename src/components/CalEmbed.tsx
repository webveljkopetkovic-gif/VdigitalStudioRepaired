import React, { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { trackCalBookingCompleted } from "../utils/analytics";

export interface CalEmbedProps {
  onLoaded?: () => void;
  onError?: () => void;
}

type CalWithConfig = typeof Cal & {
  config?: {
    forwardQueryParams?: boolean;
  };
};

// Ensure Cal.config.forwardQueryParams = true so UTM parameters from ads reach Cal.com
const CalComponent = Cal as CalWithConfig;
CalComponent.config = CalComponent.config || {};
CalComponent.config.forwardQueryParams = true;

export const CalEmbed: React.FC<CalEmbedProps> = ({ onLoaded, onError }) => {
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const cal = await getCalApi({
          namespace: "30min",
          embedJsUrl: "https://app.cal.com/embed/embed.js",
        });

        if (cancelled) return;

        cal.config = cal.config || {};
        cal.config.forwardQueryParams = true;

        if (typeof window !== "undefined" && window.Cal) {
          window.Cal.config = window.Cal.config || {};
          window.Cal.config.forwardQueryParams = true;
        }

        cal("ui", {
          theme: "dark",
          layout: "month_view",
          hideEventTypeDetails: false,
          cssVarsPerTheme: {
            dark: { "cal-brand": "#b6ff00", "cal-brand-text": "#0a0a0a" },
          } as unknown as Record<"dark" | "light", Record<string, string>>,
        });

        cal("on", {
          action: "linkReady",
          callback: () => {
            if (!cancelled) {
              onLoaded?.();
            }
          },
        });

        cal("on", {
          action: "linkFailed",
          callback: () => {
            if (!cancelled) {
              onError?.();
            }
          },
        });

        cal("on", {
          action: "bookingSuccessful",
          callback: () => {
            if (!cancelled) {
              trackCalBookingCompleted();
            }
          },
        });
      } catch {
        if (!cancelled) {
          onError?.();
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [onLoaded, onError]);

  return (
    <Cal
      namespace="30min"
      calLink="vdigital/30min"
      calOrigin="https://app.cal.com"
      config={{
        layout: "month_view",
        theme: "dark",
        useSlotsViewOnSmallScreen: "true",
      }}
      style={{ width: "100%", height: "100%", overflow: "auto" }}
    />
  );
};

export default CalEmbed;
