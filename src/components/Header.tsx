import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { categoryLinks, STORE } from "@/data/products";
import { useShop } from "@/lib/shop";
import logo from "@/assets/logo.png.asset.json";

const navLink =
  "text-[0.95rem] tracking-wide text-foreground/85 transition-colors hover:text-gold-deep";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count, setCartOpen, setSearchOpen } = useShop();

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
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo.url} alt="Vastu Adda" className="h-10 w-auto md:h-11" width={160} height={40} />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <Link to="/" className={navLink}>
              Home
            </Link>
            <div className="group relative">
              <Link
                to="/collections"
                className={`${navLink} inline-flex items-center gap-1.5`}
                aria-haspopup="true"
              >
                Shop
                <svg viewBox="0 0 12 8" className="h-2 w-3 fill-current" aria-hidden="true">
                  <path d="M6 8 0 0h12L6 8Z" />
                </svg>
              </Link>
              <div className="invisible absolute left-1/2 top-full z-10 w-60 -translate-x-1/2 pt-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                <div className="rounded-xl border border-gold/40 bg-card p-2 shadow-xl">
                  {categoryLinks.map((c) => (
                    <Link
                      key={c.category}
                      to={c.href}
                      className="block rounded-lg px-3 py-2.5 text-sm text-foreground/85 transition-colors hover:bg-secondary hover:text-gold-deep"
                    >
                      {c.category}
                    </Link>
                  ))}
                  <Link
                    to="/collections"
                    className="mt-1 block rounded-lg border-t border-border px-3 pt-3 text-sm font-medium text-gold-deep"
                  >
                    View All Collections →
                  </Link>
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
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-gold hover:text-gold-deep"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Open cart, ${count} items`}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-gold hover:text-gold-deep"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <circle cx="9" cy="20" r="1.4" />
                <circle cx="17" cy="20" r="1.4" />
                <path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.3h7.9a1.5 1.5 0 0 0 1.5-1.2L20 8H6" />
              </svg>
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-forest px-1 text-[0.65rem] font-semibold text-primary-foreground">
                  {count}
                </span>
              )}
            </button>
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
              <Link to="/collections" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 hover:bg-secondary">
                Shop All Collections
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
                <Link key={c.category} to={c.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm hover:bg-secondary">
                  {c.category}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setCartOpen(true);
                }}
                className="rounded-lg px-3 py-2.5 text-left text-sm hover:bg-secondary"
              >
                My Cart{count > 0 ? ` (${count})` : ""}
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
