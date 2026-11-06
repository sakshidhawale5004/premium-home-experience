import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { categoryLinks, STORE } from "@/data/products";
import { useShop } from "@/lib/shop";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [headerSearchQuery, setHeaderSearchQuery] = useState("");
  const { count, setCartOpen, setSearchOpen } = useShop();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(true);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-shadow">
      {/* Top Announcement Bar - Seamless single-line layout */}
      <div className="bg-forest px-4 py-2 text-primary-foreground border-b border-gold/20 shadow-sm overflow-hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-[0.7rem] sm:text-[0.72rem] tracking-[0.14em] uppercase gap-4">
          <p className="hidden xl:flex items-center gap-1.5 opacity-90 whitespace-nowrap">
            <span>100% Certified Gemstones · Vedic Energized</span>
          </p>

          <p className="mx-auto xl:mx-0 text-center font-medium text-gold-soft whitespace-nowrap truncate max-w-full">
            Special Offer: Free Raw Selenite Plate with Every Order &nbsp;|&nbsp; Free Pan-India Delivery
          </p>

          <a
            href={STORE.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-1.5 text-gold hover:text-primary-foreground transition-colors whitespace-nowrap shrink-0"
          >
            <span>Free Astrologer Help: {STORE.phone}</span>
          </a>
        </div>
      </div>

      {/* Main Header Row */}
      <div
        className={`border-b border-border bg-background/95 backdrop-blur-md transition-all duration-300 ${
          scrolled ? "py-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)]" : "py-3"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          {/* Logo with official cropped-VastuAdda-Golden-House-Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 py-0.5">
            <img
              src="/cropped-VastuAdda-Golden-House-Logo-300x75.png"
              alt="Vastu Adda"
              className="h-10 md:h-12 w-auto object-contain transition-transform hover:scale-[1.02]"
              width={300}
              height={75}
            />
          </Link>

          {/* Prominent Header Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-lg mx-6">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search crystal trees, bracelets, pyramids, malas..."
                value={headerSearchQuery}
                onChange={(e) => setHeaderSearchQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                className="w-full rounded-full border border-gold/40 bg-card py-2.5 pl-5 pr-28 text-sm text-foreground placeholder:text-muted-foreground/75 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25 shadow-sm transition-all"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 flex items-center gap-1.5 rounded-full bg-forest px-4 text-xs font-semibold tracking-wider text-primary-foreground transition-all hover:bg-forest/90 active:scale-95"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <span>SEARCH</span>
              </button>
            </form>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Mobile Search Icon */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-gold hover:text-gold-deep"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>

            {/* WhatsApp Support pill (Desktop) */}
            <a
              href={STORE.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="hidden xl:inline-flex items-center gap-2 rounded-full border border-forest/20 bg-secondary/80 px-4 py-2 text-xs font-medium text-forest transition-colors hover:border-gold hover:text-gold-deep"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-forest" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.5 14.1c-.2.7-1.3 1.3-1.9 1.3-.5 0-1.1.1-3.4-.9-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.6-1.1-3s.7-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .7.5s.9 2.1 1 2.2c0 .1.1.3 0 .5-.4.8-.9.9-.6 1.4.5.9 1.2 1.7 2 2.3.9.7 1.3.8 1.6.6.2-.1.7-.9 1-1.2.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .8-.1 1.1Z" />
              </svg>
              <span>WhatsApp Support</span>
            </a>

            {/* Cart Button */}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Open cart, ${count} items`}
              className="relative inline-flex h-10 items-center gap-2 rounded-full border border-border bg-card px-3.5 text-foreground transition-all hover:border-gold hover:text-gold-deep shadow-sm"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <circle cx="9" cy="20" r="1.4" />
                <circle cx="17" cy="20" r="1.4" />
                <path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.3h7.9a1.5 1.5 0 0 0 1.5-1.2L20 8H6" />
              </svg>
              <span className="hidden sm:inline text-xs font-semibold tracking-wide">CART</span>
              {count > 0 && (
                <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-forest px-1.5 text-[0.68rem] font-bold text-primary-foreground animate-pulse">
                  {count}
                </span>
              )}
            </button>

            {/* Mobile Drawer Trigger */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground lg:hidden"
              aria-label="Toggle navigation menu"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                {open ? <path d="M5 5l14 14M19 5 5 19" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links Row */}
        <nav className="hidden lg:flex items-center justify-center gap-8 border-t border-border/60 pt-2.5 mt-2">
          <Link to="/" className="text-[0.92rem] font-medium tracking-wide text-foreground/90 transition-colors hover:text-gold-deep">
            Home
          </Link>

          <Link to="/collections" className="text-[0.92rem] font-medium tracking-wide text-foreground/90 transition-colors hover:text-gold-deep">
            All Collections
          </Link>

          {/* Categories Dropdown */}
          <div className="group relative py-1">
            <span className="inline-flex cursor-pointer items-center gap-1.5 text-[0.92rem] font-medium tracking-wide text-foreground/90 transition-colors group-hover:text-gold-deep">
              Categories
              <svg viewBox="0 0 12 8" className="h-2 w-2.5 fill-current opacity-70 group-hover:opacity-100 transition-transform group-hover:rotate-180" aria-hidden="true">
                <path d="M6 8 0 0h12L6 8Z" />
              </svg>
            </span>
            <div className="invisible absolute left-1/2 top-full z-30 w-64 -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="rounded-2xl border border-gold/30 bg-card p-2.5 shadow-xl">
                {categoryLinks.map((c) => (
                  <Link
                    key={c.category}
                    to="/collections/$slug"
                    params={{ slug: c.slug }}
                    className="flex items-center rounded-xl px-3.5 py-2.5 text-sm font-medium text-foreground/85 transition-colors hover:bg-secondary hover:text-forest"
                  >
                    <span>{c.category}</span>
                  </Link>
                ))}
                <div className="my-1 border-t border-border" />
                <Link
                  to="/collections"
                  className="block rounded-xl px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-gold-deep hover:bg-secondary text-center"
                >
                  View All Products →
                </Link>
              </div>
            </div>
          </div>

          <Link to="/about" className="text-[0.92rem] font-medium tracking-wide text-foreground/90 transition-colors hover:text-gold-deep">
            About Us
          </Link>

          <Link to="/blogs" className="text-[0.92rem] font-medium tracking-wide text-foreground/90 transition-colors hover:text-gold-deep">
            Vastu Blogs
          </Link>

          <Link to="/contact" className="text-[0.92rem] font-medium tracking-wide text-foreground/90 transition-colors hover:text-gold-deep">
            Contact
          </Link>
        </nav>
      </div>

      {/* Mobile Menu Drawer */}
      {open && (
        <div className="border-b border-border bg-background px-4 py-5 shadow-2xl lg:hidden max-h-[85vh] overflow-y-auto">
          {/* Mobile Search input */}
          <form onSubmit={handleSearchSubmit} className="relative mb-4">
            <input
              type="text"
              placeholder="Search products..."
              value={headerSearchQuery}
              onChange={(e) => setHeaderSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-card py-2.5 pl-4 pr-10 text-sm text-foreground focus:border-gold focus:outline-none"
            />
            <button type="submit" className="absolute right-2.5 top-2.5 text-muted-foreground">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>
          </form>

          <nav className="flex flex-col gap-1.5 text-base">
            <Link to="/" onClick={() => setOpen(false)} className="rounded-xl px-3 py-2.5 hover:bg-secondary font-medium">
              Home
            </Link>
            <Link to="/collections" onClick={() => setOpen(false)} className="rounded-xl px-3 py-2.5 hover:bg-secondary font-medium">
              Shop All Collections
            </Link>
            <Link to="/about" onClick={() => setOpen(false)} className="rounded-xl px-3 py-2.5 hover:bg-secondary font-medium">
              About Our Heritage
            </Link>
            <Link to="/blogs" onClick={() => setOpen(false)} className="rounded-xl px-3 py-2.5 hover:bg-secondary font-medium">
              Vastu Insights &amp; Blogs
            </Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="rounded-xl px-3 py-2.5 hover:bg-secondary font-medium">
              Contact Atelier
            </Link>

            <div className="my-2 border-t border-border pt-2">
              <p className="px-3 pb-2 text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground">
                Shop By Category
              </p>
              {categoryLinks.map((c) => (
                <Link
                  key={c.category}
                  to="/collections/$slug"
                  params={{ slug: c.slug }}
                  onClick={() => setOpen(false)}
                  className="flex items-center rounded-xl px-3 py-2 text-sm text-foreground/80 hover:bg-secondary hover:text-forest"
                >
                  <span>{c.category}</span>
                </Link>
              ))}
            </div>

            <div className="my-2 border-t border-border pt-2">
              <p className="px-3 pb-2 text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground">
                Customer Care &amp; Policies
              </p>
              <Link to="/refund-return-policy" onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2 text-sm text-foreground/80 hover:bg-secondary">
                Refund &amp; Return Policy
              </Link>
              <Link to="/shipping-policy" onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2 text-sm text-foreground/80 hover:bg-secondary">
                Shipping Policy
              </Link>
              <Link to="/terms-and-conditions" onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2 text-sm text-foreground/80 hover:bg-secondary">
                Terms &amp; Conditions
              </Link>
              <Link to="/privacy-policy" onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2 text-sm text-foreground/80 hover:bg-secondary">
                Privacy Policy
              </Link>
            </div>

            <a
              href={STORE.whatsapp}
              onClick={() => setOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-forest py-3 text-sm font-semibold text-primary-foreground"
            >
              <span>WhatsApp Order Support</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
