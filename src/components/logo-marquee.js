// Logo files live in /public/logo; brands without a file render as text
// wordmarks until their logo arrives.
const LOGO_DIR = "/logo";

const clients = [
  { name: "Indicus Paints", logo: `${LOGO_DIR}/indicus.png` },
  { name: "KVB", logo: `${LOGO_DIR}/karur-vysya-bank.png` },
  { name: "TAFE Tribe", logo: `${LOGO_DIR}/tafe-tribe.png` },
  { name: "Super Kings Academy", logo: `${LOGO_DIR}/csk.png` },
  { name: "NAC Jewellers", logo: `${LOGO_DIR}/nac-jewellers.png` },
  { name: "Veranda IAS", logo: `${LOGO_DIR}/veranda-ias.png` },
  { name: "Dahnay", logo: `${LOGO_DIR}/dahnay.png` },
  { name: "Visvas" },
  { name: "Nithya Amirtham", logo: `${LOGO_DIR}/nithya-amirtham-1.png` },
  { name: "Inspace India", logo: `${LOGO_DIR}/inspace.png` },
  { name: "Inspace Store" },
  { name: "Irezumi", logo: `${LOGO_DIR}/irezumi.png` },
  { name: "Astrazeneca" },
  { name: "Sundari Silks", logo: `${LOGO_DIR}/sundari-silks.png` },
  { name: "Annapoorna Masalas" },
  { name: "Frankfinn" },
  { name: "Mylapore Times" },
  { name: "Mandela", logo: `${LOGO_DIR}/mandela.png` },
];

const rowOne = clients.slice(0, 9);
const rowTwo = clients.slice(9);

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

export default function LogoMarquee() {
  return (
    <section className="py-14 lg:py-24">
      <p className="mb-10 text-center font-mono text-xs font-medium uppercase tracking-[0.02em] text-muted-foreground">
        Trusted by Leading Brands Across Industries
      </p>
      <div className="flex flex-col gap-6">
        <MarqueeRow items={rowOne} reverse />
        <MarqueeRow items={rowTwo} />
      </div>
    </section>
  );
}
