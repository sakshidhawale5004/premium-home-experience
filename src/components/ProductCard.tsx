import { Link } from "@tanstack/react-router";
import { useShop, inr } from "@/lib/shop";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const { add, setCartOpen } = useShop();
  const discount =
    product.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : null;

  return (
    <div className="card-lift group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:border-gold/50 transition-all">
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className="relative block aspect-square overflow-hidden bg-secondary/50"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={600}
          height={600}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1 items-start">
          {discount && (
            <span className="rounded-full bg-forest px-2.5 py-1 text-[0.65rem] font-bold tracking-wider text-primary-foreground shadow-md">
              {discount}% OFF
            </span>
          )}
          {product.isBestseller && (
            <span className="rounded-full bg-gold px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-forest shadow">
              Bestseller
            </span>
          )}
        </div>

        {/* Free gift indicator */}
        <span className="absolute bottom-2.5 left-2.5 right-2.5 rounded-lg bg-card/90 backdrop-blur-md px-2.5 py-1 text-[0.65rem] font-medium text-forest text-center border border-gold/30 shadow-sm truncate">
          Incl. Free Selenite Plate
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        {/* Rating */}
        <div className="flex items-center gap-1.5 text-xs text-gold">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
          <span className="text-[0.72rem] font-medium text-muted-foreground">
            {product.rating} ({product.reviewsCount})
          </span>
        </div>

        <Link
          to="/products/$slug"
          params={{ slug: product.slug }}
          className="mt-1.5 line-clamp-2 min-h-[2.8rem] font-display text-lg font-semibold leading-snug text-forest transition-colors hover:text-gold-deep"
        >
          {product.name}
        </Link>

        <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
          {product.blurb}
        </p>

        <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <p className="font-display text-xl font-bold text-forest">{inr(product.price)}</p>
          {product.mrp > product.price && (
            <span className="text-xs text-muted-foreground line-through">
              MRP {inr(product.mrp)}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            add(product.slug);
            setCartOpen(true);
          }}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-forest px-4 py-2.5 text-[0.78rem] font-semibold tracking-wider text-primary-foreground transition-all hover:bg-forest/90 active:scale-98 shadow"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
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
