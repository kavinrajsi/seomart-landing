import Header from "./header";
import Footer from "./footer";
import MobileBar from "./mobile-bar";

export function PolicyHeading({ children }) {
  return <h2 className="mt-10 mb-3 text-xl font-semibold">{children}</h2>;
}

export function PolicyText({ children }) {
  return (
    <p className="mb-4 leading-relaxed text-muted-foreground">{children}</p>
  );
}

export function PolicyList({ items }) {
  return (
    <ul className="mb-4 list-disc pl-6 leading-relaxed text-muted-foreground">
      {items.map((item, i) => (
        <li key={i} className="mb-1">
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function PolicyPage({ title, lastUpdated, children }) {
  return (
    <>
      <Header />
      <main>
        <section className="mx-4 pt-36 pb-16 lg:pt-44">
          <article className="mx-auto max-w-3xl">
            <p className="mb-6 font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
            <h1 className="mb-10 text-4xl font-semibold text-pretty lg:text-5xl">
              {title}
            </h1>
            {children}
          </article>
        </section>
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
