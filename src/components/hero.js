import Button from "./button";
import SearchDemo from "./search-demo";

export default function Hero() {
  return (
    <section className="mx-4 pt-36 pb-10 lg:pt-44 lg:pb-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
        <h1

          className="mb-8 max-w-screen-md text-4xl font-semibold text-pretty lg:text-7xl"
        >
          We Search. We Build. We Grow Your Business.
        </h1>
        <p

          className="mb-10 max-w-screen-md text-lg text-muted-foreground lg:text-xl"
        >
          At Search Madarth® combines search strategy, paid performance,
          standout design, and performance-first web development, all under one
          roof, all built for real results.
        </p>
        <div className="mb-14 flex flex-col gap-3 sm:flex-row">
          <Button href="#services" size="lg">
            Explore Our Services
          </Button>
          <Button href="https://superengine.vercel.app/?utm_source=searchmadarth&utm_medium=website&utm_campaign=free_audit" target="_blank" rel="noopener noreferrer" variant="outline" size="lg">
            Book a Free Audit
          </Button>
        </div>
        <div className="w-full">
          <SearchDemo />
        </div>
      </div>
    </section>
  );
}
