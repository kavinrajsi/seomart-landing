import PolicyPage, {
  PolicyHeading,
  PolicyText,
  PolicyList,
} from "@/components/policy-page";

export const metadata = {
  title: "Cookie Policy",
  description:
    "How SearchMadarth® uses cookies and similar technologies on this website, and the choices you have to control them.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicy() {
  return (
    <PolicyPage title="Cookie Policy" lastUpdated="14 July 2026">
      <PolicyText>
        This Cookie Policy explains how SearchMadarth® ([LEGAL ENTITY NAME],
        &quot;we&quot;, &quot;us&quot; or &quot;our&quot;) uses cookies and
        similar technologies on this website. It should be read together with
        our Privacy Policy.
      </PolicyText>

      <PolicyHeading>What Are Cookies</PolicyHeading>
      <PolicyText>
        Cookies are small text files placed on your device when you visit a
        website. They help the site function, remember your preferences, and
        provide information about how the site is used.
      </PolicyText>

      <PolicyHeading>Cookies We Use</PolicyHeading>
      <PolicyList
        items={[
          "Essential cookies — required for the website to function correctly; these cannot be switched off.",
          "Analytics cookies — help us understand how visitors use the site (pages visited, time on page, referral source) so we can improve it, for example via Google Analytics.",
          "Advertising cookies — set by platforms such as Google and Meta to measure campaign performance and show relevant ads; these may track your activity across websites.",
        ]}
      />

      <PolicyHeading>Third-Party Cookies</PolicyHeading>
      <PolicyText>
        Some cookies are set by third parties whose services we use, such as
        Google Analytics, Google Ads and Meta. These providers process data
        under their own privacy policies, which we encourage you to review.
      </PolicyText>

      <PolicyHeading>Managing Cookies</PolicyHeading>
      <PolicyText>
        You can control or delete cookies through your browser settings —
        including blocking all cookies or clearing existing ones. Blocking
        essential cookies may affect how this website works. You can also opt
        out of personalised advertising through Google and Meta ad settings.
      </PolicyText>

      <PolicyHeading>Changes to This Policy</PolicyHeading>
      <PolicyText>
        We may update this Cookie Policy from time to time. The revised
        version will be posted on this page with an updated date.
      </PolicyText>

      <PolicyHeading>Contact Us</PolicyHeading>
      <PolicyText>
        SearchMadarth® ([LEGAL ENTITY NAME]), [REGISTERED ADDRESS], Chennai,
        India. Phone: +91 86677 67447. Email: [EMAIL].
      </PolicyText>
    </PolicyPage>
  );
}
