import { createFileRoute, Link } from "@tanstack/react-router";
import { STORE } from "@/data/products";

export const Route = createFileRoute("/refund-return-policy")({
  head: () => ({
    meta: [
      {
        title: "Refund & Return Policy | 7 Days Guarantee | Vastu Adda",
      },
      {
        name: "description",
        content:
          "Read our customer-first 7 Days Easy Return, Replacement, and Refund Policy. Hassle-free support for all authentic crystals and Vastu remedies.",
      },
    ],
  }),
  component: RefundReturnPolicyPage,
});

function RefundReturnPolicyPage() {
  return (
    <div className="bg-background">
      {/* Header */}
      <section className="bg-secondary/60 py-14 md:py-18 border-b border-border">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="eyebrow text-gold-deep">Customer Assurance</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold text-forest">
            Refund &amp; Return Policy
          </h1>
          <div className="gold-line mx-auto mt-4 w-28" />
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Your spiritual satisfaction and trust mean everything to us. We offer a 100% transparent
            7-day return and replacement guarantee on all orders.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 text-sm leading-relaxed text-foreground/85">
        <div className="rounded-2xl border border-gold/40 bg-card p-6 md:p-8 shadow-sm space-y-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-forest">
              7 Days Easy Return &amp; Replacement Window
            </h2>
            <p className="mt-3 text-muted-foreground">
              We take tremendous care in packing and consecrating each crystal piece. However, if your
              order arrives damaged, broken during transit, or fails to match the specifications
              described on our store, you are eligible for an immediate, hassle-free replacement or full
              refund within <strong>7 calendar days</strong> from the date of confirmed delivery.
            </p>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="font-display text-xl font-semibold text-forest">
              Eligibility for Returns &amp; Exchanges
            </h3>
            <ul className="mt-3 space-y-2.5 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-forest mt-0.5">✓</span>
                <span>The product must be in its original condition without intentional physical alteration or breakage.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-forest mt-0.5">✓</span>
                <span>The item must be accompanied by the original brand box, Selenite plate, and certificate of energization.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-forest mt-0.5">✓</span>
                <span>Natural mineral inclusions, internal crystal veining, and organic bead variations are hallmarks of authentic earth minerals and not defects.</span>
              </li>
            </ul>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="font-display text-xl font-semibold text-forest">
              How to Initiate a Return or Replacement
            </h3>
            <ol className="mt-3 space-y-3 list-decimal list-inside text-muted-foreground">
              <li>
                <strong>Contact our WhatsApp Support:</strong> Send a message to{" "}
                <a href={STORE.whatsapp} className="text-forest font-semibold underline">
                  {STORE.phone}
                </a>{" "}
                or email <strong>{STORE.email}</strong> with your Order ID.
              </li>
              <li>
                <strong>Provide Visual Proof:</strong> In case of transit damage, share 2-3 clear photographs or an unboxing video showing the damaged package and item.
              </li>
              <li>
                <strong>Pickup / Return Dispatch:</strong> Our logistics partner will arrange a doorstep reverse pickup from your address within 24-48 business hours at zero extra cost to you.
              </li>
              <li>
                <strong>Instant Refund / Replacement Dispatch:</strong> Once received or verified, your replacement is dispatched immediately, or the full refund amount is credited to your bank account / UPI within 2-4 business days.
              </li>
            </ol>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="font-display text-xl font-semibold text-forest">
              Refund Processing Timelines
            </h3>
            <p className="mt-2 text-muted-foreground">
              - <strong>Prepaid Orders (UPI / Cards / Net Banking):</strong> Refund credited directly back to the original source account within 3-5 working days.<br />
              - <strong>Cash on Delivery (COD) Orders:</strong> Refund credited directly to your preferred Bank Account or UPI ID (Google Pay / PhonePe / Paytm) provided via WhatsApp.
            </p>
          </div>

          <div className="border-t border-border pt-6 rounded-xl bg-secondary/50 p-4">
            <p className="font-semibold text-forest">Need Instant Assistance?</p>
            <p className="text-xs text-muted-foreground mt-1">
              Our customer care team is available daily from 9:30 AM to 8:00 PM IST on WhatsApp.
            </p>
            <a
              href={STORE.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-forest px-5 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-forest/90"
            >
              <span>Chat with Return Desk on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
