import Link from "next/link";
import Logo from "./logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/#process", label: "Process" },
  { href: "/#why", label: "Why Us" },
  { href: "/#faq", label: "FAQ" },
];

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/cookie-policy", label: "Cookie Policy" },
];

export default function Footer() {
  return (
    <footer className="bg-primary pb-24 text-primary-foreground sm:pb-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 border-t-[4px] border-white/10 px-6 pt-10 md:pt-14">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          <Logo className="h-5 w-auto" />
          <nav
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
            aria-label="Footer"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-xs uppercase tracking-[0.1em] text-primary-foreground/60 hover:text-primary-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <nav
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
            aria-label="Legal"
          >
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-[11px] uppercase tracking-[0.1em] text-primary-foreground/50 hover:text-primary-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.1em] text-primary-foreground/50">
            © {new Date().getFullYear()} SearchMadarth®. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
