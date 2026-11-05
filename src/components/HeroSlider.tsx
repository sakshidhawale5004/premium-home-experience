import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import pyramidImg from "@/assets/hero-pyramid.jpg";
import braceletsImg from "@/assets/hero-bracelets.jpg";
import treeImg from "@/assets/hero-tree.jpg";
import malaImg from "@/assets/hero-mala.jpg";
import vastuImg from "@/assets/hero-vastu.jpg";
import { STORE } from "@/data/products";

const slides = [
  {
    eyebrow: "Sacred Crystal Trees",
    title: "Grow Prosperity,\nBranch by Branch",
    subtitle:
      "Citrine, Pyrite, 7 Chakra and Rudraksha trees that anchor auspicious wealth and peace in your home.",
    cta: "Explore Crystal Trees",
    href: "/collections/crystal-trees",
    image: treeImg,
  },
  {
    eyebrow: "Orgonite Crystal Pyramids",
    title: "Attract Wealth,\nAmplify Every Intention",
    subtitle:
      "High-clarity orgonite pyramids layered with pyrite and sacred copper coils to channel divine Lakshmi frequencies.",
    cta: "Explore Pyramids",
    href: "/collections/crystal-pyramids",
    image: pyramidImg,
  },
  {
    eyebrow: "Energized Crystal Bracelets",
    title: "Wear Your Intentions,\nCarry Your Power",
    subtitle:
      "Pyrite, Tiger Eye, South Indian Karungali, and Rudraksha wristbands — sacred protection for modern everyday life.",
    cta: "Explore Bracelets",
    href: "/collections/crystal-bracelets",
    image: braceletsImg,
  },
  {
    eyebrow: "Sacred Rudraksha Malas",
    title: "Vedic Energy,\nEveryday Grace",
    subtitle:
      "Authentic 108-bead Himalayan rudraksha malas interwoven with pyrite, tiger eye, sphatik, and ebony wood.",
    cta: "Explore Malas",
    href: "/collections/malas",
    image: malaImg,
  },
  {
    eyebrow: "Vastu Shastra Remedies",
    title: "Harmonise Your Space,\nElevate Your Life",
    subtitle:
      "Solid pyrite tortoises, talismans and protective charms placed with deliberate Vedic alignment.",
    cta: "Explore Vastu Remedies",
    href: "/collections/vastu-products",
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
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        </div>
      ))}

      <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6">
        <div key={index} className="fade-up max-w-2xl">
          <p className="eyebrow flex items-center gap-3 text-gold-deep">
            <span className="inline-block h-px w-10 bg-gold" />
            {slide.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.12] text-forest sm:text-5xl md:text-6xl whitespace-pre-line">
            {slide.title}
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            {slide.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to={slide.href}
              className="inline-flex items-center gap-2 rounded-full bg-forest px-8 py-3.5 text-xs font-semibold tracking-wider text-primary-foreground transition-all hover:bg-forest/90 hover:scale-[1.02] shadow-lg"
            >
              <span>{slide.cta}</span>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href={STORE.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-forest/30 bg-card/60 backdrop-blur-sm px-6 py-3.5 text-xs font-semibold tracking-wider text-forest transition-colors hover:border-gold hover:text-gold-deep"
            >
              <span>Vedic Consultation</span>
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Indicators & Arrows */}
      <div className="absolute bottom-6 left-0 right-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex gap-2">
            {slides.map((s, i) => (
              <button
                key={s.eyebrow}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 transition-all rounded-full ${
                  i === index ? "w-8 bg-gold-deep" : "w-2 bg-foreground/30 hover:bg-foreground/50"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous slide"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 text-foreground backdrop-blur-sm transition-colors hover:bg-secondary hover:text-forest"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m15 19-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 text-foreground backdrop-blur-sm transition-colors hover:bg-secondary hover:text-forest"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
