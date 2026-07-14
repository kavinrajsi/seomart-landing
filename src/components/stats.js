import CountUp from "./count-up";
import AccentHeading from "./accent-heading";
import { getStats } from "@/lib/payload";

export default async function Stats() {
  const data = await getStats();
  if (!data) return null;
  const stats = data.items ?? [];

  return (
    <section className="mx-4 pb-10 lg:pb-30">
      <div className="mx-auto max-w-6xl border-t-[4px] pt-10 lg:pt-16">
        <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.02em] text-muted-foreground">
          {data.eyebrow}
        </p>
        <h2 className="mb-12 max-w-3xl text-4xl font-semibold sm:text-5xl lg:mb-16 lg:text-6xl">
          <AccentHeading
            before={data.headingBefore}
            accent={data.headingAccent}
            after={data.headingAfter}
          />
        </h2>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id ?? stat.label}>
              <p className="mb-3 text-6xl font-semibold tracking-tight lg:text-7xl">
                {stat.prefix}
                <CountUp value={stat.value} decimals={stat.decimals ?? undefined} />
                {stat.suffix}
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
