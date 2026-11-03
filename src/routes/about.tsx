import { createFileRoute } from "@tanstack/react-router";
import { STORE } from "@/data/products";
import aboutStoreImg from "@/assets/about-store.jpg";
import consultationImg from "@/assets/consultation.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
        title: "About Us | Vastu Adda — Authentic Vastu Products & Guidance",
      },
      {
        name: "description",
        content:
          "Learn the story of Vastu Adda — how we curate authentic Vastu products, crystals and remedies, and guide families across India toward balanced, positive spaces.",
      },
      {
        property: "og:title",
        content: "About Us | Vastu Adda — Authentic Vastu Products & Guidance",
      },
      {
        property: "og:description",
        content:
          "Authentic Vastu products, hand-checked crystals and expert guidance — ancient wisdom curated for modern homes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const values = [
  {
    title: "Authenticity First",
    text: "Genuine crystals, natural rudraksh and solid brass — every item is inspected by hand before it reaches you.",
  },
  {
    title: "Guidance, Not Just Sales",
    text: "We explain where a piece belongs, what intention to set with it and how to care for it, so the remedy actually works for you.",
  },
  {
    title: "Rooted in Vedic Tradition",
    text: "Our selection follows classical Vastu Shastra and Vedic principles, translated into forms that suit modern homes and offices.",
  },
  {
    title: "Accessible to Everyone",
    text: "Meaningful remedies at honest prices, because a harmonious space should never be a luxury.",
  },
];

function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest py-24">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="eyebrow text-gold">Our Story</p>
          <h1 className="mt-4 font-display text-5xl font-semibold text-primary-foreground md:text-6xl">
            Ancient Wisdom for Modern Living
          </h1>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-primary-foreground/80">
            Vastu Adda brings together authentic Vastu products, energised crystals and personal
            guidance — so every home can carry balance, positivity and prosperity.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 lg:grid-cols-2">
        <img
          src={aboutStoreImg}
          alt="The Vastu Adda collection"
          loading="lazy"
          width={1600}
          height={1000}
          className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl"
        />
        <div>
          <p className="eyebrow text-gold-deep">Who We Are</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-forest">
            Curated with Care, Guided by Tradition
          </h2>
          <div className="mt-5 space-y-4 leading-relaxed text-muted-foreground">
            <p>
              Vastu Adda began with a simple observation: people want the calm, prosperity and
              warmth that Vastu promises, but they rarely know where to begin. The market is full
              of mass-produced pieces, and honest guidance is hard to find.
            </p>
            <p>
              So we built the opposite — a small, carefully chosen collection of pyramids, gemstone
              trees, bracelets, malas and remedies, each selected for authenticity and genuine
              purpose. Behind every product stands a practitioner who can tell you exactly where it
              belongs in your space and why.
            </p>
            <p>
              Today, families and business owners across India trust us not just for what we sell,
              but for how we guide. That guidance is our real product; the crystals simply carry it
              home.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-gold-deep">What We Stand For</p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-forest">Our Principles</h2>
            <div className="gold-line mx-auto mt-4 w-28" />
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {values.map((v, i) => (
              <div key={v.title} className="card-lift rounded-2xl border border-border bg-card p-7">
                <p className="font-display text-3xl font-semibold text-gold">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-forest">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="relative overflow-hidden">
        <img
          src={consultationImg}
          alt="Book a Vastu consultation"
          loading="lazy"
          width={1920}
          height={1080}
          className="h-[420px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/95 via-forest/70 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4">
            <div className="max-w-xl">
              <p className="eyebrow text-gold">Not Sure Where to Begin?</p>
              <h2 className="mt-3 font-display text-4xl font-semibold text-primary-foreground">
                Speak with a Vastu Expert
              </h2>
              <p className="mt-4 leading-relaxed text-primary-foreground/85">
                Share your floor plan or simply describe your space. Our consultants recommend
                practical remedies — placement, products and intention — with no renovation needed.
              </p>
              <a
                href={STORE.whatsapp}
                className="mt-7 inline-block rounded-full bg-gold px-8 py-3.5 text-sm font-semibold tracking-wide text-forest transition-colors hover:bg-gold-deep hover:text-primary-foreground"
              >
                Book a Consultation
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
