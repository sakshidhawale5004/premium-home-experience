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
      className="relative min-h-[580px] w-full overflow-hidden bg-black sm:min-h-[640px] md:min-h-[680px]"
      aria-label="Featured collections slider"
    >
      {/* Background Images with Black Gradient Lighting */}
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
          {/* Obsidian Black Gradients for Maximum Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/30 sm:via-black/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/50" />
        </div>
      ))}

      {/* Slide Content with High-Visibility Typography */}
      <div className="relative z-10 mx-auto flex min-h-[580px] max-w-7xl items-center px-4 py-16 sm:min-h-[640px] sm:px-6 md:min-h-[680px]">
        <div className="max-w-2xl">
          {/* Eyebrow in glowing gold */}
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-black/60 px-4 py-1 backdrop-blur-md">
            <span className="text-gold text-xs">✦</span>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
              {slide.eyebrow}
            </p>
          </div>

          {/* Crisp, ultra-visible white headline with subtle drop-shadow */}
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.12] text-white sm:text-5xl md:text-6xl whitespace-pre-line drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            {slide.title}
          </h1>

          {/* Subtitle in bright, clear off-white for effortless legibility */}
          <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-100 sm:text-lg font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {slide.subtitle}
          </p>

          {/* High-Contrast Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/collections/$slug"
              params={{ slug: slide.slug }}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-xs font-bold tracking-wider text-black uppercase transition-all hover:bg-gold-deep hover:text-white hover:scale-[1.02] shadow-[0_4px_20px_rgba(212,175,55,0.4)] active:scale-98"
            >
              <span>{slide.cta}</span>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            <a
              href={STORE.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-black/40 backdrop-blur-md px-7 py-3.5 text-xs font-semibold tracking-wider text-white uppercase transition-all hover:bg-white hover:text-black hover:border-white shadow-lg"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-emerald-400" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.5 14.1c-.2.7-1.3 1.3-1.9 1.3-.5 0-1.1.1-3.4-.9-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.6-1.1-3s.7-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .7.5s.9 2.1 1 2.2c0 .1.1.3 0 .5-.4.8-.9.9-.6 1.4.5.9 1.2 1.7 2 2.3.9.7 1.3.8 1.6.6.2-.1.7-.9 1-1.2.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .8-.1 1.1Z" />
              </svg>
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
                className={`h-2.5 rounded-full transition-all ${
                  i === index
                    ? "w-8 bg-gold shadow-md"
                    : "w-2.5 bg-white/40 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
              aria-label="Previous slide"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white backdrop-blur-md transition-all hover:bg-gold hover:text-black hover:border-gold shadow-md"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % slides.length)}
              aria-label="Next slide"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white backdrop-blur-md transition-all hover:bg-gold hover:text-black hover:border-gold shadow-md"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
