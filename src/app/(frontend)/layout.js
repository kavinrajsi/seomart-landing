import { Anek_Tamil } from "next/font/google";
import Preloader from "@/components/preloader";
import AuditProvider from "@/components/audit-provider";
import CookieConsent from "@/components/cookie-consent";
import Analytics from "@/components/analytics";
import "./globals.css";

const anekTamil = Anek_Tamil({
  variable: "--font-anek-tamil",
  subsets: ["latin", "tamil"],
  weight: ["300", "400", "500", "600", "700"],
});

const SITE_URL = "https://searchmadarth-landing.vercel.app";
const TITLE =
  "SearchMadarth® — SEO, AEO & GEO Agency | We Search. We Build. We Grow Your Business.";
const DESCRIPTION =
  "SearchMadarth® is a digital growth agency for Indian SMEs offering SEO, Answer Engine Optimisation (AEO), Generative Engine Optimisation (GEO), Google Ads, Meta advertising and performance-first web development — 1000+ brands served, results measured in revenue.";
const OG_IMAGE = {
  url: "/meta-og-image.png",
  width: 1200,
  height: 628,
  alt: "SearchMadarth® — We Search. We Build. We Grow Your Business.",
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | SearchMadarth®",
  },
  description: DESCRIPTION,
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  keywords: [
    "SEO agency India",
    "Answer Engine Optimisation",
    "AEO",
    "Generative Engine Optimisation",
    "GEO",
    "AI search optimisation",
    "AIO",
    "digital marketing agency India",
    "Google Ads management",
    "Meta advertising",
    "performance marketing SME",
    "web development agency",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "SearchMadarth®",
    locale: "en_IN",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={anekTamil.variable}>
      <body>
        <Preloader />
        <AuditProvider>{children}</AuditProvider>
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
