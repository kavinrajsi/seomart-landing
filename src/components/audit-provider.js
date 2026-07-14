"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import AuditForm from "./audit-form";
import { initFirstTouch } from "@/lib/tracking";

const AuditContext = createContext({ openAudit: () => {} });

export function useAudit() {
  return useContext(AuditContext);
}

// Any component (even server-rendered) can open the form by dispatching:
//   window.dispatchEvent(new Event("open-audit"))
export default function AuditProvider({ children }) {
  const [open, setOpen] = useState(false);

  const openAudit = useCallback(() => setOpen(true), []);
  const closeAudit = useCallback(() => setOpen(false), []);

  useEffect(() => {
    initFirstTouch();
    const handler = () => setOpen(true);
    window.addEventListener("open-audit", handler);
    return () => window.removeEventListener("open-audit", handler);
  }, []);

  return (
    <AuditContext.Provider value={{ openAudit }}>
      {children}
      <AuditForm open={open} onClose={closeAudit} />
    </AuditContext.Provider>
  );
}
