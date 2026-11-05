import { Link } from "@tanstack/react-router";
import { categoryLinks, STORE } from "@/data/products";

export function Footer() {
  return (
    <footer className="bg-forest text-primary-foreground border-t border-gold/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Brand & Bio */}
          <div>
            <Link to="/" className="inline-block">
              <img src="/logo.svg" alt="Vastu Adda" className="h-12 w-auto brightness-110" width={220} height={44} />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/80">
              Thoughtfully curated Vedic Vastu remedies, authentic energized crystals, sacred
              pyramids and rudraksha malas designed to bring sustained peace, protection, and
              boundless prosperity to modern homes.
            </p>
            <div className="mt-6 flex flex-col gap-2.5 text-xs text-gold-soft">
              <p className="flex items-center gap-2">
                <span>📍</span>
                <span>{STORE.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <span>📞</span>
                <a href={`tel:${STORE.phone.replace(/\s/g, "")}`} className="hover:text-gold transition-colors">
                  {STORE.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span>✉️</span>
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
              <span>Chat with Astrologer</span>
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
                  <Link to={c.href} className="transition-colors hover:text-gold">
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
                <Link to="/refund-return-policy" className="inline-flex items-center gap-1.5 transition-colors hover:text-gold">
                  <span>🔄</span>
                  <span>7 Days Return &amp; Refund Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="inline-flex items-center gap-1.5 transition-colors hover:text-gold">
                  <span>🚚</span>
                  <span>Shipping &amp; Delivery Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="inline-flex items-center gap-1.5 transition-colors hover:text-gold">
                  <span>🔒</span>
                  <span>Privacy &amp; Data Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="inline-flex items-center gap-1.5 transition-colors hover:text-gold">
                  <span>📜</span>
                  <span>Terms &amp; Conditions</span>
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

        {/* Bottom copyright & payment methods */}
        <div className="mt-14 border-t border-gold/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/70">
          <p>© {new Date().getFullYear()} Vastu Adda. All Rights Reserved. Crafted for Spiritual Homes.</p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded bg-background/20 px-2 py-1">UPI</span>
            <span className="rounded bg-background/20 px-2 py-1">Cash on Delivery</span>
            <span className="rounded bg-background/20 px-2 py-1">Visa / Mastercard</span>
            <span className="rounded bg-background/20 px-2 py-1">Net Banking</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
