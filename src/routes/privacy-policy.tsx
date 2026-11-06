import { createFileRoute } from "@tanstack/react-router";
import { STORE } from "@/data/products";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      {
        title: "Privacy Policy | Vastu Adda",
      },
      {
        name: "description",
        content:
          "Read how Vastu Adda protects and respects your personal information, order details and contact data.",
      },
    ],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <div className="bg-background">
      <section className="bg-secondary/60 py-14 md:py-18 border-b border-border">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="eyebrow text-gold-deep">Data Protection</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold text-forest">
            Privacy Policy
          </h1>
          <div className="gold-line mx-auto mt-4 w-28" />
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Your personal privacy and spiritual inquiries are held in the strictest confidence.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 text-sm leading-relaxed text-foreground/85">
        <div className="rounded-2xl border border-gold/40 bg-card p-6 md:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-forest">
              1. Information We Collect
            </h2>
            <p className="mt-2 text-muted-foreground">
              When you purchase or inquire on Vastu Adda, we collect information required to fulfill
              your order and consecrate your spiritual remedies:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-muted-foreground">
              <li>Name and contact phone number / WhatsApp number</li>
              <li>Shipping address and pincode for courier dispatch</li>
              <li>Optional birth details (Rashi / Gotra / Nakshatra) if requesting personalized Vedic ritual blessings</li>
            </ul>
          </div>

          <div className="border-t border-border pt-6">
            <h2 className="font-display text-2xl font-bold text-forest">
              2. How Your Data is Used
            </h2>
            <p className="mt-2 text-muted-foreground">
              We use your information solely for:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-muted-foreground">
              <li>Processing and delivering your order via our verified courier partners</li>
              <li>Sending automated WhatsApp shipping notifications and tracking links</li>
              <li>Providing order support and consecration details for your remedies</li>
            </ul>
            <p className="mt-3 text-muted-foreground font-semibold">
              We never sell, rent, or trade your personal information to third-party telemarketers or advertisers.
            </p>
          </div>

          <div className="border-t border-border pt-6">
            <h2 className="font-display text-2xl font-bold text-forest">
              3. Payment Security &amp; Encryption
            </h2>
            <p className="mt-2 text-muted-foreground">
              All online transactions are processed through 256-bit SSL encrypted RBI-approved payment
              gateways (Razorpay / Cashfree / UPI). We never store or view your credit card numbers,
              CVV, or banking passwords on our servers.
            </p>
          </div>

          <div className="border-t border-border pt-6">
            <h2 className="font-display text-2xl font-bold text-forest">
              4. Contact &amp; Grievance Officer
            </h2>
            <p className="mt-2 text-muted-foreground">
              If you have any questions or wish to delete your stored details, please reach out to our
              privacy team:
            </p>
            <p className="mt-2 text-xs text-forest font-semibold">
              Email: {STORE.email} · Phone: {STORE.phone} · Address: {STORE.address}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
