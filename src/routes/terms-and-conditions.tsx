import { createFileRoute } from "@tanstack/react-router";
import { STORE } from "@/data/products";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      {
        title: "Terms & Conditions | Vastu Adda",
      },
      {
        name: "description",
        content:
          "Terms of Service and spiritual remedy disclaimer for orders placed on Vastu Adda.",
      },
    ],
  }),
  component: TermsAndConditionsPage,
});

function TermsAndConditionsPage() {
  return (
    <div className="bg-background">
      <section className="bg-secondary/60 py-14 md:py-18 border-b border-border">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="eyebrow text-gold-deep">Store Guidelines</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold text-forest">
            Terms &amp; Conditions
          </h1>
          <div className="gold-line mx-auto mt-4 w-28" />
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Please review the terms of service governing purchases on Vastu Adda.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 text-sm leading-relaxed text-foreground/85">
        <div className="rounded-2xl border border-gold/40 bg-card p-6 md:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-forest">
              1. Acceptance of Terms
            </h2>
            <p className="mt-2 text-muted-foreground">
              By accessing Vastu Adda, browsing our collections, or placing an order, you agree to
              be bound by these terms, our shipping policy, and refund rules.
            </p>
          </div>

          <div className="border-t border-border pt-6">
            <h2 className="font-display text-2xl font-bold text-forest">
              2. Authentic Crystal &amp; Natural Mineral Authenticity
            </h2>
            <p className="mt-2 text-muted-foreground">
              All crystals, rudraksha seeds, and gemstones sold on Vastu Adda are 100% natural and
              unheated. Because nature forms each crystal over millennia, natural variations in color
              saturation, raw mineral veining, and organic shape are normal characteristics of genuine
              earth stones and confirm authenticity.
            </p>
          </div>

          <div className="border-t border-border pt-6">
            <h2 className="font-display text-2xl font-bold text-forest">
              3. Spiritual &amp; Astrological Disclaimer
            </h2>
            <p className="mt-2 text-muted-foreground">
              Vastu Shastra and crystal healing are time-honored spiritual traditions based on ancient
              Vedic texts. While thousands of devotees experience profound benefits, metaphysical
              products are intended for spiritual well-being, mindfulness, and personal intention setting.
              They are not intended to diagnose, treat, or replace professional medical, legal, or
              financial counsel.
            </p>
          </div>

          <div className="border-t border-border pt-6">
            <h2 className="font-display text-2xl font-bold text-forest">
              4. Pricing, Taxes &amp; Currency
            </h2>
            <p className="mt-2 text-muted-foreground">
              All prices are listed in Indian Rupees (INR) and are inclusive of Goods and Services Tax
              (GST). We reserve the right to revise promotional discounts without prior notice.
            </p>
          </div>

          <div className="border-t border-border pt-6">
            <h2 className="font-display text-2xl font-bold text-forest">
              5. Governing Law &amp; Jurisdiction
            </h2>
            <p className="mt-2 text-muted-foreground">
              These terms are governed by and construed in accordance with the laws of India. Any
              disputes shall be subject to the exclusive jurisdiction of the competent courts in
              Rajkot, Gujarat, India.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
