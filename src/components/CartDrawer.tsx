import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useShop, inr, whatsappOrderUrl } from "@/lib/shop";
import { products } from "@/data/products";

// Addons featured in drawer
const ADDON_SLUGS = [
  "pyrite-key-chain",
  "pyrite-tortoise",
  "citrine-tree",
];

export function CartDrawer() {
  const {
    lines,
    count,
    subtotal,
    totalMrp,
    totalSavings,
    setQty,
    remove,
    add,
    cartOpen,
    setCartOpen,
    productFor,
    lastAddedProduct,
    showAddedToast,
    dismissToast,
    triggerSprinkles,
  } = useShop();

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

  const availableAddons = ADDON_SLUGS.map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => !!p && !lines.some((l) => l.slug === p.slug))
    .slice(0, 2);

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
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-2xl border-l border-gold/30 relative overflow-hidden">
        
        {/* Subtle decorative sprinkle confetti shapes floating in background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
          <span className="absolute top-24 left-6 h-2.5 w-2.5 rounded-full bg-pink-400 animate-pulse" />
          <span className="absolute top-40 right-10 h-3 w-1.5 rounded-sm bg-blue-400 rotate-45" />
          <span className="absolute top-72 left-12 h-2 w-2 rounded-full bg-yellow-400" />
          <span className="absolute top-96 right-8 h-3 w-3 rounded-full bg-purple-400 opacity-60" />
          <span className="absolute bottom-48 left-8 h-2.5 w-1.5 bg-emerald-400 rotate-12" />
          <span className="absolute bottom-32 right-14 h-2 w-2 rounded-full bg-amber-400" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-card px-5 py-4 relative z-10">
          <div className="flex items-center gap-2.5">
            <h2 className="font-display text-2xl font-bold text-forest">
              My Cart ({count})
            </h2>
            {totalSavings > 0 && (
              <span className="rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 px-3 py-0.5 text-xs font-bold border border-emerald-300/80">
                Save {inr(totalSavings)}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground text-xl font-medium"
          >
            ✕
          </button>
        </div>

        {/* Floating Added to Cart Toast Notification */}
        {showAddedToast && lastAddedProduct && (
          <div className="mx-4 mt-3 rounded-2xl border border-amber-200/90 bg-card p-3 shadow-xl relative z-20 flex items-center gap-3 animate-in fade-in slide-in-from-top-3 duration-300">
            <img
              src={lastAddedProduct.image}
              alt={lastAddedProduct.name}
              className="h-12 w-12 rounded-xl object-cover border border-border shadow-sm shrink-0"
              width={48}
              height={48}
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-amber-600 dark:text-amber-400">
                Added to cart!
              </p>
              <p className="text-xs font-semibold text-foreground truncate mt-0.5">
                {lastAddedProduct.name}
              </p>
            </div>
            <button
              type="button"
              onClick={dismissToast}
              aria-label="Dismiss message"
              className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg transition-colors text-xs font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Free Shipping & Gift Progress Bar */}
        <div className="bg-secondary/70 px-5 py-2.5 border-b border-border text-xs relative z-10">
          <p className="font-medium text-forest">
            <span>You've unlocked <strong>FREE Pan-India Delivery</strong> + <strong>Free Selenite Plate</strong>!</span>
          </p>
          <div className="mt-1.5 h-1.5 w-full rounded-full bg-border overflow-hidden">
            <div className="h-full bg-gradient-to-r from-gold to-forest w-full" />
          </div>
        </div>

        {/* Lines Container */}
        <div className="flex-1 overflow-y-auto px-5 py-4 relative z-10">
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
                          
                          {lineDiscount && (
                            <span className="inline-block mt-1 rounded-md bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 text-[0.65rem] font-bold px-2 py-0.5 border border-emerald-200">
                              <span>{lineDiscount}% OFF</span>
                            </span>
                          )}
                        </div>

                        <div className="mt-2.5 flex items-center justify-between">
                          {/* Quantity control */}
                          <div className="inline-flex items-center rounded-lg border border-border bg-background shadow-inner">
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
                              onClick={() => {
                                setQty(line.slug, line.qty + 1);
                                triggerSprinkles();
                              }}
                              aria-label="Increase quantity"
                              className="px-2.5 py-1 text-sm font-semibold text-foreground/70 hover:text-forest transition-colors"
                            >
                              +
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="font-display text-lg font-bold text-forest">{inr(p.price * line.qty)}</p>
                            {p.mrp > p.price && (
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

              {/* AVAILABLE ADD-ONS SECTION matching screenshot */}
              {availableAddons.length > 0 && (
                <div className="mt-6 rounded-2xl border border-emerald-200/80 bg-emerald-50/20 dark:bg-emerald-950/10 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-3">
                    AVAILABLE ADD-ONS
                  </p>
                  
                  {/* Standalone Selenite Plate Add-on */}
                  <div className="mb-2.5 flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-3 shadow-sm hover:border-emerald-400 transition-colors">
                    <img
                      src="/products/pyrite-tree.jpg"
                      alt="Raw Selenite Plate"
                      className="h-12 w-12 rounded-lg object-cover border border-border"
                      width={48}
                      height={48}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-foreground">
                        Raw Selenite Cleansing Plate
                      </p>
                      <p className="text-xs font-bold text-forest mt-0.5">₹100</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => add("pyrite-tree", 1)}
                      className="shrink-0 rounded-lg bg-emerald-700 px-3.5 py-1.5 text-xs font-bold text-white shadow hover:bg-emerald-800 transition-all active:scale-95"
                    >
                      + Add
                    </button>
                  </div>

                  {/* Dynamic Addon Products */}
                  {availableAddons.map((p) => (
                    <div
                      key={p.slug}
                      className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-3 shadow-sm hover:border-emerald-400 transition-colors mb-2.5 last:mb-0"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-12 w-12 rounded-lg object-cover border border-border"
                        width={48}
                        height={48}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-foreground">{p.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-xs font-bold text-forest">{inr(p.price)}</p>
                          <span className="text-[0.65rem] text-muted-foreground line-through">{inr(p.mrp)}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => add(p.slug, 1)}
                        className="shrink-0 rounded-lg bg-emerald-700 px-3.5 py-1.5 text-xs font-bold text-white shadow hover:bg-emerald-800 transition-all active:scale-95"
                      >
                        + Add
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {lines.length > 0 && (
          <div className="border-t border-border bg-card shadow-2xl relative z-20">
            {/* Green Saved So Far Banner */}
            {totalSavings > 0 && (
              <div className="bg-emerald-700 text-white text-center py-2 px-4 text-xs font-bold tracking-wide shadow-inner">
                <span>{inr(totalSavings)} Saved so far!</span>
              </div>
            )}

            <div className="px-5 py-4">
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-sm font-semibold text-foreground">Subtotal</span>
                <div className="text-right">
                  {totalMrp > subtotal && (
                    <span className="text-xs text-muted-foreground line-through mr-2">
                      {inr(totalMrp)}
                    </span>
                  )}
                  <span className="font-display text-2xl font-bold text-forest">
                    {inr(subtotal)}
                  </span>
                </div>
              </div>

              {/* SELECT ADDRESS / CHECKOUT BUTTON WITH PAYMENT LOGOS */}
              <Link
                to="/checkout"
                onClick={() => setCartOpen(false)}
                className="flex w-full items-center justify-between rounded-xl bg-black py-3.5 px-4 text-xs font-bold tracking-wider text-white shadow-xl hover:bg-zinc-900 transition-all active:scale-98"
              >
                <span className="uppercase tracking-widest text-[0.8rem]">SELECT ADDRESS</span>
                
                {/* Payment Icons */}
                <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg">
                  {/* Paytm */}
                  <span className="text-[0.65rem] font-black text-[#00b9f5] tracking-tight bg-white px-1.5 py-0.5 rounded">
                    paytm
                  </span>
                  {/* PhonePe */}
                  <span className="text-[0.65rem] font-bold text-[#5f259f] bg-white px-1.5 py-0.5 rounded">
                    पे
                  </span>
                  {/* GPay */}
                  <span className="text-[0.65rem] font-bold text-slate-800 bg-white px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    <span className="text-[#4285F4]">G</span>
                    <span>Pay</span>
                  </span>
                </div>
              </Link>

              <p className="mt-2 text-center text-[0.68rem] text-muted-foreground">
                Flat ₹500 Cashback on all Prepaid Orders • Cash on Delivery Available
              </p>

              {/* Quick continue shopping button */}
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="mt-2.5 w-full rounded-xl border border-border py-2 text-xs font-medium text-foreground hover:bg-secondary transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
