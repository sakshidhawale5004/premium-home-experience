import { createFileRoute } from "@tanstack/react-router";
import { STORE } from "@/data/products";

export const Route = createFileRoute("/shipping-policy")({
  head: () => ({
    meta: [
      {
        title: "Shipping & Delivery Policy | Pan-India Free Delivery | Vastu Adda",
      },
      {
        name: "description",
        content:
          "Read our Pan-India Shipping Policy. Free express courier delivery in 3-5 business days with Cash on Delivery (COD) across all pincodes.",
      },
    ],
  }),
  component: ShippingPolicyPage,
});

function ShippingPolicyPage() {
  return (
    <div className="bg-background">
      <section className="bg-secondary/60 py-14 md:py-18 border-b border-border">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="eyebrow text-gold-deep">Order Delivery</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold text-forest">
            Shipping &amp; Delivery Policy
          </h1>
          <div className="gold-line mx-auto mt-4 w-28" />
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Fast, secure and fully insured Pan-India express delivery directly to your doorstep.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 text-sm leading-relaxed text-foreground/85">
        <div className="rounded-2xl border border-gold/40 bg-card p-6 md:p-8 shadow-sm space-y-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-forest">
              100% Free Express Shipping Across India
            </h2>
            <p className="mt-3 text-muted-foreground">
              We provide <strong>FREE express delivery on all orders</strong> across all serviceable
              pincodes throughout India. There are zero hidden handling or delivery surcharges at
              checkout.
            </p>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="font-display text-xl font-semibold text-forest">
              Order Processing &amp; Energization Timelines
            </h3>
            <p className="mt-2 text-muted-foreground">
              Each crystal product undergoes sacred purification and Vedic energization prior to
              packaging.
            </p>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li>
                <strong>Consecration &amp; Packing:</strong> 24 to 48 business hours from the moment your order is confirmed.
              </li>
              <li>
                <strong>Dispatch:</strong> Same day or next working morning via premium air and surface courier channels.
              </li>
            </ul>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="font-display text-xl font-semibold text-forest">
              Estimated Delivery Times by Region
            </h3>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-border bg-secondary/40 p-3.5">
                <p className="font-bold text-forest">Metro Cities</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Delhi, Mumbai, Bengaluru, Pune, Hyderabad, Chennai, Kolkata
                </p>
                <p className="text-sm font-semibold text-gold-deep mt-2">2 to 3 Business Days</p>
              </div>
              <div className="rounded-xl border border-border bg-secondary/40 p-3.5">
                <p className="font-bold text-forest">Tier 2 &amp; Tier 3 Cities</p>
                <p className="text-xs text-muted-foreground mt-1">
                  State capitals, major commercial districts &amp; towns
                </p>
                <p className="text-sm font-semibold text-gold-deep mt-2">3 to 5 Business Days</p>
              </div>
              <div className="rounded-xl border border-border bg-secondary/40 p-3.5">
                <p className="font-bold text-forest">Remote &amp; North East</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Rural regions, J&amp;K, Himachal, Island territories
                </p>
                <p className="text-sm font-semibold text-gold-deep mt-2">5 to 7 Business Days</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="font-display text-xl font-semibold text-forest">
              Trusted Courier Partners
            </h3>
            <p className="mt-2 text-muted-foreground">
              We exclusively partner with India's most dependable logistics networks:{" "}
              <strong>Bluedart, Delhivery, Expressbees, DTDC, and India Post Speed Post</strong>. Every parcel includes real-time SMS and WhatsApp tracking alerts.
            </p>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="font-display text-xl font-semibold text-forest">
              Cash on Delivery (COD) Terms
            </h3>
            <p className="mt-2 text-muted-foreground">
              Cash on Delivery is available for all pin codes. Our courier agent will verify your
              presence via phone call prior to attempting doorstep delivery. Please ensure exact cash or
              UPI payment is ready at delivery.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
