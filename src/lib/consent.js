// Cookie-consent storage. One cookie holds the visitor's category choices;
// components read it to decide whether the banner shows and whether analytics
// may load. `consent-changed` fires on every write so the analytics loader can
// react without a reload.

const COOKIE = "sm_cookie_consent";
const VERSION = 1;
const MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export function getConsent() {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE}=`));
  if (!match) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(match.split("=").slice(1).join("=")));
    if (parsed && parsed.v === VERSION) return parsed;
    return null; // stale schema → treat as no choice
  } catch {
    return null;
  }
}

export function setConsent(partial) {
  if (typeof document === "undefined") return;
  const value = {
    v: VERSION,
    necessary: true,
    functional: !!partial.functional,
    performance: !!partial.performance,
    ts: Date.now(),
  };
  document.cookie = `${COOKIE}=${encodeURIComponent(
    JSON.stringify(value)
  )}; path=/; max-age=${MAX_AGE}; SameSite=Lax`;
  window.dispatchEvent(new CustomEvent("consent-changed", { detail: value }));
  return value;
}

export function acceptAll() {
  return setConsent({ functional: true, performance: true });
}

export function rejectAll() {
  return setConsent({ functional: false, performance: false });
}
