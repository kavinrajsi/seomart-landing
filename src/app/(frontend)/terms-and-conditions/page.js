import PolicyPage, {
  PolicyHeading,
  PolicyText,
  PolicyList,
} from "@/components/policy-page";

export const metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions governing the use of the SearchMadarth® website and our digital marketing, SEO, advertising and web development services.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsAndConditions() {
  return (
    <PolicyPage title="Terms & Conditions" lastUpdated="14 July 2026">
      <PolicyText>
        These Terms &amp; Conditions (&quot;Terms&quot;) govern your use of the
        SearchMadarth® website and any services provided by SearchMadarth®
        (Pixel Boy Media Publicities Private Limited, &quot;we&quot;, &quot;us&quot; or
        &quot;our&quot;). By using this website or engaging our services, you
        agree to these Terms.
      </PolicyText>

      <PolicyHeading>Services</PolicyHeading>
      <PolicyText>
        We provide digital marketing services including search engine
        optimisation (SEO), answer engine optimisation (AEO), generative
        engine optimisation (GEO), paid advertising management, design, and
        web development. The specific scope, deliverables, timelines and fees
        for any engagement are defined in a separate proposal or agreement
        signed with the client, which prevails over these Terms in case of
        conflict.
      </PolicyText>

      <PolicyHeading>No Guarantee of Results</PolicyHeading>
      <PolicyText>
        Search rankings, advertising performance and traffic depend on
        third-party platforms (such as Google and Meta) and market factors
        outside our control. While we work towards measurable outcomes, we do
        not guarantee specific rankings, traffic volumes or revenue results.
      </PolicyText>

      <PolicyHeading>Client Responsibilities</PolicyHeading>
      <PolicyList
        items={[
          "Provide accurate information and timely access to websites, analytics and advertising accounts needed to deliver the services.",
          "Ensure content and materials you supply do not infringe third-party rights or applicable law.",
          "Pay agreed fees on the schedule set out in the applicable proposal or agreement.",
        ]}
      />

      <PolicyHeading>Intellectual Property</PolicyHeading>
      <PolicyText>
        Content on this website — including text, graphics, logos and the
        SearchMadarth® mark — belongs to us or our licensors and may not be
        reproduced without permission. Ownership of deliverables created
        during an engagement is set out in the applicable agreement; unless
        agreed otherwise, deliverables transfer to the client on full payment,
        while we retain our pre-existing tools, know-how and methods.
      </PolicyText>

      <PolicyHeading>Limitation of Liability</PolicyHeading>
      <PolicyText>
        To the maximum extent permitted by law, we are not liable for
        indirect, incidental or consequential losses, loss of profit, or loss
        of data arising from the use of this website or our services. Our
        total liability for any engagement is limited to the fees paid by the
        client for that engagement.
      </PolicyText>

      <PolicyHeading>Third-Party Platforms</PolicyHeading>
      <PolicyText>
        Our services involve third-party platforms whose terms and policies
        apply independently. Changes to those platforms (algorithm updates,
        policy changes, account actions) are outside our control.
      </PolicyText>

      <PolicyHeading>Termination</PolicyHeading>
      <PolicyText>
        Either party may terminate an engagement in accordance with the
        applicable agreement. Fees for work performed up to the date of
        termination remain payable.
      </PolicyText>

      <PolicyHeading>Governing Law</PolicyHeading>
      <PolicyText>
        These Terms are governed by the laws of India. Courts at Chennai,
        Tamil Nadu shall have exclusive jurisdiction over any disputes.
      </PolicyText>

      <PolicyHeading>Changes to These Terms</PolicyHeading>
      <PolicyText>
        We may revise these Terms from time to time. The updated version will
        be posted on this page with a revised date.
      </PolicyText>

      <PolicyHeading>Contact Us</PolicyHeading>
      <PolicyText>
        SearchMadarth® (Pixel Boy Media Publicities Private Limited), 4, Alamelu Manga Puram Rd, Saradapuram, Mylapore, Chennai, Greater Chennai, Tamil Nadu 600004, India. Phone: +91 86677 67447. Email: business@madarth.com.
      </PolicyText>
    </PolicyPage>
  );
}
