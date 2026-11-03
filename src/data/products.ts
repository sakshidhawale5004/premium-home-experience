export type Category =
  | "Crystal Pyramids"
  | "Crystal Trees"
  | "Crystal Bracelets"
  | "Malas"
  | "Vastu Products";

export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  image: string;
  url: string;
  blurb: string;
}

const IMG = "https://vastuadda.com/wp-content/uploads/2026/06";
const P = (slug: string) => `https://vastuadda.com/product/${slug}/`;

export const products: Product[] = [
  {
    id: 1,
    name: "Pyrite Tree",
    category: "Crystal Trees",
    price: 250,
    image: `${IMG}/PyriteTree-300x300.jpeg`,
    url: P("pyrite-tree"),
    blurb: "The fabled money tree — golden pyrite chips to attract wealth and shield your space.",
  },
  {
    id: 2,
    name: "Evil Eye Tree",
    category: "Crystal Trees",
    price: 250,
    image: `${IMG}/EvileyeTree-1-300x300.jpeg`,
    url: P("evil-eye-tree"),
    blurb: "Wards off negativity and envy while adding a protective charm to your decor.",
  },
  {
    id: 3,
    name: "7 Chakra Tree",
    category: "Crystal Trees",
    price: 300,
    image: `${IMG}/7ChakraTree-300x300.jpeg`,
    url: P("7-chakra-tree"),
    blurb: "Seven gemstone layers that balance every chakra and harmonise the whole room.",
  },
  {
    id: 4,
    name: "Citrine Tree",
    category: "Crystal Trees",
    price: 450,
    image: `${IMG}/CitrineTree-300x300.jpeg`,
    url: P("citrine-tree"),
    blurb: "The merchant's stone — citrine branches for abundance, joy and fresh opportunity.",
  },
  {
    id: 5,
    name: "Dhan Yog Tree",
    category: "Crystal Trees",
    price: 350,
    image: `${IMG}/DhanYogTree-300x300.jpeg`,
    url: P("dhan-yog-tree"),
    blurb: "A wealth-combination tree crafted to invite steady prosperity into the home.",
  },
  {
    id: 6,
    name: "Rudraksh Tree",
    category: "Crystal Trees",
    price: 400,
    image: `${IMG}/RudrakshTree-300x300.jpeg`,
    url: P("rudraksh-tree"),
    blurb: "Sacred rudraksha beads on golden branches — pure spiritual vibration for your altar.",
  },
  {
    id: 7,
    name: "Money Magnet Pyramid",
    category: "Crystal Pyramids",
    price: 450,
    image: `${IMG}/MoneyMagnetPyramid-300x300.jpeg`,
    url: P("money-magnet-pyramid"),
    blurb: "A master-combination orgonite pyramid that amplifies money energy where you place it.",
  },
  {
    id: 8,
    name: "Dhanlabh Pyramid",
    category: "Crystal Pyramids",
    price: 499,
    image: `${IMG}/DhanlabhPyramid-300x300.jpeg`,
    url: P("dhanlabh-pyramid"),
    blurb: "Vastu orgonite pyramid for wealth accumulation, protection and clear intentions.",
  },
  {
    id: 9,
    name: "Pyrite Bracelet",
    category: "Crystal Bracelets",
    price: 150,
    image: `${IMG}/PyriteBracelets-300x300.jpeg`,
    url: P("pyrite-bracelets"),
    blurb: "Wear the sun stone — pyrite beads for confidence, willpower and abundance.",
  },
  {
    id: 10,
    name: "Dhan Yog Bracelet",
    category: "Crystal Bracelets",
    price: 299,
    image: `${IMG}/DhanYogBracelets-300x300.jpeg`,
    url: P("dhan-yog-bracelets"),
    blurb: "A multi-crystal wristband tuned to the frequencies of wealth and fortune.",
  },
  {
    id: 11,
    name: "Richi Rich Bracelet",
    category: "Crystal Bracelets",
    price: 250,
    image: `${IMG}/RichiRichBracelets-300x300.jpeg`,
    url: P("richi-rich-bracelets"),
    blurb: "The much-loved power-duo bracelet pairing two manifestation stones in one strand.",
  },
  {
    id: 12,
    name: "Gold Plated Rudraksh Bracelet",
    category: "Crystal Bracelets",
    price: 250,
    image: `${IMG}/GoldPlatedRudrakshBraclets-300x300.jpeg`,
    url: P("gold-plated-rudraksh-braclets"),
    blurb: "Sacred rudraksha beads finished with gold plating — tradition with a royal touch.",
  },
  {
    id: 13,
    name: "Karungali Bracelet",
    category: "Crystal Bracelets",
    price: 250,
    image: `${IMG}/karungaliBracelet-300x300.jpeg`,
    url: P("karungali-bracelet"),
    blurb: "Revered ebony wood of South Indian tradition — grounding and negativity shield.",
  },
  {
    id: 14,
    name: "Karungali Rudraksh Combo Bracelet",
    category: "Crystal Bracelets",
    price: 450,
    image: `${IMG}/KarungaliRudrakshComboBracelets-300x300.jpeg`,
    url: P("karungali-rudraksh-combo-bracelets"),
    blurb: "Karungali and rudraksha together — double protection, double devotion.",
  },
  {
    id: 15,
    name: "Tiger Eye Bracelet",
    category: "Crystal Bracelets",
    price: 350,
    image: `${IMG}/TigerEyeBracelets-300x300.jpeg`,
    url: P("tiger-eye-bracelets"),
    blurb: "Silky golden chatoyancy for courage, focus and unshakeable determination.",
  },
  {
    id: 16,
    name: "Rudraksh with Clear Quartz Mala",
    category: "Malas",
    price: 450,
    image: `${IMG}/RudrakshwithClearQuartz-600x600.jpeg`,
    url: P("rudraksh-with-clear-quartz"),
    blurb: "Sacred rudraksha alternating with crystal quartz — balance, clarity and calm.",
  },
  {
    id: 17,
    name: "Rudraksh with Tiger Eye Mala",
    category: "Malas",
    price: 500,
    image: `${IMG}/RudrakshwithTigerEyeMALA-600x600.jpeg`,
    url: P("rudraksh-with-tiger-eye-mala"),
    blurb: "A dynamic japa mala blending grounded protection with bold confidence.",
  },
  {
    id: 18,
    name: "Rudraksh with Pyrite Mala",
    category: "Malas",
    price: 350,
    image: `${IMG}/Gemini_Generated_Image_qei0ryqei0ryqei0-600x600.jpeg`,
    url: P("rudraksh-with-pyrite-mala"),
    blurb: "Ancient Vedic protection meets modern wealth attraction in one potent mala.",
  },
  {
    id: 19,
    name: "Sevan Chakra Mala",
    category: "Malas",
    price: 399,
    image: `${IMG}/Sevanchakramala.jpeg`,
    url: P("sevan-chakra-mala"),
    blurb: "Seven chakra stones strung in sequence to align every energy centre as you chant.",
  },
  {
    id: 20,
    name: "Rudraksh with Karungali Mala",
    category: "Malas",
    price: 599,
    image: `${IMG}/Rudrakshwithkarungalimala-600x600.jpeg`,
    url: P("rudraksh-with-karungali-mala"),
    blurb: "A deeply grounding South Indian combination for daily sadhana and shielding.",
  },
  {
    id: 21,
    name: "Pyrite Tortoise",
    category: "Vastu Products",
    price: 699,
    image: `${IMG}/PyriteTortoise-600x600.jpeg`,
    url: P("pyrite-tortoise"),
    blurb: "The tortoise of stability in wealth-giving pyrite — a classic Vastu remedy.",
  },
  {
    id: 22,
    name: "Pyrite Key Chain",
    category: "Vastu Products",
    price: 299,
    image: `${IMG}/pyritekeychain-600x600.jpeg`,
    url: P("pyrite-key-chain"),
    blurb: "Carry prosperity everywhere — a pyrite talisman for keys, bags and travels.",
  },
];

export interface HeroSlide {
  category: Category;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  image: string;
}

export const categoryLinks: { category: Category; href: string }[] = [
  { category: "Crystal Pyramids", href: "https://vastuadda.com/product-category/crystal-pyramid/" },
  { category: "Crystal Bracelets", href: "https://vastuadda.com/product-category/crytal-bracelets/" },
  { category: "Crystal Trees", href: "https://vastuadda.com/product-category/crytal-tree/" },
  { category: "Malas", href: "https://vastuadda.com/product-category/mala/" },
  { category: "Vastu Products", href: "https://vastuadda.com/product-category/vastu-product/" },
];

export const STORE = {
  cart: "https://vastuadda.com/cart/",
  checkout: "https://vastuadda.com/checkout/",
  whatsapp: "https://wa.me/919021265071",
  phone: "+91 90212 65071",
  site: "https://vastuadda.com",
};
