import { useState, useMemo } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { products, collections, categoryBySlug, STORE } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/collections/$slug")({
  head: ({ params }) => {
    const col = collections.find((c) => c.slug === params.slug);
    return {
      meta: [
        {
          title: col
            ? `${col.category} | Certified Authentic | Vastu Adda`
            : "Collection | Vastu Adda",
        },
        {
          name: "description",
          content:
            col?.blurb ??
            "Buy certified authentic crystals and sacred Vastu remedies energized by Vedic astrologers.",
        },
        {
          property: "og:title",
          content: col ? `${col.category} | Vastu Adda` : "Collection | Vastu Adda",
        },
        {
          property: "og:description",
          content: col?.blurb ?? "Authentic energized Vastu remedies.",
        },
        { property: "og:type", content: "website" },
      ],
    };
  },
  component: CollectionCategoryPage,
});

function CollectionCategoryPage() {
  const { slug } = Route.useParams();
  const col = collections.find((c) => c.slug === slug);

  if (!col) {
    throw notFound();
  }

  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  const categoryProducts = useMemo(() => {
    const list = products.filter((p) => p.category === col.category);

    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [col.category, sortBy]);

  return (
    <div className="bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border/80 bg-secondary/40 py-3">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 text-xs text-muted-foreground sm:px-6">
          <Link to="/" className="hover:text-forest transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/collections" className="hover:text-forest transition-colors">
            Collections
          </Link>
          <span>/</span>
          <span className="text-forest font-semibold">{col.category}</span>
        </div>
      </div>

      {/* Category Hero */}
      <section className="relative overflow-hidden bg-black py-16 text-white md:py-20">
        <div className="absolute inset-0 opacity-25">
          <img src={col.image} alt={col.category} className="h-full w-full object-cover blur-sm" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="eyebrow text-gold font-bold">Sacred Category</p>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl md:text-6xl text-white drop-shadow-md">
            {col.category}
          </h1>
          <div className="gold-line mx-auto mt-4 w-32" />
          <p className="mt-4 text-base leading-relaxed text-zinc-100 sm:text-lg max-w-2xl mx-auto drop-shadow">
            {col.blurb}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-semibold uppercase tracking-wider text-gold">
            <span className="rounded-full bg-white/10 px-3.5 py-1.5 backdrop-blur-sm border border-gold/30">
              ✓ 100% Certified Natural
            </span>
            <span className="rounded-full bg-white/10 px-3.5 py-1.5 backdrop-blur-sm border border-gold/30">
              ✓ Pre-Energized by Vedic Astrologer
            </span>
            <span className="rounded-full bg-white/10 px-3.5 py-1.5 backdrop-blur-sm border border-gold/30">
              ✓ Free Selenite Cleansing Plate
            </span>
          </div>
        </div>
      </section>

      {/* Products Grid & Controls */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="text-sm font-semibold text-forest">
              Showing {categoryProducts.length} Sacred {col.category}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Each piece is individually consecrated and dispatched with certificate of authenticity.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground focus:border-gold focus:outline-none"
            >
              <option value="featured">Featured Picks</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
          </div>
        </div>

        {/* Product Cards */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {categoryProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>

        {/* Other Categories Shelf */}
        <div className="mt-16 border-t border-border pt-12">
          <p className="eyebrow text-gold-deep text-center">Explore Other Categories</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {collections
              .filter((c) => c.slug !== slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  to="/collections/$slug"
                  params={{ slug: c.slug }}
                  className="rounded-full border border-border bg-card px-5 py-2.5 text-xs font-semibold text-foreground transition-all hover:border-gold hover:text-gold-deep shadow-sm"
                >
                  {c.category} →
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
