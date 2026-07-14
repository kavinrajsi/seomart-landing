// Client-side attribution capture for the audit form. UTM + click IDs are
// first-touch: stored in sessionStorage the first time they appear on the URL,
// then merged at submit so in-page navigation doesn't lose them. IP and
// user-agent are added server-side in /api/audit.

const STORE_KEY = "sm_first_touch";

const CLICK_IDS = ["gclid", "wbraid", "gbraid", "fbclid", "msclkid"];
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
];

function readFirstTouch() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(STORE_KEY) || "{}");
  } catch {
    return {};
  }
}

// Call once on mount: persist the first set of UTM/click-id params seen.
export function initFirstTouch() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const existing = readFirstTouch();
  const next = { ...existing };
  let changed = false;
  for (const key of [...UTM_KEYS, ...CLICK_IDS]) {
    if (!next[key] && params.get(key)) {
      next[key] = params.get(key);
      changed = true;
    }
  }
  if (changed) {
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify(next));
    } catch {
      /* ignore quota / disabled storage */
    }
  }
}

// Build the tracking payload sent with the form.
export function captureTracking() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const all = {};
  for (const [key, value] of params.entries()) all[key] = value;

  const firstTouch = readFirstTouch();
  const pick = (key) => params.get(key) || firstTouch[key] || undefined;

  return {
    pageUrl: window.location.href,
    referrer: document.referrer || undefined,
    utmSource: pick("utm_source"),
    utmMedium: pick("utm_medium"),
    utmCampaign: pick("utm_campaign"),
    utmTerm: pick("utm_term"),
    utmContent: pick("utm_content"),
    gclid: pick("gclid"),
    wbraid: pick("wbraid"),
    gbraid: pick("gbraid"),
    fbclid: pick("fbclid"),
    msclkid: pick("msclkid"),
    // Catch-all: every query param present now, merged over first-touch.
    params: { ...firstTouch, ...all },
  };
}
