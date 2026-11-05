import { useState, useMemo } from "react";
import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { products, collections, type Category, categoryLinks } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      {
        title: "All Sacred Collections & Products | Vastu Adda",
      },
      {
        name: "description",
        content:
          "Shop all 21 certified crystal trees, pyramids, energized rudraksha malas, and crystal bracelets. 100% natural stones with free Selenite cleansing plate and pan-India shipping.",
      },
      {
        property: "og:title",
        content: "All Sacred Collections & Products | Vastu Adda",
      },
      {
        property: "og:description",
        content: "Explore certified natural crystals, trees, pyramids and Vedic remedies.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: CollectionsPage,
});

function CollectionsPage() {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [searchQuery, setSearchQuery] = useState("");

  // If we are on a child route like /collections/$slug, render the child route!
  if (location.pathname !== "/collections" && location.pathname !== "/collections/") {
    return <Outlet />;
  }

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory !== "All") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.blurb.toLowerCase().includes(q),
      );
    }

    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, sortBy, searchQuery]);

  return (
    <div className="bg-background">
      {/* Hero Header */}
      <section className="bg-secondary/60 py-12 md:py-16 border-b border-border">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="eyebrow text-gold-deep">Authentic Spiritual Shelf</p>
          <h1 className="mt-3 font-display text-4xl font-bold text-forest sm:text-5xl md:text-6xl">
            Our Sacred Collections
          </h1>
          <div className="gold-line mx-auto mt-4 w-32" />
          <p className="mt-4 text-base text-muted-foreground leading-relaxed sm:text-lg">
            Explore 21 meticulously crafted, lab-certified crystal trees, pyramids, malas and
            bracelets. Pre-energized through Vedic rituals and delivered across India with a Free
            Selenite Plate.
          </p>

          {/* Quick Category Cards Carousel */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {collections.map((col) => (
              <Link
                key={col.slug}
                to="/collections/$slug"
                params={{ slug: col.slug }}
                className="group rounded-2xl border border-border bg-card p-3 shadow-sm hover:border-gold transition-all"
              >
                <div className="aspect-square overflow-hidden rounded-xl bg-secondary mb-2">
                  <img
                    src={col.image}
                    alt={col.category}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <p className="text-xs font-bold text-forest group-hover:text-gold-deep transition-colors line-clamp-1">
                  {col.category}
                </p>
                <p className="text-[0.65rem] text-muted-foreground mt-0.5">
                  {products.filter((p) => p.category === col.category).length} Products
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Filter & Products Section */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-border pb-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {["All", "Crystal Trees", "Crystal Pyramids", "Crystal Bracelets", "Malas", "Vastu Products"].map(
              (cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all ${
                    selectedCategory === cat
                      ? "bg-forest text-primary-foreground shadow"
                      : "bg-secondary text-foreground/80 hover:bg-card hover:border hover:border-gold/50"
                  }`}
                >
                  {cat}{" "}
                  <span className="opacity-75">
                    (
                    {cat === "All"
                      ? products.length
                      : products.filter((p) => p.category === cat).length}
                    )
                  </span>
                </button>
              ),
            )}
          </div>

          {/* Sort & Search */}
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Filter by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-xl border border-border bg-card px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-xl border border-border bg-card px-3 py-2 text-xs text-foreground focus:border-gold focus:outline-none"
            >
              <option value="featured">Featured Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <p>
            Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> products
          </p>
          <p className="text-forest font-medium">
            <span>Free Express Delivery &amp; Free Selenite Plate on All Orders</span>
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-display text-2xl font-bold text-forest">No products found</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting your category selection or search keywords.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 rounded-full bg-forest px-6 py-2.5 text-xs font-semibold text-primary-foreground"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
