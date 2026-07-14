import PolicyPage, {
  PolicyHeading,
  PolicyText,
  PolicyList,
} from "@/components/policy-page";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How SearchMadarth® collects, uses, stores and protects your personal information across our website and digital marketing services.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicy() {
  return (
    <PolicyPage title="Privacy Policy" lastUpdated="14 July 2026">
      <PolicyText>
        SearchMadarth® ([LEGAL ENTITY NAME], &quot;we&quot;, &quot;us&quot; or
        &quot;our&quot;) respects your privacy and is committed to protecting
        the personal information you share with us. This Privacy Policy
        explains what information we collect, how we use it, and the choices
        you have, when you visit our website or engage our digital marketing,
        SEO, advertising, design or web development services.
      </PolicyText>

      <PolicyHeading>Information We Collect</PolicyHeading>
      <PolicyList
        items={[
          "Contact details you submit through forms, calls or email — such as your name, email address, phone number and company name.",
          "Business information shared during an engagement — such as website access, analytics data, advertising accounts and campaign performance data.",
          "Usage data collected automatically when you browse this website — such as IP address, browser type, device information, pages visited and referral source (see our Cookie Policy).",
        ]}
      />

      <PolicyHeading>How We Use Your Information</PolicyHeading>
      <PolicyList
        items={[
          "To respond to enquiries and provide the free audit or other services you request.",
          "To plan, deliver and report on marketing, SEO, advertising and web development engagements.",
          "To improve our website, services and marketing communication.",
          "To send service updates or marketing communication you have opted in to receive — you can opt out at any time.",
          "To comply with legal obligations under applicable Indian law.",
        ]}
      />

      <PolicyHeading>Sharing of Information</PolicyHeading>
      <PolicyText>
        We do not sell your personal information. We share it only with
        service providers who help us operate — such as hosting, analytics and
        advertising platforms (for example Google and Meta) — under
        appropriate confidentiality terms, or where disclosure is required by
        law.
      </PolicyText>

      <PolicyHeading>Data Retention &amp; Security</PolicyHeading>
      <PolicyText>
        We retain personal information only as long as needed for the purposes
        above or as required by law, and protect it using reasonable technical
        and organisational safeguards. No method of transmission or storage is
        completely secure, and we cannot guarantee absolute security.
      </PolicyText>

      <PolicyHeading>Your Rights</PolicyHeading>
      <PolicyText>
        Subject to applicable law, you may request access to, correction of,
        or deletion of your personal information, or withdraw consent to
        marketing communication, by contacting us using the details below.
      </PolicyText>

      <PolicyHeading>Third-Party Links</PolicyHeading>
      <PolicyText>
        Our website may link to third-party sites. We are not responsible for
        their privacy practices; please review their policies separately.
      </PolicyText>

      <PolicyHeading>Changes to This Policy</PolicyHeading>
      <PolicyText>
        We may update this Privacy Policy from time to time. The revised
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
