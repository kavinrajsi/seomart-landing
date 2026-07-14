import { getClients } from "@/lib/payload";

function ClientMark({ client }) {
  if (client.logo) {
    return (
      <img
        src={client.logo}
        alt={client.name}
        className="h-[100px] w-auto object-contain"
      />
    );
  }
  return (
    <span className="whitespace-nowrap text-lg font-semibold text-muted-foreground/70">
      {client.name}
    </span>
  );
}

function MarqueeRow({ items, reverse = false }) {
  return (
    <div className="marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={`${
          reverse ? "marquee-track-reverse" : "marquee-track"
        } flex w-max items-center gap-12 pr-12`}
      >
        {[...items, ...items].map((client, i) => (
          <div key={`${client.name}-${i}`} aria-hidden={i >= items.length}>
            <ClientMark client={client} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function LogoMarquee() {
  const clients = await getClients();
  if (!clients.length) return null;

  const half = Math.ceil(clients.length / 2);
  const rowOne = clients.slice(0, half);
  const rowTwo = clients.slice(half);

  return (
    <section className="py-14 lg:py-24">
      <p className="mb-10 text-center font-mono text-xs font-medium uppercase text-muted-foreground">
        Trusted by Leading Brands Across Industries
      </p>
      <div className="flex flex-col gap-6">
        <MarqueeRow items={rowOne} reverse />
        <MarqueeRow items={rowTwo} />
      </div>
    </section>
  );
}
