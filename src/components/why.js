import AccentHeading from "./accent-heading";
import { getWhy } from "@/lib/payload";

export default async function Why() {
  const data = await getWhy();
  if (!data) return null;
  const points = data.points ?? [];

  return (
    <section id="why" className="mx-4 scroll-mt-24 pb-10 lg:pb-30">
      <div className="mx-auto max-w-6xl border-t pt-10 lg:pt-16">
        <h2 className="mb-12 max-w-3xl text-4xl font-semibold sm:text-5xl lg:mb-16 lg:text-6xl">
          <AccentHeading
            before={data.headingBefore}
            accent={data.headingAccent}
            after={data.headingAfter}
          />
        </h2>
        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
          {points.map((point) => (
            <div key={point.id ?? point.title} className="bg-background p-6 lg:p-8">
              <h3 className="mb-2 text-lg font-semibold">{point.title}</h3>
              <p className="text-base text-muted-foreground">{point.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
