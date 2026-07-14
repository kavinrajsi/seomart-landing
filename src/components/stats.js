import StatsClient from "./stats-client";
import { getStats } from "@/lib/payload";

export default async function Stats() {
  const data = await getStats();
  if (!data) return null;

  return (
    <StatsClient
      headingBefore={data.headingBefore}
      headingAccent={data.headingAccent}
      headingAfter={data.headingAfter}
      items={data.items ?? []}
    />
  );
}
