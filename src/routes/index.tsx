import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSlider } from "@/components/HeroSlider";
import { ProductCard } from "@/components/ProductCard";
import { products, collections, categoryLinks, STORE } from "@/data/products";
import { blogPosts, testimonials } from "@/data/content";
import pyramidImg from "@/assets/hero-pyramid.jpg";
import braceletsImg from "@/assets/hero-bracelets.jpg";
import treeImg from "@/assets/hero-tree.jpg";
import malaImg from "@/assets/hero-mala.jpg";
import vastuImg from "@/assets/hero-vastu.jpg";
import consultationImg from "@/assets/consultation.jpg";
import aboutStoreImg from "@/assets/about-store.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Vastu Adda | Premium Authentic Vastu Products & Crystals",
      },
      {
        name: "description",
        content:
          "Shop authentic Vastu pyramids, crystal trees, gemstone bracelets, and energized rudraksh malas. Certified natural stones, free Selenite cleansing plate, and Pan-India delivery.",
      },
      {
        property: "og:title",
        content: "Vastu Adda | Premium Authentic Vastu Products & Crystals",
      },
      {
        property: "og:description",
        content:
          "Certified crystal trees, pyramids, malas and bracelets with expert Vedic astrologer guidance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const categoryImages: Record<string, string> = {
  "Crystal Pyramids": pyramidImg,
  "Crystal Bracelets": braceletsImg,
  "Crystal Trees": treeImg,
  Malas: malaImg,
  "Vastu Products": vastuImg,
};

const categoryCopy: Record<string, string> = {
  "Crystal Pyramids": "Wealth & energy amplifiers",
  "Crystal Bracelets": "Energised beads for daily wear",
  "Crystal Trees": "Prosperity that takes root",
  Malas: "Sacred rudraksh combinations",
  "Vastu Products": "Time-tested remedies",
};

const favouriteSlugs = [
  "pyrite-tree",
  "money-magnet-pyramid",
  "dhan-yog-bracelets",
  "citrine-tree",
  "rudraksh-with-pyrite-mala",
  "karungali-bracelet",
  "pyrite-tortoise",
  "7-chakra-tree",
];

const trustItems = [
  {
    title: "100% Certified Crystals",
    text: "Genuine lab-tested earth crystals and Himalayan rudraksha",
    icon: (
      <path d="M12 3 4 6v6c0 5 3.4 8 8 9 4.6-1 8-4 8-9V6l-8-3Zm-2.5 9 2 2 4-4" />
    ),
  },
  {
    title: "Vedic Astrologer Energized",
    text: "Pre-consecrated with sacred mantras before dispatch",
    icon: <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 4v6l4 2" />,
  },
  {
    title: "Free Selenite Plate with Every Order",
    text: "Self-cleansing raw plate included with your purchase",
    icon: <path d="M20 7h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2ZM10 4h4v3h-4V4Z" />,
  },
  {
    title: "Pan India Free Shipping & COD",
    text: "Fast doorstep delivery with Cash on Delivery across all pincodes",
    icon: (
      <path d="M3 6h11v10H3Zm11 3h4l3 3v4h-7ZM7.5 19a1.5 1.5 0 1 0 0-.01M17.5 19a1.5 1.5 0 1 0 0-.01" />
    ),
  },
];

const faqs = [
  {
    q: "Why do you include a Free Raw Selenite Plate with crystal orders?",
    a: "Natural crystals absorb ambient energy from your surroundings. Selenite is a rare mineral that never retains negative energy and continuously self-cleanses. Resting your bracelet or crystal upon the Selenite plate overnight resets its vibrational frequency back to pure potential without needing water or chemical cleansers.",
  },
  {
    q: "Are your crystals and Rudraksha 100% authentic and certified?",
    a: "Yes. Every single crystal tree, bracelet, pyramid, and mala in our catalog is crafted with genuine earth-mined minerals (such as authentic Golden Pyrite, Natural Citrine, Sphatik Quartz, and genuine Tamil Karungali wood). We do not deal in cheap synthetic glass replicas. Each item includes a Certificate of Authenticity and Vedic Consecration.",
  },
  {
    q: "How does Cash on Delivery (COD) work?",
    a: "We offer Cash on Delivery across all serviceable pincodes in India. You can inspect the outer packaging and pay the courier executive in cash or via UPI QR code upon arrival at your doorstep.",
  },
  {
    q: "What is your return and exchange policy?",
    a: "We provide a 100% hassle-free 7-Day Replacement & Return Guarantee. If any item arrives damaged in transit or you have any concerns, message our WhatsApp helpline (+91 90212 65071) for an immediate replacement or refund.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="eyebrow text-gold-deep">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl font-semibold text-forest md:text-[2.6rem]">
        {title}
      </h2>
      <div className="gold-line mx-auto mt-4 w-28" />
      {subtitle && (
        <p className="mt-4 text-[0.98rem] leading-relaxed text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}

function Index() {
  const [selectedHomeCat, setSelectedHomeCat] = useState<string>("All");

  const homeFilteredProducts =
    selectedHomeCat === "All"
      ? products
      : products.filter((p) => p.category === selectedHomeCat);

  return (
    <div>
      <HeroSlider />

      {/* Trust strip */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4 sm:px-6">
          {trustItems.map((t) => (
            <div key={t.title} className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-forest shadow-sm">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  {t.icon}
                </svg>
              </span>
              <div>
                <p className="font-display text-lg font-semibold text-forest">{t.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Our Sacred Collections"
          title="Explore by Vastu Category"
          subtitle="Thoughtfully selected products for a balanced, protected and prosperous life — each category crafted around a single sacred intention."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryLinks.map((c, i) => (
            <Link
              key={c.category}
              to="/collections/$slug"
              params={{ slug: c.slug }}
              className={`card-lift group relative overflow-hidden rounded-3xl ${
                i === 0 ? "sm:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <div className={i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}>
                <img
                  src={categoryImages[c.category]}
                  alt={c.category}
                  loading="lazy"
                  width={1600}
                  height={900}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                <p className="eyebrow text-gold">{categoryCopy[c.category]}</p>
                <p className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-primary-foreground">
                  {c.category}
                </p>
                <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-gold-soft opacity-90 group-hover:opacity-100">
                  Explore Products →
                </span>
              </div>
              <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-card/90 text-forest opacity-0 transition-opacity group-hover:opacity-100 shadow-md">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Customer favourites (Bestsellers) */}
      <section className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Top Rated Essentials"
            title="Customer Favourites &amp; Bestsellers"
            subtitle="Our most-loved Vastu and crystal remedies, chosen again and again by thousands of households across India."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {favouriteSlugs.map((slug) => {
              const p = products.find((x) => x.slug === slug);
              return p ? <ProductCard key={p.slug} product={p} /> : null;
            })}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 rounded-full border border-forest/40 bg-card px-8 py-3.5 text-xs font-semibold tracking-wider text-forest uppercase shadow-sm transition-all hover:bg-forest hover:text-primary-foreground"
            >
              <span>View All 21 Products in Catalog</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Astrologer Consultation Banner */}
      <section className="relative overflow-hidden">
        <img
          src={consultationImg}
          alt="Vastu consultation"
          loading="lazy"
          width={1920}
          height={1080}
          className="h-[460px] w-full object-cover md:h-[520px]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/95 via-forest/75 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <div className="max-w-xl">
              <p className="eyebrow text-gold">Free Astrological Guidance</p>
              <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-primary-foreground md:text-5xl">
                Get Personalised Vastu Guidance
              </h2>
              <p className="mt-4 leading-relaxed text-primary-foreground/85 text-sm sm:text-base">
                Unsure which gemstone or remedy aligns with your zodiac sign (Rashi) and home
                direction? Speak with our resident Vedic Vastu experts for personalized, practical
                recommendations — zero renovation required.
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <a
                  href={STORE.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-gold px-8 py-3.5 text-xs font-bold tracking-wider text-forest uppercase transition-all hover:bg-gold-deep hover:text-primary-foreground shadow-lg"
                >
                  Book Free Consultation
                </a>
                <a
                  href={STORE.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 bg-card/10 backdrop-blur-sm px-7 py-3.5 text-xs font-semibold tracking-wider text-primary-foreground transition-colors hover:border-gold hover:text-gold"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.5 14.1c-.2.7-1.3 1.3-1.9 1.3-.5 0-1.1.1-3.4-.9-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.6-1.1-3s.7-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .7.5s.9 2.1 1 2.2c0 .1.1.3 0 .5-.4.8-.9.9-.6 1.4.5.9 1.2 1.7 2 2.3.9.7 1.3.8 1.6.6.2-.1.7-.9 1-1.2.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .8-.1 1.1Z" />
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Collection (All 21 Products with Filter Tabs) */}
      <section id="collection" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="The Full Sacred Shelf"
          title="Our Complete Collection (21 Remedies)"
          subtitle="Every genuine crystal tree, pyramid, bracelet, mala and tortoise available from Vastu Adda."
        />

        {/* Category Filter Pills on Home */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {["All", "Crystal Trees", "Crystal Pyramids", "Crystal Bracelets", "Malas", "Vastu Products"].map(
            (cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedHomeCat(cat)}
                className={`rounded-full px-5 py-2 text-xs font-semibold tracking-wide transition-all ${
                  selectedHomeCat === cat
                    ? "bg-forest text-primary-foreground shadow"
                    : "bg-secondary text-foreground/80 hover:bg-card hover:border hover:border-gold/50"
                }`}
              >
                {cat}
              </button>
            ),
          )}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {homeFilteredProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Why Vastu Adda Section */}
      <section className="bg-secondary/60 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div className="relative">
            <img
              src={aboutStoreImg}
              alt="Vastu Adda collection"
              loading="lazy"
              width={1600}
              height={1000}
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl border border-border"
            />
            <div className="absolute -bottom-6 -right-2 rounded-2xl border border-gold/40 bg-card px-7 py-5 shadow-2xl md:-right-6">
              <p className="font-display text-4xl font-bold text-gold-deep">100%</p>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Certified Natural &amp; Energized
              </p>
            </div>
          </div>

          <div>
            <p className="eyebrow text-gold-deep">Vedic Sourcing Heritage</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-forest">
              Ancient Vedic Wisdom, Curated for Modern Homes
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground text-sm sm:text-base">
              Every crystal tree, orgonite pyramid, and rudraksha mala in our store is chosen for
              uncompromising authenticity, mineral density, and sacred purpose — never mass-produced
              synthetic replicas.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                {
                  t: "Laboratory Checked Natural Crystals",
                  d: "Every nugget of Pyrite, Citrine, and Sphatik is verified 100% natural and unheated.",
                },
                {
                  t: "Vedic Consecration Included",
                  d: "We recite sacred mantras over each piece before packing to awaken positive bio-frequencies.",
                },
                {
                  t: "Free Selenite Cleansing Plate",
                  d: "Every purchase includes a raw Selenite charging plate to maintain permanent crystal clarity.",
                },
                {
                  t: "Unconditional 7-Day Guarantee",
                  d: "Damaged in transit or unsatisfied? Get an immediate, hassle-free replacement or refund.",
                },
              ].map((v) => (
                <li key={v.t} className="flex gap-4">
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest text-primary-foreground shadow">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path d="m5 13 4 4L19 7" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold text-forest">{v.t}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{v.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Kind Words"
          title="What Our Customers Say"
          subtitle="Real experiences shared by families, entrepreneurs, and meditators across India."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="card-lift flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-gold/40"
            >
              <div className="flex gap-1 text-gold" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-sm">★</span>
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-xs leading-relaxed text-foreground/80">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-border/60 pt-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest font-display text-sm font-semibold text-primary-foreground">
                  {t.name.charAt(0)}
                </span>
                <span>
                  <span className="block font-display text-sm font-semibold text-forest">
                    {t.name}
                  </span>
                  <span className="block text-[0.7rem] text-muted-foreground">{t.city}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="bg-secondary/40 py-16 border-t border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Helpful Knowledge"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about our remedies, consecration, and delivery."
          />
          <div className="mt-10 space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <p className="font-display text-lg font-semibold text-forest">{f.q}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Vastu Insights"
          title="From Our Spiritual Journal"
          subtitle="Practical crystal placement, directional alignments and Vedic wisdom written for everyday homes."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {blogPosts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              to="/blogs/$slug"
              params={{ slug: post.slug }}
              className="card-lift group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-gold/50"
            >
              <p className="eyebrow text-gold-deep">{post.category}</p>
              <h3 className="mt-3 flex-1 font-display text-2xl font-semibold leading-snug text-forest group-hover:text-gold-deep transition-colors">
                {post.title}
              </h3>
              <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
              <p className="mt-5 flex items-center justify-between text-xs text-muted-foreground border-t border-border/60 pt-3">
                <span>{post.date}</span>
                <span className="font-semibold text-gold-deep transition-transform group-hover:translate-x-1">
                  Read Article →
                </span>
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 rounded-full border border-forest/30 bg-card px-8 py-3 text-xs font-semibold tracking-wider text-forest uppercase transition-colors hover:border-gold hover:text-gold-deep shadow-sm"
          >
            Read All Vastu Insights <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-forest py-16 text-primary-foreground border-t border-gold/30">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center sm:px-6">
          <p className="eyebrow text-gold">Begin Today</p>
          <h2 className="max-w-2xl font-display text-4xl font-bold text-primary-foreground sm:text-5xl">
            Bring Divine Balance, Harmony &amp; Positive Energy to Your Space
          </h2>
          <p className="max-w-xl text-primary-foreground/80 text-sm sm:text-base leading-relaxed">
            Browse our full catalog of 21 certified products or chat directly with our Vastu
            consultant for personalized placement advice.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <Link
              to="/collections"
              className="rounded-full bg-gold px-8 py-3.5 text-xs font-bold tracking-wider text-forest uppercase transition-all hover:bg-gold-deep hover:text-primary-foreground shadow-lg"
            >
              Shop All 21 Products
            </Link>
            <a
              href={STORE.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-primary-foreground/40 bg-primary-foreground/10 px-8 py-3.5 text-xs font-semibold tracking-wider text-primary-foreground uppercase transition-colors hover:border-gold hover:text-gold"
            >
              Talk to Astrologer
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
