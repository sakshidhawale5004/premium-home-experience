import { STORE } from "@/data/products";

export function WhatsAppButton() {
  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 group print:hidden"
    >
      {/* Floating Tooltip Pill */}
      <a
        href={STORE.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-card/95 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-foreground border border-gold/40 shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:border-emerald-500"
      >
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Chat with Astrologer</span>
      </a>

      {/* Floating WhatsApp Action Button */}
      <a
        href={STORE.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Astrologer on WhatsApp"
        className="relative flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_24px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_30px_rgba(37,211,102,0.6)] active:scale-95"
      >
        {/* Subtle Pulse Animation Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none" />

        {/* Official WhatsApp SVG Icon */}
        <svg
          viewBox="0 0 24 24"
          className="relative z-10 h-7 w-7 fill-current drop-shadow-sm"
          aria-hidden="true"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.76 7.85 19L7.55 18.82L4.43 19.64L5.26 16.6L5.07 16.29C4.24 14.97 3.8 13.46 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.05 20.15ZM16.57 14.39C16.32 14.26 15.1 13.66 14.87 13.58C14.65 13.5 14.48 13.46 14.32 13.71C14.15 13.96 13.68 14.51 13.53 14.68C13.39 14.84 13.24 14.86 12.99 14.74C12.74 14.61 11.94 14.35 11 13.51C10.27 12.86 9.77 12.05 9.63 11.8C9.48 11.55 9.61 11.42 9.74 11.29C9.85 11.18 9.99 11 10.11 10.86C10.24 10.72 10.28 10.62 10.36 10.45C10.45 10.29 10.41 10.14 10.34 10.02C10.28 9.89 9.79 8.69 9.58 8.19C9.38 7.7 9.18 7.77 9.03 7.76C8.89 7.75 8.72 7.75 8.56 7.75C8.39 7.75 8.12 7.81 7.89 8.06C7.66 8.31 7.02 8.91 7.02 10.13C7.02 11.35 7.91 12.52 8.03 12.69C8.16 12.85 9.78 15.35 12.26 16.42C12.85 16.68 13.31 16.83 13.67 16.94C14.26 17.13 14.8 17.1 15.22 17.04C15.7 16.97 16.69 16.44 16.9 15.86C17.11 15.27 17.11 14.77 17.05 14.67C16.98 14.56 16.82 14.51 16.57 14.39Z" />
        </svg>
      </a>
    </aside>
  );
}
