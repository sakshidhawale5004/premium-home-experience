import { createFileRoute, Link } from "@tanstack/react-router";
import { STORE, collections } from "@/data/products";
import aboutStoreImg from "@/assets/about-store.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
        title: "About Our Heritage & Sacred Sourcing | Vastu Adda",
      },
      {
        name: "description",
        content:
          "Discover the story of Vastu Adda — authentic earth-mined crystals, Vedic astrologer consecration, and personalized Vastu guidance for modern homes across India.",
      },
      {
        property: "og:title",
        content: "About Our Heritage & Sacred Sourcing | Vastu Adda",
      },
      {
        property: "og:description",
        content:
          "Authentic Vastu products, lab-certified crystals and astrologer guidance for peaceful, prosperous homes.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AboutPage,
});

const directions = [
  {
    direction: "North (Kuber Zone)",
    element: "Water & Mercury",
    remedy: "Golden Pyrite & Wealth Trees",
    desc: "Governed by Lord Kuber, the divine treasurer. Placing authentic Pyrite or Citrine here unblocks stagnant business cash flow and magnetizes fresh professional opportunities.",
  },
  {
    direction: "North-East (Ishanya)",
    element: "Ether & Jupiter",
    remedy: "5-Mukhi Rudraksha & Sphatik Quartz",
    desc: "The sacred corner of pure spiritual consciousness and Lord Shiva. Ideal for Himalayan Rudraksha malas and clear quartz to dissipate chronic stress and anxiety.",
  },
  {
    direction: "South-East (Agneya)",
    element: "Fire & Venus",
    remedy: "Dhanlabh & Money Magnet Pyramids",
    desc: "The realm of Goddess Lakshmi and creative fire. Orgonite pyramids placed here amplify abundance intentions and safeguard against sudden household financial leakages.",
  },
  {
    direction: "South-West (Nairutya)",
    element: "Earth & Rahu",
    remedy: "Karungali Ebony & Pyrite Tortoise",
    desc: "The heavy grounding anchor of the home. Solid Pyrite Tortoises and Karungali ebony beads stationed here prevent career demotion, legal friction, and domestic instability.",
  },
];

const pillars = [
  {
    number: "01",
    title: "Geological Mineral Integrity",
    subtitle: "100% Earth-Mined · Zero Synthetic Glass",
    text: "The metaphysical power of a crystal resides in its organic crystal lattice formed deep underground over millions of years. We refuse cheap glass or tinted resin imitations — every specimen is authenticated for mineral density and natural inclusion hallmarks.",
  },
  {
    number: "02",
    title: "Vedic Prana Pratishtha",
    subtitle: "Sacred Shuddhi & Mantra Activation",
    text: "A crystal or Rudraksha seed is not a mere decorative showpiece. Prior to packaging, our resident Vedic priests perform ritual purification (Shuddhi) with sacred Ganga Jal, followed by planetary mantra chanting to awaken its highest bio-energetic resonance.",
  },
  {
    number: "03",
    title: "The Selenite Cleansing Promise",
    subtitle: "Permanent Vibrational Clarity",
    text: "Because natural crystals absorb atmospheric energies over time, every order from Vastu Adda includes a complimentary Raw Selenite Cleansing Plate. Selenite continuously self-cleanses and resets your stones overnight without needing water or harsh sunlight.",
  },
  {
    number: "04",
    title: "Sacred Integrity & Sourcing",
    subtitle: "Ethical Vedic Craftsmanship",
    text: "We believe true Vastu remedies require spiritual authenticity and material purity. Every sacred crystal, pyramid, and mala is ethically sourced from traditional mining belts and energized with Vedic mantras prior to dispatch.",
  },
];

const consecrationSteps = [
  {
    step: "1",
    title: "Mineral Verification",
    desc: "Raw Pyrite, Citrine, and Rudraksha are laboratory-inspected for authenticity, density, and natural structural integrity.",
  },
  {
    step: "2",
    title: "Sacred Ganga Jal Shuddhi",
    desc: "The minerals undergo ritual washing with sacred river waters and natural herbal extracts to cleanse pre-extraction energetic residues.",
  },
  {
    step: "3",
    title: "Vedic Mantra Chanting",
    desc: "Astrologers chant the Lakshmi, Shiva, or Kuber Gayatri Mantras 108 times over the remedies to awaken positive frequencies.",
  },
  {
    step: "4",
    title: "Selenite Sealed Packaging",
    desc: "Carefully placed in velvet cushioning alongside your Free Raw Selenite Plate and Certificate of Consecration, ready for dispatch.",
  },
];

const testimonials = [
  {
    quote:
      "The Money Magnet pyramid brought an unmistakable shift in our home's atmosphere within two weeks. Their team even reviewed photos of our living room on WhatsApp to recommend the exact spot. That personal care is rare.",
    author: "Meera & Raghav S.",
    city: "Bengaluru",
  },
  {
    quote:
      "I was sceptical about crystals until I placed a Golden Pyrite tree in the north corner of our clinic. Patients regularly comment on the calm vibe of the waiting room now. Exceptional authenticity.",
    author: "Dr. Ananya P.",
    city: "Pune",
  },
  {
    quote:
      "Finding authentic karungali and seven mukhi rudraksha online is hard. Vastu Adda's quality was certified, the beads felt heavy and energised, and delivery to Jaipur was prompt and beautifully packed.",
    author: "Vikramaditya K.",
    city: "Jaipur",
  },
];

function AboutPage() {
  return (
    <div className="bg-background">
      {/* Editorial Luxury Hero */}
      <section className="relative overflow-hidden bg-forest py-20 md:py-28 text-primary-foreground border-b border-gold/30">
        <div className="absolute inset-0 opacity-15">
          <img src={aboutStoreImg} alt="Vastu Adda Heritage" className="h-full w-full object-cover blur-sm" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-card/10 backdrop-blur-md px-4 py-1.5 text-xs font-semibold tracking-widest text-gold uppercase mb-6">
            <span>Ancient Vedic Sourcing Heritage</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.12] text-primary-foreground">
            Ancient Wisdom, Consecrated for Modern Sanctuaries
          </h1>

          <div className="gold-line mx-auto mt-6 w-36" />

          <p className="mt-6 text-base sm:text-lg leading-relaxed text-primary-foreground/85 max-w-2xl mx-auto">
            Vastu Adda was established to bridge five thousand years of sacred Vedic geomancy,
            uncompromised mineralogy, and ritual consecration — so every contemporary Indian home can
            enjoy profound calm, protection, and boundless prosperity.
          </p>

          {/* Quick Credibility Strip */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold uppercase tracking-wider text-gold-soft">
            <div className="rounded-2xl border border-gold/20 bg-primary-foreground/5 p-3.5 backdrop-blur-sm">
              <p className="text-xl font-bold text-gold">21+</p>
              <p className="mt-1 text-[0.68rem] text-primary-foreground/75">Sacred Remedies</p>
            </div>
            <div className="rounded-2xl border border-gold/20 bg-primary-foreground/5 p-3.5 backdrop-blur-sm">
              <p className="text-xl font-bold text-gold">100%</p>
              <p className="mt-1 text-[0.68rem] text-primary-foreground/75">Natural Certified</p>
            </div>
            <div className="rounded-2xl border border-gold/20 bg-primary-foreground/5 p-3.5 backdrop-blur-sm">
              <p className="text-xl font-bold text-gold">Prana Pratishtha</p>
              <p className="mt-1 text-[0.68rem] text-primary-foreground/75">Vedic Consecration</p>
            </div>
            <div className="rounded-2xl border border-gold/20 bg-primary-foreground/5 p-3.5 backdrop-blur-sm">
              <p className="text-xl font-bold text-gold">4.9 / 5.0★</p>
              <p className="mt-1 text-[0.68rem] text-primary-foreground/75">Verified Ratings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Genesis Story: The Disillusionment with Commercial Crystal Trinkets */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border shadow-2xl">
              <img
                src={aboutStoreImg}
                alt="Vastu Adda Sacred Collection"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                width={800}
                height={600}
              />
            </div>
            <div className="absolute -bottom-6 -right-3 sm:-right-6 rounded-2xl border border-gold/40 bg-card p-5 shadow-2xl max-w-xs">
              <p className="eyebrow text-gold-deep">Our Guarantee</p>
              <p className="mt-1 font-display text-lg font-bold text-forest">
                100% Certified Earth Crystals
              </p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Accompanied by Certificate of Consecration &amp; Free Raw Selenite Plate.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <p className="eyebrow text-gold-deep">The Vastu Adda Genesis</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl md:text-[2.6rem] font-bold text-forest leading-tight">
              Why We Refused the Path of Mass-Market Crystal Imitations
            </h2>
            <div className="gold-line mt-4 w-28" />

            <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
              <p>
                Our journey began with a troubling reality: millions of families across India sought
                the ancient peace and abundance promised by Vastu Shastra, but modern e-commerce
                marketplaces were flooded with mass-produced colored glass, heat-treated synthetic stones,
                and cheap plastic orgonite molds made in overseas factories.
              </p>
              <p>
                Crystals sold without authentic geological roots carry zero piezoelectric charge.
                Worse, spiritual items sold without prior Vedic purification (Shuddhi) often arrive
                laden with negative handling residues.
              </p>
              <p>
                We established <strong>Vastu Adda</strong> in Mumbai as an uncompromising
                sanctuary of Vedic authenticity. We source untreated Pyrite, natural Citrine, sacred
                Himalayan 5-Mukhi Rudraksha, and dense Tamil Karungali ebony directly from verified
                artisans and mineral miners. Each remedy is consecrated individually by practicing Vedic
                astrologers before embarking on its journey to your sacred space.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/collections"
                className="rounded-full bg-forest px-8 py-3.5 text-xs font-semibold tracking-wider text-primary-foreground uppercase shadow-md hover:bg-forest/90 transition-all"
              >
                Explore All 21 Remedies
              </Link>
              <a
                href={STORE.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-forest/30 bg-card px-7 py-3.5 text-xs font-semibold tracking-wider text-forest uppercase hover:border-gold hover:text-gold-deep transition-colors"
              >
                Chat with Our Astrologer
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Cardinal Directions of Vastu Living */}
      <section className="bg-secondary/60 py-20 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-gold-deep">Spatial Geomancy</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-forest">
              The Sacred Science of Cardinal Directions
            </h2>
            <div className="gold-line mx-auto mt-4 w-28" />
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              In classical Vedic Vastu Shastra, every cardinal direction is governed by a deity, an
              element (Tattva), and specific vibrational mineral frequencies.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {directions.map((d) => (
              <div
                key={d.direction}
                className="card-lift flex flex-col rounded-3xl border border-border bg-card p-6 shadow-sm hover:border-gold/50 transition-all"
              >
                <p className="font-display text-xl font-bold text-forest">{d.direction}</p>
                <p className="text-xs font-semibold text-gold-deep uppercase tracking-wider mt-0.5">
                  {d.element}
                </p>
                <div className="mt-3 rounded-xl bg-secondary/60 px-3 py-1.5 text-xs font-bold text-forest border border-border/80">
                  Ideal Remedy: {d.remedy}
                </div>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground flex-1">
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Four Pillars of Vastu Adda */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-gold-deep">Our Ethos</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-forest">
            The Four Uncompromising Pillars
          </h2>
          <div className="gold-line mx-auto mt-4 w-28" />
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Every product that leaves our spiritual center embodies these core disciplines of authenticity.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {pillars.map((p) => (
            <div
              key={p.number}
              className="card-lift flex flex-col rounded-3xl border border-border bg-card p-8 shadow-sm hover:border-gold/40 transition-all"
            >
              <div className="flex items-center justify-between border-b border-border/70 pb-4">
                <span className="font-display text-3xl font-bold text-gold-deep">{p.number}</span>
                <span className="rounded-full bg-secondary px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-forest">
                  Verified Principle
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-forest">{p.title}</h3>
              <p className="text-xs font-semibold text-gold-deep mt-0.5">{p.subtitle}</p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Consecration Ritual Process (Prana Pratishtha) */}
      <section className="bg-forest py-20 text-primary-foreground border-y border-gold/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-gold">Sacred Transparency</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground">
              The 4-Step Consecration Ritual
            </h2>
            <div className="gold-line mx-auto mt-4 w-28" />
            <p className="mt-4 text-sm text-primary-foreground/80 leading-relaxed">
              How every single remedy is prepared before it ever reaches your doorway.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {consecrationSteps.map((s) => (
              <div
                key={s.step}
                className="relative rounded-3xl border border-gold/30 bg-primary-foreground/5 p-6 backdrop-blur-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold font-display text-xl font-bold text-forest shadow-md">
                  {s.step}
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-primary-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-primary-foreground/75">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voices of Serenity - Styled exactly as user uploaded screenshot */}
      <section className="bg-background py-20 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-gold-deep tracking-[0.25em]">TESTIMONIALS</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold text-forest">
              Voices of Serenity
            </h2>
            <div className="gold-line mx-auto mt-4 w-28" />
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Real stories from homes and workspaces transformed by mindful Vastu placement.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, idx) => (
              <figure
                key={idx}
                className="card-lift flex flex-col justify-between rounded-3xl border border-border bg-card p-8 shadow-sm hover:border-gold/40 transition-all"
              >
                <div>
                  {/* 5 Gold Stars */}
                  <div className="flex gap-1 text-gold text-sm" aria-hidden="true">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>

                  {/* Italicized Quote */}
                  <blockquote className="mt-5 text-sm sm:text-[0.92rem] leading-relaxed italic text-foreground/85 font-body">
                    "{t.quote}"
                  </blockquote>
                </div>

                <figcaption className="mt-8 border-t border-border/70 pt-5 flex items-center justify-between">
                  <div>
                    <p className="font-display text-base font-bold text-forest">{t.author}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.city}</p>
                  </div>
                  <span className="rounded-full bg-emerald-100 text-emerald-800 text-[0.65rem] font-bold uppercase tracking-wider px-2.5 py-1">
                    VERIFIED BUYER
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Sacred Sanctuary CTA */}
      <section className="bg-forest py-20 text-primary-foreground border-t border-gold/30">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="eyebrow text-gold">Sacred Living</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold text-primary-foreground">
            Transform Your Living Space
          </h2>
          <div className="gold-line mx-auto mt-4 w-28" />
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-primary-foreground/85 max-w-2xl mx-auto">
            Explore our curated catalog of 21 authentic earth crystals, Himalayan malas, and orgonite pyramids, each consecrated to awaken positive frequencies in your home.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/collections"
              className="rounded-full bg-gold px-8 py-3.5 text-xs font-bold tracking-widest text-forest uppercase shadow-xl hover:bg-gold-deep hover:text-primary-foreground transition-all"
            >
              Shop All 21 Products
            </Link>
            <a
              href={STORE.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-primary-foreground/40 bg-primary-foreground/10 px-8 py-3.5 text-xs font-semibold tracking-wider text-primary-foreground uppercase hover:border-gold hover:text-gold transition-colors"
            >
              Order Support on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
