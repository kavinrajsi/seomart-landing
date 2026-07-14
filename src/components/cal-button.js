"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import Button from "./button";

const CAL_NAMESPACE = "15min";
const CAL_LINK = "madformangoes-1ansq1/15min";

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
