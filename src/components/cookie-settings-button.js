"use client";

// Reopens the cookie-consent banner so visitors can change their choices.
export default function CookieSettingsButton({ className = "" }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
      className={className}
    >
      Cookie Settings
    </button>
  );
}
