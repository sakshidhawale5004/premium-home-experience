import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { categoryLinks, STORE } from "@/data/products";

function LotusMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M24 4c2.8 3.6 4.2 7.4 4.2 11.4S26.8 23.4 24 27.2c-2.8-3.8-4.2-7.8-4.2-11.8S21.2 7.6 24 4Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M24 27.2c-4.8.8-9-.4-12.6-3.4-2.4-2-4-4.4-4.8-7.2 4.8-.8 9 .4 12.6 3.4 2.4 2 4 4.4 4.8 7.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M24 27.2c4.8.8 9-.4 12.6-3.4 2.4-2 4-4.4 4.8-7.2-4.8-.8-9 .4-12.6 3.4-2.4 2-4 4.4-4.8 7.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

const navLink =
  "text-[0.95rem] tracking-wide text-foreground/85 transition-colors hover:text-gold-deep";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-forest text-primary-foreground">
        <p className="mx-auto max-w-7xl px-4 py-2 text-center text-[0.72rem] tracking-[0.22em] uppercase opacity-90">
          Welcome to Vastu Adda — Vastu Products · Expert Guidance · Harmonious Spaces
        </p>
      </div>
      <div
        className={`border-b border-border bg-background/90 backdrop-blur-md transition-shadow ${
          scrolled ? "shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)]" : ""
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5">
          <Link to="/" className="flex items-center gap-3 text-forest">
            <LotusMark className="h-8 w-12 text-gold-deep" />
            <span className="leading-none">
              <span className="font-display text-[1.65rem] font-semibold tracking-[0.14em] uppercase">
                Vastu Adda
              </span>
              <span className="mt-1 block text-[0.6rem] tracking-[0.3em] uppercase text-muted-foreground">
                Vedic Remedies · Crystals · Guidance
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <Link to="/" className={navLink}>
              Home
            </Link>
            <div className="group relative">
              <a
                href={STORE.site}
                className={`${navLink} inline-flex items-center gap-1.5`}
                aria-haspopup="true"
              >
                Shop
                <svg viewBox="0 0 12 8" className="h-2 w-3 fill-current" aria-hidden="true">
                  <path d="M6 8 0 0h12L6 8Z" />
                </svg>
              </a>
              <div className="invisible absolute left-1/2 top-full z-10 w-60 -translate-x-1/2 pt-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                <div className="rounded-xl border border-gold/40 bg-card p-2 shadow-xl">
                  {categoryLinks.map((c) => (
                    <a
                      key={c.category}
                      href={c.href}
                      className="block rounded-lg px-3 py-2.5 text-sm text-foreground/85 transition-colors hover:bg-secondary hover:text-gold-deep"
                    >
                      {c.category}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <a href={STORE.whatsapp} className={navLink}>
              Consultation
            </a>
            <Link to="/blogs" className={navLink}>
              Blogs
            </Link>
            <Link to="/about" className={navLink}>
              About Us
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={STORE.cart}
              className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-forest/90 sm:inline-flex"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <circle cx="9" cy="20" r="1.4" />
                <circle cx="17" cy="20" r="1.4" />
                <path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.3h7.9a1.5 1.5 0 0 0 1.5-1.2L20 8H6" />
              </svg>
              Cart
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
              aria-label="Toggle menu"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                {open ? <path d="M5 5l14 14M19 5 5 19" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-border bg-background px-4 py-4 lg:hidden">
            <div className="flex flex-col gap-1">
              <Link to="/" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 hover:bg-secondary">
                Home
              </Link>
              <Link to="/blogs" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 hover:bg-secondary">
                Blogs
              </Link>
              <Link to="/about" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 hover:bg-secondary">
                About Us
              </Link>
              <a href={STORE.whatsapp} className="rounded-lg px-3 py-2.5 hover:bg-secondary">
                Book a Consultation
              </a>
              <p className="eyebrow px-3 pt-3 text-muted-foreground">Shop Categories</p>
              {categoryLinks.map((c) => (
                <a key={c.category} href={c.href} className="rounded-lg px-3 py-2.5 text-sm hover:bg-secondary">
                  {c.category}
                </a>
              ))}
              <a href={STORE.cart} className="rounded-lg px-3 py-2.5 text-sm hover:bg-secondary">
                Cart & Checkout
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
