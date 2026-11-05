import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useShop, inr } from "@/lib/shop";
import { products } from "@/data/products";

const POPULAR = [
  "pyrite-tree",
  "money-magnet-pyramid",
  "karungali-rudraksh-combo-bracelets",
  "pyrite-tortoise",
];

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useShop();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!searchOpen) return;
    setQuery("");
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [searchOpen, setSearchOpen]);

  if (!searchOpen) return null;

  const q = query.trim().toLowerCase();
  const results = q
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.blurb.toLowerCase().includes(q),
      )
    : [];
  const popular = POPULAR.map((s) => products.find((p) => p.slug === s)).filter(
    (p): p is NonNullable<typeof p> => !!p,
  );

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label="Search products">
      <button
        type="button"
        aria-label="Close search"
        onClick={() => setSearchOpen(false)}
        className="absolute inset-0 h-full w-full cursor-default bg-forest/50 backdrop-blur-sm"
      />
      <div className="relative mx-auto mt-[8vh] w-[92%] max-w-2xl overflow-hidden rounded-2xl border border-gold/30 bg-background shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-gold-deep" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pyrite, mala, bracelet, pyramid…"
            className="w-full bg-transparent text-[0.95rem] text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            aria-label="Close search"
            className="shrink-0 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M5 5l14 14M19 5 5 19" />
            </svg>
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-3">
          {q && results.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              No products found for “{query}”. Try “pyrite”, “mala” or “bracelet”.
            </p>
          )}

          {!q && (
            <div>
              <p className="eyebrow px-3 pb-2 pt-1 text-gold-deep">Popular Right Now</p>
              {popular.map((p) => (
                <SearchRow key={p.slug} slug={p.slug} name={p.name} image={p.image} price={p.price} onClose={() => setSearchOpen(false)} />
              ))}
            </div>
          )}

          {q &&
            results.map((p) => (
              <SearchRow
                key={p.slug}
                slug={p.slug}
                name={p.name}
                image={p.image}
                price={p.price}
                category={p.category}
                onClose={() => setSearchOpen(false)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

function SearchRow({
  slug,
  name,
  image,
  price,
  category,
  onClose,
}: {
  slug: string;
  name: string;
  image: string;
  price: number;
  category?: string;
  onClose: () => void;
}) {
  return (
    <Link
      to="/products/$slug"
      params={{ slug }}
      onClick={onClose}
      className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-secondary"
    >
      <img src={image} alt="" className="h-12 w-12 shrink-0 rounded-lg bg-secondary object-cover" width={48} height={48} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[0.9rem] font-medium text-foreground">{name}</span>
        {category && <span className="block text-[0.72rem] text-muted-foreground">{category}</span>}
      </span>
      <span className="font-display text-base font-semibold text-forest">{inr(price)}</span>
      <span aria-hidden="true" className="text-gold-deep">→</span>
    </Link>
  );
}
