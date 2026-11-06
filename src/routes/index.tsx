import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSlider } from "@/components/HeroSlider";
import { ProductCard } from "@/components/ProductCard";
import { products, collections, categoryLinks, STORE } from "@/data/products";
import { blogPosts, testimonials } from "@/data/content";
import { useShop, inr } from "@/lib/shop";
import pyramidImg from "@/assets/hero-pyramid.jpg";
import braceletsImg from "@/assets/hero-bracelets.jpg";
import treeImg from "@/assets/hero-tree.jpg";
import malaImg from "@/assets/hero-mala.jpg";
import vastuImg from "@/assets/hero-vastu.jpg";
import aboutStoreImg from "@/assets/about-store.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Vastu Adda | Premium Authentic Vastu Products, Crystals & Sacred Remedies",
      },
      {
        name: "description",
        content:
          "Explore 21 lab-certified crystal trees, pyramids, energized rudraksh malas, and natural gemstone bracelets. Includes Free Raw Selenite Plate, Vedic Astrologer Consecration, and Pan-India Free Delivery.",
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

const powerCombos = [
  {
    title: "The Ultimate Wealth Magnet Duo",
    badge: "Most Popular Combo",
    desc: "Golden Pyrite Bonsai Tree paired with Money Magnet Orgonite Pyramid for complete home and office abundance currents.",
    item1Slug: "pyrite-tree",
    item2Slug: "money-magnet-pyramid",
    comboPrice: 1399,
    mrp: 2998,
    savings: 1599,
  },
  {
    title: "The Shiva-Murugan Double Shield",
    badge: "Supreme Protection",
    desc: "South Indian Karungali Ebony Bracelet combined with Sacred 5-Mukhi Himalayan Rudraksha Tree for impenetrable peace.",
    item1Slug: "karungali-bracelet",
    item2Slug: "rudraksh-tree",
    comboPrice: 1199,
    mrp: 2498,
    savings: 1299,
  },
  {
    title: "The Merchant's Daily Prosperity Set",
    badge: "Business Essential",
    desc: "Sun-kissed Citrine Abundance Tree for billing counters paired with a Golden Pyrite Key Chain for vehicle and locker keys.",
    item1Slug: "citrine-tree",
    item2Slug: "pyrite-key-chain",
    comboPrice: 1099,
    mrp: 2398,
    savings: 1299,
  },
];

const zodiacSigns = [
  {
    sign: "Aries (Mesha)",
    sanskrit: "मेष",
    symbol: "♈",
    planet: "Mars (Mangal)",
    element: "Fire",
    recommendation: "Karungali Ebony Bracelet",
    slug: "karungali-bracelet",
    reason: "Mars governs fiery leadership and physical vitality. Karungali wood cools excess aggression while anchoring mental fortitude and spiritual protection.",
  },
  {
    sign: "Taurus (Vrishabha)",
    sanskrit: "वृषभ",
    symbol: "♉",
    planet: "Venus (Shukra)",
    element: "Earth",
    recommendation: "Natural Citrine Abundance Tree",
    slug: "citrine-tree",
    reason: "Governed by Shukra, Taureans thrive in sensory luxury and financial stability. Citrine radiates the radiant solar energy that amplifies lasting wealth.",
  },
  {
    sign: "Gemini (Mithuna)",
    sanskrit: "मिथुन",
    symbol: "♊",
    planet: "Mercury (Budh)",
    element: "Air",
    recommendation: "Dhan Yog Tree & Rudraksha",
    slug: "dhan-yog-tree",
    reason: "Budh rules quick intellect and commerce. The Dhan Yog Tree channels erratic mental energy into concentrated wealth-building deals and business breakthroughs.",
  },
  {
    sign: "Cancer (Karka)",
    sanskrit: "कर्क",
    symbol: "♋",
    planet: "Moon (Chandra)",
    element: "Water",
    recommendation: "Rudraksh with Clear Quartz Mala",
    slug: "rudraksh-with-clear-quartz",
    reason: "Sensitive lunar currents require emotional stability and psychic shields. Pure Sphatik (Clear Quartz) cools anxiety and harmonizes domestic relationships.",
  },
  {
    sign: "Leo (Simha)",
    sanskrit: "सिंह",
    symbol: "♌",
    planet: "Sun (Surya)",
    element: "Fire",
    recommendation: "Golden Pyrite Wealth Tree",
    slug: "pyrite-tree",
    reason: "Leo is the royal solar sign. Golden Pyrite acts as a direct conduit for Surya-Tej, projecting unmistakable charisma, commanding presence, and prosperity.",
  },
  {
    sign: "Virgo (Kanya)",
    sanskrit: "कन्या",
    symbol: "♍",
    planet: "Mercury (Budh)",
    element: "Earth",
    recommendation: "Dhanlabh Orgonite Pyramid",
    slug: "dhanlabh-pyramid",
    reason: "Virgos are analytical and meticulous. The sacred geometry of Dhanlabh Pyramid filters out environmental noise and anchors productive enterprise.",
  },
  {
    sign: "Libra (Tula)",
    sanskrit: "तुला",
    symbol: "♎",
    planet: "Venus (Shukra)",
    element: "Air",
    recommendation: "7 Chakra Alignment Tree",
    slug: "7-chakra-tree",
    reason: "The seeker of cosmic equilibrium. The 7 Chakra Tree balances all energy vortexes to ensure harmonious partnerships and aesthetic peace in the home.",
  },
  {
    sign: "Scorpio (Vrishchika)",
    sanskrit: "वृश्चिक",
    symbol: "♏",
    planet: "Mars (Mangal / Ketu)",
    element: "Water",
    recommendation: "Karungali Rudraksh Combo Bracelet",
    slug: "karungali-rudraksh-combo-bracelets",
    reason: "Scorpios possess intense transformative power. Karungali wood neutralizes negative projections (Nazar) while 5-Mukhi Rudraksha anchors spiritual peace.",
  },
  {
    sign: "Sagittarius (Dhanu)",
    sanskrit: "धनु",
    symbol: "♐",
    planet: "Jupiter (Brihaspati)",
    element: "Fire",
    recommendation: "Natural Citrine Abundance Tree",
    slug: "citrine-tree",
    reason: "Ruled by the guru of wisdom and boundless expansion. Golden Citrine reflects Jupiterian prosperity, higher learning, and benevolent fortune.",
  },
  {
    sign: "Capricorn (Makara)",
    sanskrit: "मकर",
    symbol: "♑",
    planet: "Saturn (Shani)",
    element: "Earth",
    recommendation: "Rudraksh with Karungali Mala",
    slug: "rudraksh-with-karungali-mala",
    reason: "Saturn demands discipline, patience, and karmic integrity. Karungali and Himalayan Rudraksha offer Shani-Shanti, removing career delays and hurdles.",
  },
  {
    sign: "Aquarius (Kumbha)",
    sanskrit: "कुम्भ",
    symbol: "♒",
    planet: "Saturn (Shani / Rahu)",
    element: "Air",
    recommendation: "Money Magnet Orgonite Pyramid",
    slug: "money-magnet-pyramid",
    reason: "Visionary and unconventional, Aquarians excel when electromagnetic disturbances are grounded. The Money Magnet Pyramid anchors visionary concepts into wealth.",
  },
  {
    sign: "Pisces (Meena)",
    sanskrit: "मीन",
    symbol: "♓",
    planet: "Jupiter (Brihaspati)",
    element: "Water",
    recommendation: "Pyrite Tortoise for North Corner",
    slug: "pyrite-tortoise",
    reason: "Pisces is intuitive and receptive. The sacred Kurma (Tortoise) carved in golden pyrite anchors water-element blessings, steady longevity, and peaceful prosperity.",
  },
];

const trustItems = [
  {
    title: "100% Certified Crystals",
    text: "Genuine lab-tested earth crystals and Himalayan rudraksha",
  },
  {
    title: "Vedic Astrologer Energized",
    text: "Pre-consecrated with sacred mantras before dispatch",
  },
  {
    title: "Free Selenite Plate with Every Order",
    text: "Self-cleansing raw plate included with your purchase",
  },
  {
    title: "Pan India Free Shipping & COD",
    text: "Fast doorstep delivery with Cash on Delivery across all pincodes",
  },
];

const customerSpaces = [
  {
    title: "Executive Corner at DLF CyberCity",
    city: "Gurugram, Haryana",
    remedyName: "Golden Pyrite Bonsai Tree",
    slug: "pyrite-tree",
    quote:
      "Our closing rate on major enterprise deals visibly accelerated after placing this in the North corner of our conference room. Colleagues constantly compliment its rich golden sparkle.",
    owner: "Siddharth M., Managing Director",
  },
  {
    title: "Penthouse Living Room at Prestige Golfshire",
    city: "Bengaluru, Karnataka",
    remedyName: "Money Magnet Orgonite Pyramid",
    slug: "money-magnet-pyramid",
    quote:
      "The atmosphere feels tangibly lighter and calmer. It effortlessly anchors our modern interior while keeping high vibrations alive. Zero doubts on authenticity.",
    owner: "Dr. Rohini & Sameer V.",
  },
  {
    title: "Pooja Sanctuary & Japa Nook",
    city: "Vile Parle, Mumbai",
    remedyName: "Rudraksh with Clear Quartz Mala",
    slug: "rudraksh-with-clear-quartz",
    quote:
      "The combination of natural Sphatik quartz and 5-Mukhi Himalayan Rudraksha has transformed my morning meditation. The beads feel heavy, authentic, and cooling.",
    owner: "Kavita R., Architect & Yoga Teacher",
  },
  {
    title: "Daily Wristwear at Financial District",
    city: "Hyderabad, Telangana",
    remedyName: "Karungali Ebony Bracelet",
    slug: "karungali-bracelet",
    quote:
      "Worn every day with my watch. The black ebony wood has a natural dense weight that grounds my energy during high-stress board meetings. The Selenite plate cleanses it overnight.",
    owner: "Abhishek N., Venture Capitalist",
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
  {
    q: "How do I know which direction to place my crystal tree or pyramid?",
    a: "As a general guideline: Golden Pyrite and wealth trees go in the North (Kuber) or South-East (Lakshmi) zones; Evil Eye trees belong near your main entrance; and Rudraksha showpieces belong in your Pooja room or North-East (Ishanya). You can also WhatsApp us a simple photo of your room for tailored placement advice.",
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
  const { add, setCartOpen } = useShop();
  const [selectedHomeCat, setSelectedHomeCat] = useState<string>("All");

  // Rashi state
  const [activeRashiIndex, setActiveRashiIndex] = useState<number>(0);

  // VIP Newsletter state
  const [emailInput, setEmailInput] = useState<string>("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);
  const [couponCopied, setCouponCopied] = useState<boolean>(false);

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const homeFilteredProducts =
    selectedHomeCat === "All"
      ? products
      : products.filter((p) => p.category === selectedHomeCat);

  const handleAddCombo = (slug1: string, slug2: string) => {
    add(slug1, 1);
    add(slug2, 1);
    setCartOpen(true);
  };

  // Active Rashi lookup
  const activeRashi = zodiacSigns[activeRashiIndex];
  const rashiRecommendedProduct =
    products.find((p) => p.slug === activeRashi.slug) ?? products[0];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setNewsletterSubscribed(true);
    }
  };

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText("VASTU100");
    setCouponCopied(true);
    setTimeout(() => setCouponCopied(false), 2500);
  };

  return (
    <div>
      <HeroSlider />

      {/* Customer favourites (Bestsellers) */}
      <section className="py-12 sm:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-3 sm:px-6">
          <SectionHeading
            eyebrow="Top Rated Essentials"
            title="Customer Favourites &amp; Bestsellers"
            subtitle="Our most-loved Vastu and crystal remedies, chosen again and again by thousands of households across India."
          />
          <div className="mt-8 sm:mt-12 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
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

      {/* Complete Collection (All 21 Products with Filter Tabs) */}
      <section id="collection" className="bg-secondary/40 py-20 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
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

          <div className="mt-8 sm:mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            {homeFilteredProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Sacred Power Combos (Synergy Duos) */}
      <section className="bg-secondary/60 py-20 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Harmonious Synergies"
            title="Featured Sacred Power Pairs"
            subtitle="Ancient Vastu recommends pairing grounding protection with active wealth attractors to prevent energetic drain."
          />

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {powerCombos.map((combo) => {
              const p1 = products.find((p) => p.slug === combo.item1Slug);
              const p2 = products.find((p) => p.slug === combo.item2Slug);

              return (
                <div
                  key={combo.title}
                  className="card-lift flex flex-col justify-between rounded-3xl border border-gold/40 bg-card p-6 shadow-md hover:border-gold transition-all"
                >
                  <div>
                    <span className="rounded-full bg-gold/20 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-gold-deep">
                      {combo.badge}
                    </span>
                    <h3 className="mt-3 font-display text-2xl font-bold text-forest leading-snug">
                      {combo.title}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      {combo.desc}
                    </p>

                    {/* Duo Image Thumbnails */}
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      {p1 && (
                        <div className="rounded-2xl border border-border overflow-hidden bg-secondary p-1">
                          <img src={p1.image} alt={p1.name} className="aspect-square w-full object-cover rounded-xl" />
                          <p className="mt-1.5 text-[0.72rem] font-semibold text-forest truncate px-1">{p1.name}</p>
                        </div>
                      )}
                      {p2 && (
                        <div className="rounded-2xl border border-border overflow-hidden bg-secondary p-1">
                          <img src={p2.image} alt={p2.name} className="aspect-square w-full object-cover rounded-xl" />
                          <p className="mt-1.5 text-[0.72rem] font-semibold text-forest truncate px-1">{p2.name}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 border-t border-border pt-4">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="font-display text-2xl font-bold text-forest">{inr(combo.comboPrice)}</span>
                        <span className="ml-2 text-xs text-muted-foreground line-through">{inr(combo.mrp)}</span>
                      </div>
                      <span className="rounded-full bg-forest px-2.5 py-0.5 text-[0.65rem] font-bold text-primary-foreground">
                        Save {inr(combo.savings)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddCombo(combo.item1Slug, combo.item2Slug)}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-forest py-3 text-xs font-bold tracking-wider text-primary-foreground uppercase shadow transition-all hover:bg-forest/90 active:scale-98"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="9" cy="20" r="1.4" />
                        <circle cx="17" cy="20" r="1.4" />
                        <path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.3h7.9a1.5 1.5 0 0 0 1.5-1.2L20 8H6" />
                      </svg>
                      <span>Add Pair to Cart</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* NEW SECTION B: Interactive Rashi (Zodiac) Gemstone & Crystal Finder */}
      <section className="bg-background py-20 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Kundali & Planetary Harmony"
            title="Shop by Your Rashi (Moon Sign)"
            subtitle="Every zodiac sign is governed by a planetary ruler that resonates with specific minerals, sacred woods, and organic geometry."
          />

          {/* 12 Rashi Buttons Grid */}
          <div className="mt-10 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3">
            {zodiacSigns.map((z, idx) => (
              <button
                key={z.sign}
                type="button"
                onClick={() => setActiveRashiIndex(idx)}
                className={`rounded-2xl border p-3 text-center transition-all ${
                  activeRashiIndex === idx
                    ? "border-forest bg-forest text-primary-foreground shadow-md scale-102"
                    : "border-border bg-card text-foreground/85 hover:border-gold/60 hover:bg-secondary/50"
                }`}
              >
                <span className="text-2xl block">{z.symbol}</span>
                <span className="font-display text-xs font-bold mt-1 block truncate">
                  {z.sign.split(" ")[0]}
                </span>
                <span className="text-[0.65rem] opacity-75 block">{z.sanskrit}</span>
              </button>
            ))}
          </div>

          {/* Active Rashi Spotlight Card */}
          <div className="mt-8 rounded-3xl border border-gold/40 bg-secondary/30 p-6 md:p-10 shadow-lg">
            <div className="grid gap-8 lg:grid-cols-12 items-center">
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="rounded-full bg-gold/20 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-gold-deep">
                    {activeRashi.sanskrit} • {activeRashi.sign}
                  </span>
                  <span className="rounded-full bg-secondary px-3 py-1 text-[0.68rem] font-semibold text-muted-foreground border border-border">
                    Ruler: {activeRashi.planet}
                  </span>
                  <span className="rounded-full bg-secondary px-3 py-1 text-[0.68rem] font-semibold text-muted-foreground border border-border">
                    Element: {activeRashi.element}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-forest">
                  Ideal Remedy: {activeRashi.recommendation}
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {activeRashi.reason}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      add(rashiRecommendedProduct.slug, 1);
                      setCartOpen(true);
                    }}
                    className="rounded-full bg-forest px-6 py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow hover:bg-forest/90 transition-all active:scale-98"
                  >
                    Add {rashiRecommendedProduct.name} to Cart ({inr(rashiRecommendedProduct.price)})
                  </button>
                  <Link
                    to="/products/$slug"
                    params={{ slug: rashiRecommendedProduct.slug }}
                    className="rounded-full border border-forest/30 bg-card px-5 py-3 text-xs font-semibold text-forest uppercase hover:bg-secondary transition-colors"
                  >
                    View Specifications
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <div className="rounded-2xl border border-gold/40 bg-card p-4 shadow-md max-w-xs text-center">
                  <img
                    src={rashiRecommendedProduct.image}
                    alt={rashiRecommendedProduct.name}
                    className="aspect-square w-full rounded-xl object-cover border border-border"
                  />
                  <p className="mt-3 font-display text-sm font-bold text-forest truncate">
                    {rashiRecommendedProduct.name}
                  </p>
                  <p className="text-xs text-gold-deep font-bold mt-0.5">
                    Includes Free Selenite Plate
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="bg-background py-20 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
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
        </div>
      </section>

      {/* NEW SECTION D: The Sacred Corner - Real Customer Spaces & Styling */}
      <section className="bg-background py-20 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Sacred Corners in Real Homes"
            title="Where High Energy Resides"
            subtitle="See how discerning homeowners, founders, and seekers style and position Vastu Adda remedies across India."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {customerSpaces.map((cs) => {
              const product = products.find((p) => p.slug === cs.slug);
              return (
                <div
                  key={cs.title}
                  className="card-lift flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-sm hover:border-gold/50 transition-all"
                >
                  <div>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-secondary border border-border">
                      {product && (
                        <img
                          src={product.image}
                          alt={cs.title}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="mt-4">
                      <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[0.65rem] font-bold text-forest border border-border">
                        {cs.city}
                      </span>
                      <h4 className="mt-2 font-display text-lg font-bold text-forest leading-snug">
                        {cs.title}
                      </h4>
                      <p className="mt-1 text-xs font-semibold text-gold-deep">
                        Remedy: {cs.remedyName}
                      </p>
                      <p className="mt-3 text-xs text-muted-foreground italic leading-relaxed">
                        "{cs.quote}"
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-border/80 pt-3">
                    <p className="text-[0.72rem] font-bold text-forest">{cs.owner}</p>
                    <p className="text-[0.65rem] text-muted-foreground">Verified Vastu Placement</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Vastu Adda Section */}
      <section className="bg-secondary/40 py-20">
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

      {/* Trust strip */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4 sm:px-6">
          {trustItems.map((t) => (
            <div key={t.title} className="sm:border-l sm:border-border sm:pl-6 first:border-0 first:pl-0">
              <p className="font-display text-base sm:text-lg font-semibold text-forest tracking-tight">{t.title}</p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Voices of Serenity - Testimonials */}
      <section className="bg-background py-20 border-t border-border">
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
            {[
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
            ].map((t, idx) => (
              <figure
                key={idx}
                className="card-lift flex flex-col justify-between rounded-3xl border border-border bg-card p-8 shadow-sm hover:border-gold/40 transition-all"
              >
                <div>
                  <div className="flex gap-1 text-gold text-sm" aria-hidden="true">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>

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

      {/* FAQ Accordion Section */}
      <section className="bg-secondary/40 py-16 border-t border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Helpful Knowledge"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about our remedies, consecration, and delivery."
          />
          <div className="mt-10 space-y-3">
            {faqs.map((f, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div
                  key={i}
                  className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-gold/50"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(i)}
                    className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-secondary/30"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-base sm:text-lg font-semibold text-forest pr-4">
                      {f.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? "rotate-180 bg-forest text-primary-foreground"
                          : "bg-secondary text-forest"
                      }`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-border/60 bg-secondary/15 px-5 py-4 text-xs sm:text-sm leading-relaxed text-muted-foreground animate-in fade-in duration-200">
                      <p>{f.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* NEW SECTION E: VIP Sanctum & Astrological Transit Club (Newsletter & Moon Calendar Alerts) */}
      <section className="bg-secondary/60 py-20 border-t border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-3xl border border-gold/40 bg-card p-8 sm:p-12 text-center shadow-xl relative overflow-hidden">
            <div className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gold-deep mb-3">
              <span>✦</span>
              <span>The Vastu Adda Sanctum</span>
            </div>
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-forest">
              Receive Vedic Moon &amp; Muhurat Alerts
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Join 25,000+ conscious homeowners. Get notified on upcoming Purnima and Amavasya crystal cleansing dates, auspicious Griha Pravesh muhurats, and receive an instant ₹100 welcome gift.
            </p>

            {!newsletterSubscribed ? (
              <form onSubmit={handleSubscribe} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="flex-1 rounded-full border border-border bg-background px-5 py-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none shadow-inner"
                />
                <button
                  type="submit"
                  className="rounded-full bg-forest px-7 py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow hover:bg-forest/90 transition-all shrink-0"
                >
                  Join Sanctum
                </button>
              </form>
            ) : (
              <div className="mt-8 rounded-2xl border border-emerald-500/40 bg-emerald-50/60 dark:bg-emerald-950/30 p-6 max-w-md mx-auto">
                <p className="font-display text-lg font-bold text-emerald-800 dark:text-emerald-200">
                  Welcome to the Sanctum!
                </p>
                <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                  Here is your ₹100 welcome privilege code for your first consecrated remedy:
                </p>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className="font-mono text-base font-bold bg-card border border-emerald-500/50 px-4 py-1.5 rounded-lg text-forest tracking-wider">
                    VASTU100
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCoupon}
                    className="rounded-lg bg-forest px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-forest/90"
                  >
                    {couponCopied ? "Copied! ✓" : "Copy"}
                  </button>
                </div>
              </div>
            )}

            <p className="mt-4 text-[0.7rem] text-muted-foreground">
              No spam, ever. Unsubscribe with a single click anytime.
            </p>
          </div>
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
            Browse our full catalog of 21 certified products or connect with our customer support
            team on WhatsApp for order inquiries.
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
              Order Support on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
