"use client";

import Button from "./button";

// Client trigger for use inside server components. Opens the audit form via the
// global event so it doesn't need the context directly.
export default function AuditButton({ children, ...props }) {
  return (
    <Button
      {...props}
      onClick={() => window.dispatchEvent(new Event("open-audit"))}
    >
      {children}
    </Button>
  );
}
