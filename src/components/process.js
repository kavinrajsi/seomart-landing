import ProcessClient from "./process-client";
import { getProcess } from "@/lib/payload";

export default async function Process() {
  const data = await getProcess();
  if (!data) return null;

  return (
    <ProcessClient
      headingBefore={data.headingBefore}
      headingAccent={data.headingAccent}
      headingAfter={data.headingAfter}
      steps={data.steps ?? []}
    />
  );
}
