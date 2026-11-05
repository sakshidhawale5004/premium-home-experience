import { Link } from "@tanstack/react-router";
import { categoryLinks, STORE } from "@/data/products";
import logo from "@/assets/logo.png.asset.json";

export function Footer() {
  return (
    <footer className="bg-forest text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src={logo.url} alt="Vastu Adda" className="h-12 w-auto" width={144} height={36} />
            <p className="mt-4 text-sm leading-relaxed opacity-80">
              Thoughtfully selected Vastu products, crystals and remedies to invite balance,
              positivity and prosperity into your home and workplace.
            </p>
            <a
              href={STORE.whatsapp}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/60 px-5 py-2.5 text-sm font-medium text-gold transition-colors hover:bg-gold hover:text-forest"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.5 14.1c-.2.7-1.3 1.3-1.9 1.3-.5 0-1.1.1-3.4-.9-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.6-1.1-3s.7-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .7.5s.9 2.1 1 2.2c0 .1.1.3 0 .5-.4.8-.9.9-.6 1.4.5.9 1.2 1.7 2 2.3.9.7 1.3.8 1.6.6.2-.1.7-.9 1-1.2.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .8-.1 1.1Z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          <div>
            <p className="eyebrow text-gold">Quick Links</p>
            <ul className="mt-5 space-y-3 text-sm opacity-90">
              <li>
                <Link to="/" className="transition-colors hover:text-gold">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/collections" className="transition-colors hover:text-gold">
                  Shop All Collections
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition-colors hover:text-gold">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="transition-colors hover:text-gold">
                  Vastu Insights & Blogs
                </Link>
              </li>
              <li>
                <Link to="/refund-return-policy" className="transition-colors hover:text-gold">
                  Refund & Return Policy
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="transition-colors hover:text-gold">
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-gold">Shop by Category</p>
            <ul className="mt-5 space-y-3 text-sm opacity-90">
              {categoryLinks.map((c) => (
                <li key={c.category}>
                  <Link to={c.href} className="transition-colors hover:text-gold">
                    {c.category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-gold">Contact & Policies</p>
            <ul className="mt-5 space-y-4 text-sm opacity-90">
              <li className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-gold" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
                </svg>
                <a href={`tel:${STORE.phone.replace(/\s/g, "")}`}>{STORE.phone}</a>
              </li>
              <li className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-gold" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                <span>Reach us anytime on WhatsApp — we reply within a few hours.</span>
              </li>
              <li>
                <Link to="/privacy-policy" className="transition-colors hover:text-gold">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="transition-colors hover:text-gold">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-5 text-center text-xs tracking-[0.18em] uppercase opacity-70">
          © 2026 Vastu Adda · All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
