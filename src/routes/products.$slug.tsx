import { useState, useId } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { products, type Product, STORE } from "@/data/products";
import { useShop, inr } from "@/lib/shop";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/products/$slug")({
  head: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    return {
      meta: [
        {
          title: product
            ? `${product.name} | 100% Certified Original | Vastu Adda`
            : "Product Details | Vastu Adda",
        },
        {
          name: "description",
          content:
            product?.blurb ??
            "Buy 100% genuine, lab-certified crystals and Vedic Vastu remedies with Free Selenite plate and Pan-India delivery.",
        },
        {
          property: "og:title",
          content: product ? `${product.name} | Vastu Adda` : "Product Details | Vastu Adda",
        },
        {
          property: "og:description",
          content: product?.blurb ?? "Authentic energized Vastu remedies.",
        },
        {
          property: "og:image",
          content: product?.image ?? "/logo.svg",
        },
        { property: "og:type", content: "product" },
      ],
    };
  },
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { slug } = Route.useParams();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    throw notFound();
  }

  const { add, setCartOpen } = useShop();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Standard / 8mm");
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"desc" | "benefits" | "howto" | "shipping">("desc");

  const discount =
    product.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : null;

  // Multi-view mock angles
  const galleryImages = [
    { src: product.image, label: "Main View" },
    { src: product.image, label: "Close Up" },
    { src: product.image, label: "Certificate" },
    { src: product.image, label: "Free Gift" },
  ];

  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus("Eligible for FREE Express Delivery! Arrives in 3-4 Business Days.");
    } else {
      setPincodeStatus("Please enter a valid 6-digit Indian PIN code.");
    }
  };

  const handleBuyNow = () => {
    add(product.slug, quantity);
    setCartOpen(true);
  };

  const whatsappDirectUrl = `${STORE.whatsapp}?text=${encodeURIComponent(
    `Hello Vastu Adda! I want to order:\n\n• Product: ${product.name}\n• Price: ${inr(
      product.price,
    )}\n• Quantity: ${quantity}\n• Size/Variant: ${selectedSize}\n\nPlease confirm availability and payment details. Thank you!`,
  )}`;

  return (
    <div className="bg-background">
      {/* Breadcrumb Navigation */}
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
          <span className="text-foreground/80 font-medium truncate">{product.category}</span>
          <span>/</span>
          <span className="text-forest font-semibold truncate">{product.name}</span>
        </div>
      </div>

      {/* Main Product Container */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Product Gallery (5 cols) */}
          <div className="lg:col-span-6">
            <div className="sticky top-28">
              {/* Main Image Frame */}
              <div className="relative aspect-square overflow-hidden rounded-3xl border border-gold/40 bg-card shadow-lg">
                <img
                  src={galleryImages[selectedImageIndex]?.src}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  width={700}
                  height={700}
                />

                {/* Floating Badges */}
                <div className="absolute left-4 top-4 flex flex-col gap-1.5 items-start">
                  {discount && (
                    <span className="rounded-full bg-forest px-3 py-1 text-xs font-bold tracking-wider text-primary-foreground shadow-md">
                      SAVE {discount}%
                    </span>
                  )}
                  <span className="rounded-full bg-gold px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-wider text-forest shadow">
                    100% Certified Natural
                  </span>
                </div>

                {/* Free Gift Badge Overlay */}
                <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-gold/40 bg-card/95 backdrop-blur-md p-2.5 text-center shadow-md">
                  <p className="text-xs font-semibold text-forest text-center">
                    <span>Includes <strong>Free Raw Selenite Cleansing Plate</strong> &amp; Certificate</span>
                  </p>
                </div>
              </div>

              {/* Thumbnail Selector */}
              <div className="mt-4 grid grid-cols-4 gap-3">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-all ${
                      selectedImageIndex === idx
                        ? "border-forest shadow-md scale-95"
                        : "border-border hover:border-gold/60 opacity-75 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      className="h-full w-full object-cover"
                      width={120}
                      height={120}
                    />
                    <span className="absolute bottom-1 left-0 right-0 bg-background/80 text-[0.58rem] font-semibold text-forest text-center py-0.5">
                      {img.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Guarantees Box */}
              <div className="mt-6 rounded-2xl border border-border bg-secondary/40 p-4">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-1.5 text-foreground/85">
                    <span className="text-forest font-bold">✓</span>
                    <span>100% Authentic Certified</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-foreground/85">
                    <span className="text-forest font-bold">✓</span>
                    <span>Vedic Astrologer Energized</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-foreground/85">
                    <span className="text-forest font-bold">✓</span>
                    <span>Free Pan-India Delivery</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-foreground/85">
                    <span className="text-forest font-bold">✓</span>
                    <span>7 Days Easy Replacement</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Purchasing & Details Box (6 cols) */}
          <div className="lg:col-span-6">
            {/* Category / Sub-brand */}
            <p className="eyebrow text-gold-deep">
              ASTRO AARAMBH · SACRED VASTU COLLECTION
            </p>

            {/* Title */}
            <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-forest sm:text-4xl md:text-[2.6rem]">
              {product.name}
            </h1>

            {/* Star Rating & Social Proof */}
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 text-gold text-base">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <span className="text-sm font-semibold text-forest">
                {product.rating} / 5.0
              </span>
              <span className="text-muted-foreground text-sm">
                ({product.reviewsCount} Verified Customer Reviews)
              </span>
              <span className="rounded-full bg-emerald-100 text-emerald-800 text-[0.65rem] font-bold px-2 py-0.5">
                ✓ In Stock
              </span>
            </div>

            {/* Urgency Alert Bar */}
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50/80 px-3.5 py-2 text-xs text-amber-900">
              <span>
                <strong>High Demand:</strong> Only <strong>{product.stockLeft} units left</strong> in stock at this festive promotional rate!
              </span>
            </div>

            {/* Pricing Box */}
            <div className="mt-5 rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="font-display text-4xl font-bold text-forest">
                  {inr(product.price)}
                </span>
                {product.mrp > product.price && (
                  <span className="text-lg text-muted-foreground line-through">
                    MRP {inr(product.mrp)}
                  </span>
                )}
                {discount && (
                  <span className="rounded-full bg-forest px-3 py-1 text-xs font-bold text-primary-foreground">
                    Save {inr(product.mrp - product.price)} ({discount}% OFF)
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Inclusive of all taxes · <strong>FREE Express Shipping</strong> across India
              </p>

              {/* Special Gift Highlight */}
              <div className="mt-4 rounded-xl border border-gold/40 bg-gold/10 p-3 text-xs leading-relaxed text-forest">
                <p className="font-semibold text-gold-deep">
                  <span>Special Combo Gift with Every Order:</span>
                </p>
                <p className="mt-1 font-medium">
                  {product.giftIncluded}
                </p>
              </div>

              {/* Variant Selector: Bead Size / Dimensions */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                  <span>SELECT SIZE / SPECIFICATION:</span>
                  <span className="text-gold-deep">{selectedSize}</span>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {[
                    "6mm (Delicate / Women)",
                    "8mm (Standard Classic)",
                    "10mm (Bold Statement)",
                  ].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-xl border py-2 px-2 text-xs font-medium transition-all ${
                        selectedSize === size
                          ? "border-forest bg-forest text-primary-foreground shadow"
                          : "border-border bg-background hover:border-gold text-foreground/80"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector & Action Buttons */}
              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-foreground">QUANTITY:</span>
                  <div className="inline-flex items-center rounded-xl border border-border bg-background">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 text-sm font-semibold hover:text-forest transition-colors"
                    >
                      −
                    </button>
                    <span className="min-w-[2.5rem] text-center text-sm font-bold">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                      className="px-3 py-2 text-sm font-semibold hover:text-forest transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Primary ADD TO CART Button */}
                <button
                  type="button"
                  onClick={() => {
                    add(product.slug, quantity);
                    setCartOpen(true);
                  }}
                  className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-forest py-4 text-sm font-bold tracking-wider text-primary-foreground uppercase shadow-lg transition-all hover:bg-forest/90 active:scale-98"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="20" r="1.4" />
                    <circle cx="17" cy="20" r="1.4" />
                    <path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.3h7.9a1.5 1.5 0 0 0 1.5-1.2L20 8H6" />
                  </svg>
                  <span>ADD TO CART</span>
                </button>

                {/* BUY NOW WITH CASH ON DELIVERY (COD) */}
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 py-3.5 text-xs font-bold tracking-widest text-white uppercase shadow-md transition-all hover:brightness-110 active:scale-98"
                >
                  <span>BUY NOW - CASH ON DELIVERY (COD) AVAILABLE</span>
                </button>

                {/* 1-Click WhatsApp Order */}
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-600/40 bg-emerald-50 py-3 text-xs font-bold text-emerald-800 transition-colors hover:bg-emerald-100"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-emerald-700">
                    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.5 14.1c-.2.7-1.3 1.3-1.9 1.3-.5 0-1.1.1-3.4-.9-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.6-1.1-3s.7-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .7.5s.9 2.1 1 2.2c0 .1.1.3 0 .5-.4.8-.9.9-.6 1.4.5.9 1.2 1.7 2 2.3.9.7 1.3.8 1.6.6.2-.1.7-.9 1-1.2.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .8-.1 1.1Z" />
                  </svg>
                  <span>Order in 1-Click via WhatsApp</span>
                </a>
              </div>

              {/* Delivery Pincode Checker */}
              <div className="mt-6 border-t border-border pt-4">
                <p className="text-xs font-semibold text-foreground">
                  CHECK DELIVERY &amp; COD AVAILABILITY:
                </p>
                <form onSubmit={checkPincode} className="mt-2 flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-gold focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-forest px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-forest/90 transition-colors"
                  >
                    Check
                  </button>
                </form>
                {pincodeStatus && (
                  <p className="mt-2 text-xs font-medium text-forest animate-fade-in">
                    ✓ {pincodeStatus}
                  </p>
                )}
              </div>
            </div>

            {/* Product Tabs / Accordion */}
            <div className="mt-8">
              <div className="flex border-b border-border text-xs sm:text-sm font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab("desc")}
                  className={`pb-3 pr-4 transition-colors ${
                    activeTab === "desc"
                      ? "border-b-2 border-forest text-forest font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Overview &amp; Significance
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("benefits")}
                  className={`pb-3 px-4 transition-colors ${
                    activeTab === "benefits"
                      ? "border-b-2 border-forest text-forest font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Astrological Benefits
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("howto")}
                  className={`pb-3 px-4 transition-colors ${
                    activeTab === "howto"
                      ? "border-b-2 border-forest text-forest font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  How to Use / Wear
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("shipping")}
                  className={`pb-3 pl-4 transition-colors ${
                    activeTab === "shipping"
                      ? "border-b-2 border-forest text-forest font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Shipping &amp; Returns
                </button>
              </div>

              {/* Tab Contents */}
              <div className="mt-5 text-sm leading-relaxed text-foreground/85">
                {activeTab === "desc" && (
                  <div className="space-y-3">
                    {product.description.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                    <div className="mt-4 rounded-xl border border-border bg-secondary/50 p-3.5 text-xs">
                      <p>
                        <strong>Material:</strong> {product.material}
                      </p>
                      <p className="mt-1">
                        <strong>Ideal Placement:</strong> {product.idealPlacement}
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "benefits" && (
                  <div className="space-y-3">
                    <p className="font-semibold text-forest">
                      Key Vastu &amp; Metaphysical Benefits:
                    </p>
                    <ul className="space-y-2">
                      {product.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="text-forest mt-0.5">✦</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === "howto" && (
                  <div className="space-y-3">
                    <p className="font-semibold text-forest">Recommended Vedic Activation:</p>
                    <p>{product.howToUse}</p>
                    <div className="rounded-xl border border-gold/40 bg-gold/10 p-3 text-xs text-forest">
                      <p className="font-semibold">How to Cleanse with Free Selenite Plate:</p>
                      <p className="mt-1">
                        Whenever you take off your crystal or tree, place it directly on top of the
                        included Selenite plate overnight. Selenite constantly cleanses all stagnant
                        vibrations without requiring water or harsh sunlight.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "shipping" && (
                  <div className="space-y-2.5 text-xs leading-relaxed">
                    <p>
                      <strong>Pan-India Express Delivery:</strong> Dispatched within 24 hours.
                      Expected delivery within 3-5 business days via Bluedart, Delhivery, or DTDC.
                    </p>
                    <p>
                      <strong>Cash on Delivery (COD):</strong> Available across all pin codes in
                      India. Pay comfortably at your doorstep.
                    </p>
                    <p>
                      <strong>7 Days Replacement Guarantee:</strong> If the product arrives damaged
                      or you are dissatisfied, reach out to our WhatsApp helpline for an immediate,
                      no-questions-asked replacement or refund.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Verified Customer Reviews Section - Voices of Serenity Style */}
        <div className="mt-16 border-t border-border pt-12">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <p className="eyebrow text-gold-deep tracking-[0.25em]">TESTIMONIALS</p>
              <h2 className="mt-3 font-display text-4xl font-semibold text-forest">
                Voices of Serenity
              </h2>
              <div className="gold-line mx-auto mt-4 w-28" />
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Real stories from homes and workspaces transformed by mindful Vastu placement.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  author: "Meera & Raghav S.",
                  city: "Bengaluru",
                  rating: 5,
                  review:
                    "The Money Magnet pyramid brought an unmistakable shift in our home's atmosphere within two weeks. Their team even reviewed photos of our living room on WhatsApp to recommend the exact spot. That personal care is rare.",
                },
                {
                  author: "Dr. Ananya P.",
                  city: "Pune",
                  rating: 5,
                  review:
                    "I was sceptical about crystals until I placed a Golden Pyrite tree in the north corner of our clinic. Patients regularly comment on the calm vibe of the waiting room now. Exceptional authenticity.",
                },
                {
                  author: "Vikramaditya K.",
                  city: "Jaipur",
                  rating: 5,
                  review:
                    "Finding authentic karungali and seven mukhi rudraksha online is hard. Vastu Adda's quality was certified, the beads felt heavy and energised, and delivery to Jaipur was prompt and beautifully packed.",
                },
              ].map((rev, i) => (
                <div
                  key={i}
                  className="card-lift flex flex-col justify-between rounded-3xl border border-border bg-card p-7 shadow-sm hover:border-gold/40 transition-all"
                >
                  <div>
                    <div className="flex gap-1 text-gold text-sm" aria-hidden="true">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>

                    <blockquote className="mt-4 text-xs sm:text-[0.88rem] leading-relaxed italic text-foreground/85 font-body">
                      "{rev.review}"
                    </blockquote>
                  </div>

                  <div className="mt-6 border-t border-border/70 pt-4 flex items-center justify-between">
                    <div>
                      <p className="font-display text-sm font-bold text-forest">{rev.author}</p>
                      <p className="text-[0.72rem] text-muted-foreground">{rev.city}</p>
                    </div>
                    <span className="rounded-full bg-emerald-100 text-emerald-800 text-[0.62rem] font-bold uppercase tracking-wider px-2.5 py-0.5">
                      VERIFIED BUYER
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products Grid */}
        {related.length > 0 && (
          <div className="mt-16 border-t border-border pt-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="eyebrow text-gold-deep">Complementary Items</p>
                <h2 className="mt-1 font-display text-3xl font-bold text-forest">
                  You May Also Like
                </h2>
              </div>
              <Link
                to="/collections"
                className="text-xs font-semibold uppercase tracking-wider text-gold-deep hover:text-forest"
              >
                View Full Shelf →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Bottom Sticky Bar on Scroll */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gold/40 bg-card/95 backdrop-blur-md px-4 py-3 shadow-2xl md:hidden">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={product.image}
              alt={product.name}
              className="h-10 w-10 shrink-0 rounded-lg object-cover border border-border"
              width={40}
              height={40}
            />
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-forest">{product.name}</p>
              <p className="text-xs font-semibold text-forest">{inr(product.price)}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              add(product.slug, 1);
              setCartOpen(true);
            }}
            className="shrink-0 rounded-xl bg-forest px-5 py-2.5 text-xs font-bold tracking-wider text-primary-foreground uppercase shadow hover:bg-forest/90"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}
