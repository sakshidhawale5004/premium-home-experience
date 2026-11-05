import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, STORE, type Product } from "@/data/products";

export interface CartLine {
  slug: string;
  qty: number;
}

export function inr(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}

interface ShopContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  productFor: (slug: string) => Product | undefined;
}

const ShopContext = createContext<ShopContextValue | null>(null);

const STORAGE_KEY = "vastu-adda-cart";

export function ShopProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Load saved cart after hydration to avoid SSR/localStorage mismatch.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved: unknown = JSON.parse(raw);
        if (Array.isArray(saved)) {
          const valid = saved.filter(
            (l): l is CartLine =>
              !!l && typeof l === "object" &&
              typeof (l as CartLine).slug === "string" &&
              typeof (l as CartLine).qty === "number" &&
              products.some((p) => p.slug === (l as CartLine).slug),
          );
          setLines(valid);
        }
      }
    } catch {
      // ignore corrupt storage
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // storage unavailable
    }
  }, [lines]);

  const value = useMemo<ShopContextValue>(() => {
    const productFor = (slug: string) => products.find((p) => p.slug === slug);
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * (productFor(l.slug)?.price ?? 0), 0),
      add: (slug, qty = 1) =>
        setLines((prev) => {
          const existing = prev.find((l) => l.slug === slug);
          if (existing) {
            return prev.map((l) => (l.slug === slug ? { ...l, qty: Math.min(l.qty + qty, 99) } : l));
          }
          return [...prev, { slug, qty }];
        }),
      setQty: (slug, qty) =>
        setLines((prev) =>
          qty <= 0
            ? prev.filter((l) => l.slug !== slug)
            : prev.map((l) => (l.slug === slug ? { ...l, qty: Math.min(qty, 99) } : l)),
        ),
      remove: (slug) => setLines((prev) => prev.filter((l) => l.slug !== slug)),
      clear: () => setLines([]),
      cartOpen,
      setCartOpen,
      searchOpen,
      setSearchOpen,
      productFor,
    };
  }, [lines, cartOpen, searchOpen]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop(): ShopContextValue {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}

export function buildOrderMessage(lines: CartLine[], productFor: (slug: string) => Product | undefined): string {
  const rows = lines
    .map((l) => {
      const p = productFor(l.slug);
      return p ? `• ${l.qty} × ${p.name} — ${inr(p.price * l.qty)}` : null;
    })
    .filter(Boolean)
    .join("\n");
  const subtotal = lines.reduce((n, l) => n + l.qty * (productFor(l.slug)?.price ?? 0), 0);
  return `Hello Vastu Adda! I would like to place an order:\n\n${rows}\n\nOrder total: ${inr(subtotal)}\n\nMy name: \nDelivery address: `;
}

export function whatsappOrderUrl(lines: CartLine[], productFor: (slug: string) => Product | undefined): string {
  return `${STORE.whatsapp}?text=${encodeURIComponent(buildOrderMessage(lines, productFor))}`;
}
