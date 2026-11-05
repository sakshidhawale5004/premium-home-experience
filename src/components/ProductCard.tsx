import { Link } from "@tanstack/react-router";
import { useShop, inr } from "@/lib/shop";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const { add, setCartOpen } = useShop();
  const discount = product.mrp && product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : null;

  return (
    <div className="card-lift group flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className="relative block aspect-square overflow-hidden bg-secondary"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={700}
          height={700}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {discount && (
          <span className="absolute left-3 top-3 rounded-full bg-forest px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide text-primary-foreground">
            {discount}% OFF
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Link
          to="/products/$slug"
          params={{ slug: product.slug }}
          className="line-clamp-2 min-h-[2.9rem] font-display text-[1.05rem] font-semibold leading-snug text-forest transition-colors hover:text-gold-deep"
        >
          {product.name}
        </Link>
        <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <p className="font-display text-xl font-semibold text-forest">{inr(product.price)}</p>
          {product.mrp && product.mrp > product.price && (
            <span className="text-sm text-muted-foreground line-through">MRP {inr(product.mrp)}</span>
          )}
          {discount && (
            <span className="rounded-full bg-secondary px-2 py-0.5 text-[0.65rem] font-semibold text-forest">
              {discount}% OFF
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            add(product.slug);
            setCartOpen(true);
          }}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-forest px-4 py-2.5 text-[0.78rem] font-semibold tracking-[0.08em] text-primary-foreground transition-colors hover:bg-forest/90"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <circle cx="9" cy="20" r="1.4" />
            <circle cx="17" cy="20" r="1.4" />
            <path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.3h7.9a1.5 1.5 0 0 0 1.5-1.2L20 8H6" />
          </svg>
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
