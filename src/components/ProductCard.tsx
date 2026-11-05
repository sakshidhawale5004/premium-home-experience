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
        <div className="absolute left-2 top-2 sm:left-3 sm:top-3 flex flex-col gap-1 items-start">
          {discount && (
            <span className="rounded-full bg-forest px-2 sm:px-2.5 py-0.5 sm:py-1 text-[0.6rem] sm:text-[0.65rem] font-bold tracking-wider text-primary-foreground shadow-md">
              {discount}% OFF
            </span>
          )}
          {product.isBestseller && (
            <span className="rounded-full bg-gold px-1.5 sm:px-2 py-0.5 text-[0.55rem] sm:text-[0.6rem] font-bold uppercase tracking-wider text-forest shadow">
              Bestseller
            </span>
          )}
        </div>

        {/* Free gift indicator */}
        <span className="absolute bottom-1.5 left-1.5 right-1.5 sm:bottom-2.5 sm:left-2.5 sm:right-2.5 rounded-lg bg-card/90 backdrop-blur-md px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[0.58rem] sm:text-[0.65rem] font-medium text-forest text-center border border-gold/30 shadow-sm truncate">
          Incl. Free Selenite Plate
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-2.5 sm:p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 sm:gap-1.5 text-xs text-gold">
          <div className="flex text-[0.65rem] sm:text-xs">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
          <span className="text-[0.65rem] sm:text-[0.72rem] font-medium text-muted-foreground truncate">
            {product.rating} ({product.reviewsCount})
          </span>
        </div>

        <Link
          to="/products/$slug"
          params={{ slug: product.slug }}
          className="mt-1 line-clamp-2 min-h-[2.2rem] sm:min-h-[2.8rem] font-display text-xs sm:text-base font-semibold leading-snug text-forest transition-colors hover:text-gold-deep"
        >
          {product.name}
        </Link>

        <p className="mt-0.5 line-clamp-1 text-[0.68rem] sm:text-xs text-muted-foreground">
          {product.blurb}
        </p>

        <div className="mt-2 sm:mt-3 flex flex-wrap items-baseline gap-x-1.5 sm:gap-x-2 gap-y-0.5">
          <p className="font-display text-sm sm:text-xl font-bold text-forest">{inr(product.price)}</p>
          {product.mrp > product.price && (
            <span className="text-[0.65rem] sm:text-xs text-muted-foreground line-through">
              {inr(product.mrp)}
            </span>
          )}
          {discount && (
            <span className="text-[0.6rem] sm:text-[0.68rem] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
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
          className="mt-2.5 sm:mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-forest px-2 sm:px-4 py-2 sm:py-2.5 text-[0.68rem] sm:text-[0.78rem] font-bold tracking-wider text-primary-foreground transition-all hover:bg-forest/90 active:scale-98 shadow"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <path d="M3 6h18"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <span className="truncate">ADD TO CART</span>
        </button>
      </div>
    </div>
  );
}
