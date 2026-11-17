export function trackEvent(
  eventName: "form_submit" | "whatsapp_click" | "phone_click",
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    gtag?: (command: string, action: string, params?: Record<string, unknown>) => void;
    dataLayer?: Record<string, unknown>[];
  };
  if (typeof w.gtag === "function") {
    w.gtag("event", eventName, params);
  } else if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({ event: eventName, ...params });
  }
}
