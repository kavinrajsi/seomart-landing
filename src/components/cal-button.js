"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import Button from "./button";
import { CAL_NAMESPACE, CAL_LINK } from "@/lib/constants";

export default function CalButton({ children, ...props }) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <Button
      data-cal-namespace={CAL_NAMESPACE}
      data-cal-link={CAL_LINK}
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
      {...props}
    >
      {children}
    </Button>
  );
}
