import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useShop, inr, whatsappOrderUrl } from "@/lib/shop";
import { products } from "@/data/products";

const ALSO_LIKE_SLUGS = [
  "pyrite-tree",
  "dhan-yog-bracelets",
  "money-magnet-pyramid",
  "pyrite-tortoise",
  "citrine-tree",
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
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close cart"
        onClick={() => setCartOpen(false)}
        className="absolute inset-0 h-full w-full cursor-default bg-forest/60 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-2xl border-l border-gold/30">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-card px-5 py-4">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-2xl font-bold text-forest">Your Cart</h2>
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-forest">
              {count} {count === 1 ? "item" : "items"}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 5l14 14M19 5 5 19" />
            </svg>
          </button>
        </div>

        {/* Free Shipping & Gift Progress Bar */}
        <div className="bg-secondary/70 px-5 py-2.5 border-b border-border text-xs">
          <p className="font-medium text-forest flex items-center gap-1.5">
            <span>🎉</span>
            <span>You've unlocked <strong>FREE Express Pan-India Delivery</strong> &amp; <strong>Free Raw Selenite Plate</strong>!</span>
          </p>
          <div className="mt-1.5 h-1.5 w-full rounded-full bg-border overflow-hidden">
            <div className="h-full bg-gradient-to-r from-gold to-forest w-full" />
          </div>
        </div>

        {/* Lines Container */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center py-12">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-forest shadow-inner">
                <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <circle cx="9" cy="20" r="1.4" />
                  <circle cx="17" cy="20" r="1.4" />
                  <path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.3h7.9a1.5 1.5 0 0 0 1.5-1.2L20 8H6" />
                </svg>
              </span>
              <p className="font-display text-2xl font-semibold text-forest">Your cart is empty</p>
              <p className="max-w-[18rem] text-sm text-muted-foreground">
                Discover our certified crystal trees, bracelets and Vastu remedies to bring auspicious harmony to your home.
              </p>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="mt-2 rounded-full bg-forest px-8 py-3 text-xs font-semibold tracking-wider text-primary-foreground uppercase shadow transition-all hover:bg-forest/90"
              >
                Explore Bestsellers
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {lines.map((line) => {
                const p = productFor(line.slug);
                if (!p) return null;
                const lineDiscount = p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : null;

                return (
                  <div key={line.slug} className="rounded-2xl border border-border bg-card p-3.5 shadow-sm transition-all hover:border-gold/40">
                    <div className="flex gap-3">
                      <Link
                        to="/products/$slug"
                        params={{ slug: p.slug }}
                        onClick={() => setCartOpen(false)}
                        className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-secondary border border-border"
                      >
                        <img src={p.image} alt={p.name} className="h-full w-full object-cover" width={80} height={80} />
                      </Link>

                      <div className="min-w-0 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              to="/products/$slug"
                              params={{ slug: p.slug }}
                              onClick={() => setCartOpen(false)}
                              className="line-clamp-2 text-sm font-semibold text-foreground hover:text-gold-deep transition-colors"
                            >
                              {p.name}
                            </Link>
                            <button
                              type="button"
                              onClick={() => remove(line.slug)}
                              aria-label={`Remove ${p.name} from cart`}
                              className="shrink-0 p-1 text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              </svg>
                            </button>
                          </div>
                          <span className="inline-block mt-0.5 text-[0.68rem] text-gold-deep font-medium">
                            🎁 Free Selenite Plate Included
                          </span>
                        </div>

                        <div className="mt-2.5 flex items-center justify-between">
                          {/* Quantity control */}
                          <div className="inline-flex items-center rounded-lg border border-border bg-background">
                            <button
                              type="button"
                              onClick={() => setQty(line.slug, line.qty - 1)}
                              aria-label="Decrease quantity"
                              className="px-2.5 py-1 text-sm font-semibold text-foreground/70 hover:text-forest transition-colors"
                            >
                              −
                            </button>
                            <span className="min-w-[1.75rem] text-center text-xs font-bold">{line.qty}</span>
                            <button
                              type="button"
                              onClick={() => setQty(line.slug, line.qty + 1)}
                              aria-label="Increase quantity"
                              className="px-2.5 py-1 text-sm font-semibold text-foreground/70 hover:text-forest transition-colors"
                            >
                              +
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="font-display text-lg font-bold text-forest">{inr(p.price * line.qty)}</p>
                            {lineDiscount && (
                              <p className="text-[0.68rem] text-muted-foreground line-through">
                                {inr(p.mrp * line.qty)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Cross-Sell Recommendations */}
              {suggestions.length > 0 && (
                <div className="rounded-2xl border border-gold/30 bg-secondary/50 p-4 mt-6">
                  <p className="eyebrow text-gold-deep">Frequently Paired</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Customers often pair these remedies to maximize energy flow:
                  </p>
                  <div className="mt-3 space-y-2.5">
                    {suggestions.map((p) => (
                      <div key={p.slug} className="flex items-center gap-3 rounded-xl border border-border bg-card p-2.5 shadow-sm">
                        <img src={p.image} alt={p.name} className="h-12 w-12 shrink-0 rounded-lg object-cover" width={48} height={48} />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-semibold text-foreground">{p.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <p className="text-xs font-bold text-forest">{inr(p.price)}</p>
                            <span className="text-[0.65rem] text-muted-foreground line-through">{inr(p.mrp)}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => add(p.slug)}
                          className="shrink-0 rounded-lg bg-forest px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-forest/90 transition-all active:scale-95 shadow"
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

        {/* Footer Checkout Summary */}
        {lines.length > 0 && (
          <div className="border-t border-border bg-card px-5 py-4 shadow-xl">
            <div className="space-y-1.5 text-sm">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="font-semibold text-forest">FREE EXPRESS (Pan-India)</span>
              </div>
              <div className="flex items-center justify-between font-medium">
                <span className="text-foreground">Subtotal</span>
                <span className="font-display text-2xl font-bold text-forest">{inr(subtotal)}</span>
              </div>
              <p className="text-[0.7rem] text-muted-foreground text-center">
                Inclusive of all taxes · Cash on Delivery available at checkout
              </p>
            </div>

            {/* Instant WhatsApp Order Button */}
            <a
              href={whatsappOrderUrl(lines, productFor)}
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex w-full items-center justify-center gap-2.5 rounded-xl bg-forest py-3.5 text-xs font-bold tracking-widest text-primary-foreground uppercase shadow-lg transition-all hover:bg-forest/90 hover:scale-[1.01] active:scale-98"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.5 14.1c-.2.7-1.3 1.3-1.9 1.3-.5 0-1.1.1-3.4-.9-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.6-1.1-3s.7-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .7.5s.9 2.1 1 2.2c0 .1.1.3 0 .5-.4.8-.9.9-.6 1.4.5.9 1.2 1.7 2 2.3.9.7 1.3.8 1.6.6.2-.1.7-.9 1-1.2.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .8-.1 1.1Z" />
              </svg>
              <span>COMPLETE ORDER (CASH ON DELIVERY / UPI)</span>
            </a>

            <button
              type="button"
              onClick={() => setCartOpen(false)}
              className="mt-2 w-full rounded-xl border border-border py-2 text-xs font-medium text-foreground hover:bg-secondary transition-colors"
            >
              Continue Shopping
            </button>

            {/* Trust Seals */}
            <div className="mt-3 flex items-center justify-center gap-4 text-[0.65rem] text-muted-foreground border-t border-border pt-2.5">
              <span className="flex items-center gap-1">🛡️ 100% Genuine</span>
              <span className="flex items-center gap-1">🚚 3-5 Days Delivery</span>
              <span className="flex items-center gap-1">🔄 7-Day Returns</span>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
