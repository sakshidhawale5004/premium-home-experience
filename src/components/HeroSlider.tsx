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
    slug: "crystal-trees",
    image: treeImg,
  },
  {
    eyebrow: "Orgonite Crystal Pyramids",
    title: "Attract Wealth,\nAmplify Every Intention",
    subtitle:
      "High-clarity orgonite pyramids layered with pyrite and sacred copper coils to channel divine Lakshmi frequencies.",
    cta: "Explore Pyramids",
    slug: "crystal-pyramids",
    image: pyramidImg,
  },
  {
    eyebrow: "Energized Crystal Bracelets",
    title: "Wear Your Intentions,\nCarry Your Power",
    subtitle:
      "Pyrite, Tiger Eye, South Indian Karungali, and Rudraksha wristbands — sacred protection for modern everyday life.",
    cta: "Explore Bracelets",
    slug: "crystal-bracelets",
    image: braceletsImg,
  },
  {
    eyebrow: "Sacred Rudraksha Malas",
    title: "Vedic Energy,\nEveryday Grace",
    subtitle:
      "Authentic 108-bead Himalayan rudraksha malas interwoven with pyrite, tiger eye, sphatik, and ebony wood.",
    cta: "Explore Malas",
    slug: "malas",
    image: malaImg,
  },
  {
    eyebrow: "Vastu Shastra Remedies",
    title: "Harmonise Your Space,\nElevate Your Life",
    subtitle:
      "Solid pyrite tortoises, talismans and protective charms placed with deliberate Vedic alignment.",
    cta: "Explore Vastu Remedies",
    slug: "vastu-products",
    image: vastuImg,
  },
];

export function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];

  return (
    <section
      className="relative min-h-[580px] w-full overflow-hidden bg-forest sm:min-h-[640px] md:min-h-[680px]"
      aria-label="Featured collections slider"
    >
      {/* Background Images */}
      {slides.map((s, i) => (
        <div
          key={s.title}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <img
            src={s.image}
            alt=""
            loading={i === 0 ? "eager" : "lazy"}
            width={1920}
            height={1080}
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest/95 via-forest/80 to-transparent sm:via-forest/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent" />
        </div>
      ))}

      {/* Slide Content */}
      <div className="relative z-10 mx-auto flex min-h-[580px] max-w-7xl items-center px-4 py-16 sm:min-h-[640px] sm:px-6 md:min-h-[680px]">
        <div className="max-w-2xl">
          <p className="eyebrow text-gold transition-all duration-500">
            {slide.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-primary-foreground sm:text-5xl md:text-6xl whitespace-pre-line drop-shadow-sm">
            {slide.title}
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            {slide.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/collections/$slug"
              params={{ slug: slide.slug }}
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
                key={s.title}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}: ${s.title}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-gold" : "w-2 bg-primary-foreground/40 hover:bg-primary-foreground/70"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
              aria-label="Previous slide"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/20 bg-forest/40 text-primary-foreground backdrop-blur-sm transition-colors hover:bg-forest hover:text-gold"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % slides.length)}
              aria-label="Next slide"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/20 bg-forest/40 text-primary-foreground backdrop-blur-sm transition-colors hover:bg-forest hover:text-gold"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
