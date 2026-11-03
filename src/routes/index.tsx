import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { HeroSlider } from "@/components/HeroSlider";
import { ProductCard } from "@/components/ProductCard";
import { products, categoryLinks, STORE } from "@/data/products";
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
        title: "Vastu Adda | Authentic Vastu Products, Crystals & Remedies",
      },
      {
        name: "description",
        content:
          "Shop authentic Vastu pyramids, crystal trees, bracelets, rudraksh malas and remedies with expert guidance. Bring balance, positivity and prosperity to your space.",
      },
      {
        property: "og:title",
        content: "Vastu Adda | Authentic Vastu Products, Crystals & Remedies",
      },
      {
        property: "og:description",
        content:
          "Hand-picked Vastu pyramids, crystal trees, bracelets and rudraksh malas — with expert consultation for a harmonious home.",
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

const favouriteIds = [1, 7, 9, 17, 3, 21, 13, 19];

const trustItems = [
  {
    title: "Authentic Vastu Products",
    text: "Genuine crystals and rudraksh, quality checked",
    icon: (
      <path d="M12 3 4 6v6c0 5 3.4 8 8 9 4.6-1 8-4 8-9V6l-8-3Zm-2.5 9 2 2 4-4" />
    ),
  },
  {
    title: "Expert Consultation",
    text: "Personalised guidance from Vastu experts",
    icon: <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 4v6l4 2" />,
  },
  {
    title: "Secure Payments",
    text: "Safe checkout with trusted gateways",
    icon: <path d="M4 10h16v10H4Zm4 0V7a4 4 0 0 1 8 0v3" />,
  },
  {
    title: "Pan India Delivery",
    text: "Careful packaging, delivered nationwide",
    icon: <path d="M3 6h11v10H3Zm11 3h4l3 3v4h-7ZM7.5 19a1.5 1.5 0 1 0 0-.01M17.5 19a1.5 1.5 0 1 0 0-.01" />,
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
  return (
    <div>
      <HeroSlider />

      {/* Trust strip */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((t) => (
            <div key={t.title} className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-forest">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  {t.icon}
                </svg>
              </span>
              <div>
                <p className="font-display text-lg font-semibold text-forest">{t.title}</p>
                <p className="mt-0.5 text-[0.82rem] text-muted-foreground">{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading
          eyebrow="Our Collections"
          title="Explore Our Vastu Collection"
          subtitle="Thoughtfully selected products for a balanced and prosperous life — each category crafted around a single intention."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryLinks.map((c, i) => (
            <a
              key={c.category}
              href={c.href}
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
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="eyebrow text-gold">{categoryCopy[c.category]}</p>
                <p className="mt-1.5 font-display text-2xl font-semibold text-primary-foreground">
                  {c.category}
                </p>
              </div>
              <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-card/85 text-forest opacity-0 transition-opacity group-hover:opacity-100">
                →
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Customer favourites */}
      <section className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Bestsellers"
            title="Customer Favourites"
            subtitle="Our most-loved Vastu and crystal essentials, chosen again and again by families across India."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {favouriteIds.map((id) => {
              const p = products.find((x) => x.id === id);
              return p ? <ProductCard key={p.id} product={p} /> : null;
            })}
          </div>
          <div className="mt-10 text-center">
            <a
              href={STORE.site}
              className="inline-flex items-center gap-2 rounded-full border border-forest/30 px-7 py-3 text-sm font-medium text-forest transition-colors hover:border-gold hover:text-gold-deep"
            >
              View the Complete Store <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Consultation banner */}
      <section className="relative overflow-hidden">
        <img
          src={consultationImg}
          alt="Vastu consultation"
          loading="lazy"
          width={1920}
          height={1080}
          className="h-[440px] w-full object-cover md:h-[520px]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/95 via-forest/70 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4">
            <div className="max-w-xl">
              <p className="eyebrow text-gold">Personal Guidance</p>
              <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-primary-foreground md:text-5xl">
                Get Personalised Vastu Guidance
              </h2>
              <p className="mt-4 leading-relaxed text-primary-foreground/85">
                Understanding your space is the first step. Speak with our Vastu experts for
                practical recommendations for your home, office or shop — no renovation required.
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <a
                  href={STORE.whatsapp}
                  className="rounded-full bg-gold px-7 py-3.5 text-sm font-semibold tracking-wide text-forest transition-colors hover:bg-gold-deep hover:text-primary-foreground"
                >
                  Book a Consultation
                </a>
                <a
                  href={STORE.whatsapp}
                  className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-7 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:border-gold hover:text-gold"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.5 14.1c-.2.7-1.3 1.3-1.9 1.3-.5 0-1.1.1-3.4-.9-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.6-1.1-3s.7-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .7.5s.9 2.1 1 2.2c0 .1.1.3 0 .5-.4.8-.9.9-.6 1.4.5.9 1.2 1.7 2 2.3.9.7 1.3.8 1.6.6.2-.1.7-.9 1-1.2.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .8-.1 1.1Z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete collection */}
      <section id="collection" className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading
          eyebrow="The Full Range"
          title="Our Complete Collection"
          subtitle="Every product from the Vastu Adda shelf — pyramids, trees, bracelets, malas and remedies — in one place."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Why Vastu Adda */}
      <section className="bg-secondary/60 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2">
          <div className="relative">
            <img
              src={aboutStoreImg}
              alt="Vastu Adda collection"
              loading="lazy"
              width={1600}
              height={1000}
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl"
            />
            <div className="absolute -bottom-6 -right-4 rounded-2xl border border-gold/40 bg-card px-7 py-5 shadow-xl md:-right-6">
              <p className="font-display text-3xl font-semibold text-gold-deep">100%</p>
              <p className="text-sm text-muted-foreground">Authentic & energised</p>
            </div>
          </div>
          <div>
            <p className="eyebrow text-gold-deep">Why Vastu Adda</p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-forest">
              Ancient Wisdom, Curated for Modern Homes
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Every product we offer is chosen for authenticity, craftsmanship and genuine Vedic
              purpose — never mass-produced trinkets. Our guidance is practical, respectful of
              tradition, and tailored to your space.
            </p>
            <ul className="mt-8 space-y-5">
              {[
                {
                  t: "Hand-Checked Quality",
                  d: "Each crystal, bead and brass piece is inspected before it reaches your door.",
                },
                {
                  t: "Guidance with Every Order",
                  d: "We tell you where to place it, how to use it and what intention to set.",
                },
                {
                  t: "Rooted in Tradition",
                  d: "Remedies sourced following classical Vastu and Vedic principles.",
                },
                {
                  t: "Support Beyond Delivery",
                  d: "Questions after purchase? Our experts stay available on WhatsApp.",
                },
              ].map((v) => (
                <li key={v.t} className="flex gap-4">
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest text-primary-foreground">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="m5 13 4 4L19 7" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold text-forest">{v.t}</p>
                    <p className="text-sm text-muted-foreground">{v.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading
          eyebrow="Kind Words"
          title="What Our Customers Say"
          subtitle="Experiences shared by families and business owners across India."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="card-lift flex flex-col rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex gap-1 text-gold" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-current">
                    <path d="M10 1.5 12.6 7l6 .6-4.5 4 1.3 5.9L10 14.4l-5.4 3 1.3-5.9-4.5-4 6-.6L10 1.5Z" />
                  </svg>
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[0.9rem] leading-relaxed text-foreground/80">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest font-display text-base font-semibold text-primary-foreground">
                  {t.name.charAt(0)}
                </span>
                <span>
                  <span className="block font-display text-base font-semibold text-forest">
                    {t.name}
                  </span>
                  <span className="block text-xs text-muted-foreground">{t.city}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Blog preview */}
      <section className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Vastu Insights"
            title="From Our Journal"
            subtitle="Practical Vastu and crystal wisdom, written for everyday life."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {blogPosts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                to="/blogs/$slug"
                params={{ slug: post.slug }}
                className="card-lift group flex flex-col rounded-2xl border border-border bg-card p-6"
              >
                <p className="eyebrow text-gold-deep">{post.category}</p>
                <h3 className="mt-3 flex-1 font-display text-2xl font-semibold leading-snug text-forest">
                  {post.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <p className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{post.date}</span>
                  <span className="font-medium text-gold-deep transition-transform group-hover:translate-x-1">
                    Read More →
                  </span>
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 rounded-full border border-forest/30 px-7 py-3 text-sm font-medium text-forest transition-colors hover:border-gold hover:text-gold-deep"
            >
              Read All Articles <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-forest py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center">
          <p className="eyebrow text-gold">Begin Today</p>
          <h2 className="max-w-2xl font-display text-4xl font-semibold text-primary-foreground">
            Bring Balance, Harmony and Positive Energy to Your Space
          </h2>
          <p className="max-w-xl text-primary-foreground/80">
            Browse the collection or talk to a Vastu expert — either way, your journey to a
            harmonious home starts with one small step.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={STORE.site}
              className="rounded-full bg-gold px-8 py-3.5 text-sm font-semibold tracking-wide text-forest transition-colors hover:bg-gold-deep hover:text-primary-foreground"
            >
              Shop Now
            </a>
            <a
              href={STORE.whatsapp}
              className="rounded-full border border-primary-foreground/40 px-8 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:border-gold hover:text-gold"
            >
              Talk to an Expert
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
