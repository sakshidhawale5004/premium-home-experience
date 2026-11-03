import { useEffect, useState } from "react";
import pyramidImg from "@/assets/hero-pyramid.jpg";
import braceletsImg from "@/assets/hero-bracelets.jpg";
import treeImg from "@/assets/hero-tree.jpg";
import malaImg from "@/assets/hero-mala.jpg";
import vastuImg from "@/assets/hero-vastu.jpg";
import { STORE } from "@/data/products";

const slides = [
  {
    eyebrow: "Crystal Pyramids",
    title: "Attract Wealth,\nAmplify Every Intention",
    subtitle:
      "Hand-crafted orgonite and crystal pyramids that channel abundance and protect your space.",
    cta: "Explore Pyramids",
    href: "https://vastuadda.com/product-category/crystal-pyramid/",
    image: pyramidImg,
  },
  {
    eyebrow: "Crystal Bracelets",
    title: "Wear Your Intentions,\nCarry Your Power",
    subtitle:
      "Pyrite, tiger eye, karungali and rudraksh bracelets — energised beads for daily life.",
    cta: "Explore Bracelets",
    href: "https://vastuadda.com/product-category/crytal-bracelets/",
    image: braceletsImg,
  },
  {
    eyebrow: "Crystal Trees",
    title: "Grow Prosperity,\nBranch by Branch",
    subtitle:
      "Citrine, pyrite and seven chakra gemstone trees that root positivity deep in your home.",
    cta: "Explore Trees",
    href: "https://vastuadda.com/product-category/crytal-tree/",
    image: treeImg,
  },
  {
    eyebrow: "Rudraksh Malas",
    title: "Sacred Energy,\nEveryday Grace",
    subtitle:
      "Authentic rudraksh malas blended with tiger eye, pyrite, quartz and karungali.",
    cta: "Explore Malas",
    href: "https://vastuadda.com/product-category/mala/",
    image: malaImg,
  },
  {
    eyebrow: "Vastu Products",
    title: "Harmonise Your Space,\nElevate Your Life",
    subtitle:
      "Time-tested Vastu remedies — tortoises, key chains and yantras placed with purpose.",
    cta: "Explore Vastu",
    href: "https://vastuadda.com/product-category/vastu-product/",
    image: vastuImg,
  },
];

export function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const go = (next: number) => setIndex((next + slides.length) % slides.length);
  const slide = slides[index];

  if (!slide) {
    return null;
  }

  return (
    <section className="relative h-[560px] overflow-hidden bg-forest md:h-[640px]">
      {slides.map((s, i) => (
        <div
          key={s.eyebrow}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <img
            src={s.image}
            alt={s.eyebrow}
            className={`h-full w-full object-cover ${i === index ? "hero-zoom" : ""}`}
            loading={i === 0 ? "eager" : "lazy"}
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        </div>
      ))}

      <div className="relative mx-auto flex h-full max-w-7xl items-center px-4">
        <div key={index} className="fade-up max-w-2xl">
          <p className="eyebrow flex items-center gap-3 text-gold-deep">
            <span className="inline-block h-px w-10 bg-gold" />
            {slide.eyebrow}
          </p>
          <h1 className="mt-4 whitespace-pre-line font-display text-5xl font-semibold leading-[1.05] text-forest md:text-6xl">
            {slide.title}
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-foreground/75">
            {slide.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={slide.href}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium tracking-wide text-primary-foreground transition-all hover:bg-forest/90 hover:shadow-lg"
            >
              {slide.cta}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href={STORE.whatsapp}
              className="inline-flex items-center gap-2 rounded-full border border-forest/30 bg-card/70 px-7 py-3.5 text-sm font-medium tracking-wide text-forest backdrop-blur transition-colors hover:border-gold hover:text-gold-deep"
            >
              Book a Consultation
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 md:left-auto md:right-10 md:translate-x-0">
        {slides.map((s, i) => (
          <button
            key={s.eyebrow}
            type="button"
            onClick={() => go(i)}
            aria-label={`Slide ${i + 1}: ${s.eyebrow}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === index ? "w-10 bg-gold" : "w-4 bg-foreground/25 hover:bg-foreground/45"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
