import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useShop, inr, whatsappOrderUrl } from "@/lib/shop";
import { products } from "@/data/products";

const ALSO_LIKE_SLUGS = [
  "pyrite-tortoise",
  "rudraksh-with-clear-quartz",
  "richi-rich-bracelets",
  "money-magnet-pyramid",
];

export function CartDrawer() {
  const { lines, count, subtotal, setQty, remove, add, cartOpen, setCartOpen, productFor } = useShop();

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCartOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [cartOpen, setCartOpen]);

  if (!cartOpen) return null;

  const suggestions = ALSO_LIKE_SLUGS.map((s) => products.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => !!p && !lines.some((l) => l.slug === p.slug))
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <button
        type="button"
        aria-label="Close cart"
        onClick={() => setCartOpen(false)}
        className="absolute inset-0 h-full w-full cursor-default bg-forest/50 backdrop-blur-sm"
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display text-2xl font-semibold text-forest">My Cart ({count})</h2>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M5 5l14 14M19 5 5 19" />
            </svg>
          </button>
        </div>

        {/* Lines */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-forest">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <circle cx="9" cy="20" r="1.4" />
                  <circle cx="17" cy="20" r="1.4" />
                  <path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.3h7.9a1.5 1.5 0 0 0 1.5-1.2L20 8H6" />
                </svg>
              </span>
              <p className="font-display text-xl font-semibold text-forest">Your cart is empty</p>
              <p className="max-w-[16rem] text-sm text-muted-foreground">
                Add a remedy for wealth, protection or peace — your space will thank you.
              </p>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="rounded-full bg-forest px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-forest/90"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {lines.map((line) => {
                const p = productFor(line.slug);
                if (!p) return null;
                return (
                  <div key={line.slug} className="rounded-2xl border border-border bg-card p-3 shadow-sm">
                    <div className="flex gap-3">
                      <Link
                        to="/products/$slug"
                        params={{ slug: p.slug }}
                        onClick={() => setCartOpen(false)}
                        className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-secondary"
                      >
                        <img src={p.image} alt={p.name} className="h-full w-full object-cover" width={64} height={64} />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            to="/products/$slug"
                            params={{ slug: p.slug }}
                            onClick={() => setCartOpen(false)}
                            className="line-clamp-2 text-[0.82rem] font-semibold leading-snug text-foreground"
                          >
                            {p.name}
                          </Link>
                          <button
                            type="button"
                            onClick={() => remove(line.slug)}
                            aria-label={`Remove ${p.name} from cart`}
                            className="shrink-0 rounded-full p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                          >
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                              <path d="M5 5l14 14M19 5 5 19" />
                            </svg>
                          </button>
                        </div>
                        {p.mrp && p.mrp > p.price && (
                          <span className="mt-1 inline-block rounded-full bg-secondary px-2 py-0.5 text-[0.6rem] font-semibold text-forest">
                            {Math.round(((p.mrp - p.price) / p.mrp) * 100)}% OFF
                          </span>
                        )}
                        <div className="mt-2 flex items-center justify-between">
                          <div className="inline-flex items-center rounded-lg border border-border bg-background">
                            <button
                              type="button"
                              onClick={() => setQty(line.slug, line.qty - 1)}
                              aria-label="Decrease quantity"
                              className="px-2.5 py-1 text-foreground/70 transition-colors hover:text-forest"
                            >
                              −
                            </button>
                            <span className="min-w-[1.75rem] text-center text-sm font-medium">{line.qty}</span>
                            <button
                              type="button"
                              onClick={() => setQty(line.slug, line.qty + 1)}
                              aria-label="Increase quantity"
                              className="px-2.5 py-1 text-foreground/70 transition-colors hover:text-forest"
                            >
                              +
                            </button>
                          </div>
                          <p className="font-display text-lg font-semibold text-forest">{inr(p.price * line.qty)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* You may also like */}
              {suggestions.length > 0 && (
                <div className="rounded-2xl border border-gold/40 bg-secondary/50 p-4">
                  <p className="eyebrow text-gold-deep">You May Also Like</p>
                  <p className="mt-1 text-[0.78rem] text-muted-foreground">
                    Add more from these picks — popular with other customers.
                  </p>
                  <div className="mt-3 space-y-2">
                    {suggestions.map((p) => (
                      <div key={p.slug} className="flex items-center gap-3 rounded-xl border border-border bg-card p-2.5">
                        <img src={p.image} alt={p.name} className="h-11 w-11 shrink-0 rounded-lg object-cover" width={44} height={44} />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[0.8rem] font-medium text-foreground">{p.name}</p>
                          <p className="text-[0.78rem] font-semibold text-forest">{inr(p.price)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => add(p.slug)}
                          className="shrink-0 rounded-lg bg-forest px-3.5 py-1.5 text-[0.72rem] font-semibold text-primary-foreground transition-colors hover:bg-forest/90"
                        >
                          + Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {lines.length > 0 && (
          <div className="border-t border-border bg-card px-5 py-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Subtotal</p>
              <p className="font-display text-2xl font-semibold text-forest">{inr(subtotal)}</p>
            </div>
            <p className="mt-0.5 text-[0.72rem] text-muted-foreground">
              Taxes included · Delivery confirmed on WhatsApp before dispatch.
            </p>
            <a
              href={whatsappOrderUrl(lines, productFor)}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-forest px-4 py-3.5 text-[0.85rem] font-semibold tracking-[0.08em] text-primary-foreground transition-colors hover:bg-forest/90"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.5 14.1c-.2.7-1.3 1.3-1.9 1.3-.5 0-1.1.1-3.4-.9-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.6-1.1-3s.7-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .7.5s.9 2.1 1 2.2c0 .1.1.3 0 .5-.4.8-.9.9-.6 1.4.5.9 1.2 1.7 2 2.3.9.7 1.3.8 1.6.6.2-.1.7-.9 1-1.2.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .8-.1 1.1Z" />
              </svg>
              PLACE ORDER ON WHATSAPP
            </a>
            <button
              type="button"
              onClick={() => setCartOpen(false)}
              className="mt-2 w-full rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
