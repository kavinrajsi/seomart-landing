import Button from "./button";
import SearchDemo from "./search-demo";
import { getHero } from "@/lib/payload";

const externalProps = (href) =>
  href && /^https?:\/\//.test(href)
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

export default async function Hero() {
  const data = await getHero();
  if (!data) return null;

  // CMS-defined search-demo pairs; empty → component falls back to defaults.
  const searchPairs = (data.searchPairs ?? [])
    .map((p) => ({
      query: p.query,
      results: (p.results ?? []).map((r) => r.text).filter(Boolean),
    }))
    .filter((p) => p.query && p.results.length);

  return (
    <section id="hero" className="section-hero mx-4 pt-36 pb-10 lg:pt-44 lg:pb-20">
      <div className="mx-auto flex max-w-6xl flex-col items-start lg:items-center text-left lg:text-center">
        <h1 className="mb-8 max-w-screen-md text-4xl font-semibold text-pretty lg:text-7xl">
          {data.headline}
        </h1>
        <p className="mb-10 max-w-screen-md text-lg text-muted-foreground lg:text-xl">
          {data.subhead}
        </p>
        <div className="mb-14 flex flex-col gap-3 sm:flex-row">
          {data.primaryCtaLabel && (
            <Button href={data.primaryCtaHref} size="lg" {...externalProps(data.primaryCtaHref)}>
              {data.primaryCtaLabel}
            </Button>
          )}
          {data.secondaryCtaLabel && (
            <Button
              href={data.secondaryCtaHref}
              variant="outline"
              size="lg"
              {...externalProps(data.secondaryCtaHref)}
            >
              {data.secondaryCtaLabel}
            </Button>
          )}
        </div>
        <div className="w-full">
          <SearchDemo pairs={searchPairs.length ? searchPairs : undefined} />
        </div>
      </div>
    </section>
  );
}
