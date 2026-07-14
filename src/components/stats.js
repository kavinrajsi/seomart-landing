import CountUp from "./count-up";
import AccentHeading from "./accent-heading";
import { getStats } from "@/lib/payload";

export default async function Stats() {
  const data = await getStats();
  if (!data) return null;
  const stats = data.items ?? [];

  return (
    <section className="mx-4 pb-10 lg:pb-30">
      <div className="mx-auto max-w-6xl border-t pt-10 lg:pt-16">
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
              <p className="mb-4 text-6xl font-light lg:text-7xl">
                {stat.prefix}
                <CountUp value={stat.value} decimals={stat.decimals ?? undefined} />
                {stat.suffix}
              </p>
              <p className="line-clamp-3 text-base leading-normal text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
