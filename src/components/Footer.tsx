import { Link } from "@tanstack/react-router";
import { categoryLinks, STORE } from "@/data/products";

export function Footer() {
  return (
    <footer className="bg-forest text-primary-foreground border-t border-gold/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Brand & Bio */}
          <div>
            <Link to="/" className="inline-block py-1">
              <img
                src="/cropped-VastuAdda-Golden-House-Logo-300x75.png"
                alt="Vastu Adda"
                className="h-12 w-auto brightness-110 object-contain"
                width={300}
                height={75}
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/80">
              Thoughtfully curated Vedic Vastu remedies, authentic energized crystals, sacred
              pyramids and rudraksha malas designed to bring sustained peace, protection, and
              boundless prosperity to modern homes.
            </p>
            <div className="mt-6 flex flex-col gap-2.5 text-xs text-gold-soft">
              <p>
                <span>{STORE.address}</span>
              </p>
              <p>
                <a href={`tel:${STORE.phone.replace(/\s/g, "")}`} className="hover:text-gold transition-colors">
                  {STORE.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${STORE.email}`} className="hover:text-gold transition-colors">
                  {STORE.email}
                </a>
              </p>
            </div>
            <a
              href={STORE.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/70 px-5 py-2.5 text-xs font-semibold tracking-wider text-gold uppercase transition-all hover:bg-gold hover:text-forest"
            >
              <span>Order Support on WhatsApp</span>
            </a>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <p className="eyebrow text-gold">Explore Store</p>
            <ul className="mt-5 space-y-3 text-sm text-primary-foreground/85">
              <li>
                <Link to="/" className="transition-colors hover:text-gold">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/collections" className="transition-colors hover:text-gold">
                  Shop All 21 Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition-colors hover:text-gold">
                  About Our Vedic Sourcing
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="transition-colors hover:text-gold">
                  Vastu Insights &amp; Articles
                </Link>
              </li>
              <li>
                <a href={STORE.whatsapp} target="_blank" rel="noreferrer" className="transition-colors hover:text-gold">
                  Order Tracking on WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div>
            <p className="eyebrow text-gold">Shop by Category</p>
            <ul className="mt-5 space-y-3 text-sm text-primary-foreground/85">
              {categoryLinks.map((c) => (
                <li key={c.category}>
                  <Link
                    to="/collections/$slug"
                    params={{ slug: c.slug }}
                    className="transition-colors hover:text-gold"
                  >
                    {c.category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Trust & Policies */}
          <div>
            <p className="eyebrow text-gold">Customer Protection</p>
            <ul className="mt-5 space-y-3 text-sm text-primary-foreground/85">
              <li>
                <Link to="/refund-return-policy" className="transition-colors hover:text-gold">
                  7 Days Return &amp; Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="transition-colors hover:text-gold">
                  Shipping &amp; Delivery Policy
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="transition-colors hover:text-gold">
                  Privacy &amp; Data Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="transition-colors hover:text-gold">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>

            <div className="mt-6 rounded-2xl border border-gold/30 bg-background/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                100% Satisfaction Guarantee
              </p>
              <p className="mt-1 text-xs leading-relaxed text-primary-foreground/75">
                Every stone is laboratory-certified and pre-energized through Vedic rituals prior to dispatch.
              </p>
            </div>
          </div>
        </div>

        {/* Payment Methods Badges (Above Divider Line) */}
        <div className="mt-12 flex flex-wrap items-center gap-2.5">
          <span className="rounded-full bg-background/20 px-3.5 py-1.5 text-xs font-medium border border-gold/25 text-primary-foreground/90">
            UPI Accepted
          </span>
          <span className="rounded-full bg-background/20 px-3.5 py-1.5 text-xs font-medium border border-gold/25 text-primary-foreground/90">
            Cash on Delivery (COD)
          </span>
          <span className="rounded-full bg-background/20 px-3.5 py-1.5 text-xs font-medium border border-gold/25 text-primary-foreground/90">
            Visa / Mastercard / RuPay
          </span>
          <span className="rounded-full bg-background/20 px-3.5 py-1.5 text-xs font-medium border border-gold/25 text-primary-foreground/90">
            Net Banking
          </span>
        </div>

        {/* Divider line & Left-aligned copyright */}
        <div className="mt-8 border-t border-gold/20 pt-6 flex flex-col text-left gap-1.5 text-xs text-primary-foreground/70">
          <p>© {new Date().getFullYear()} Vastu Adda. All Rights Reserved.</p>
          <p className="text-gold-soft font-medium">Design by Digital Coyotes</p>
        </div>
      </div>
    </footer>
  );
}
