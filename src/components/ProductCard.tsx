import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <a
      href={product.url}
      className="card-lift group flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
    >
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={600}
          height={600}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-card/90 px-3 py-1 text-[0.65rem] font-medium tracking-[0.18em] uppercase text-forest/80 backdrop-blur">
          {product.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg font-semibold leading-snug text-forest">
          {product.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[0.82rem] leading-relaxed text-muted-foreground">
          {product.blurb}
        </p>
        <div className="mt-3 flex items-baseline justify-between">
          <p className="font-display text-xl font-semibold text-forest">₹{product.price}</p>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-deep transition-transform group-hover:translate-x-1">
            Buy Now <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </a>
  );
}
