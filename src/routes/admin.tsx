import { useState, useEffect, useId } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { products as defaultProducts, STORE, type Product } from "@/data/products";
import { inr } from "@/lib/shop";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      {
        title: "VASTU ADDA · Staff CRM & Commerce Admin Hub",
      },
      {
        name: "description",
        content:
          "Internal CRM and commerce administration hub for Vastu Adda: product catalog control, CSV exports, customer profiles, and real-time order tracking.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

export interface AdminOrder {
  orderId: string;
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  sankalpName: string;
  paymentMethod: "upi" | "cod" | "card" | "netbanking";
  items: Array<{ name: string; qty: number; price: number }>;
  subtotal: number;
  discount: number;
  total: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered";
  date: string;
  timestamp: string;
}

export interface AdminCustomer {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  ordersCount: number;
  totalSpend: number;
  segment: "VIP Patron" | "Regular Patron" | "New Patron";
  lastOrderDate: string;
}

export interface AdminInquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
  date: string;
  status: "New Lead" | "Contacted" | "Closed";
}

// Initial Seed Orders
const SEED_ORDERS: AdminOrder[] = [
  {
    orderId: "VA-2026-94812",
    fullName: "Rajeshwar Iyer",
    phone: "9820145290",
    email: "rajesh.iyer@gmail.com",
    addressLine1: "A-502, Green Ridge Towers",
    addressLine2: "Kandivali East",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400101",
    sankalpName: "Iyer Family Prosperity",
    paymentMethod: "upi",
    items: [
      { name: "Golden Pyrite Wealth Tree", qty: 1, price: 799 },
      { name: "Natural Citrine Wealth & Joy Tree", qty: 1, price: 899 },
    ],
    subtotal: 1698,
    discount: 170,
    total: 1528,
    status: "Processing",
    date: "05 Nov 2026",
    timestamp: "2026-11-05T14:20:00.000Z",
  },
  {
    orderId: "VA-2026-88341",
    fullName: "Pooja Malhotra",
    phone: "9811223344",
    email: "pooja.malhotra@outlook.com",
    addressLine1: "Villa 14, Lotus Enclave",
    addressLine2: "Golf Course Road",
    city: "Gurugram",
    state: "Haryana",
    pincode: "122002",
    sankalpName: "Malhotra Residence",
    paymentMethod: "cod",
    items: [
      { name: "Money Magnet Orgonite Pyramid", qty: 1, price: 699 },
      { name: "Dhan Yog 5-Crystal Wealth Bracelet", qty: 2, price: 499 },
    ],
    subtotal: 1697,
    discount: 0,
    total: 1697,
    status: "Shipped",
    date: "04 Nov 2026",
    timestamp: "2026-11-04T11:15:00.000Z",
  },
  {
    orderId: "VA-2026-72109",
    fullName: "Venkatesh Rao",
    phone: "9448012345",
    email: "v.rao@techcorp.in",
    addressLine1: "Flat 12B, Palm Meadows",
    addressLine2: "Whitefield",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560066",
    sankalpName: "Venkatesh & Supriya Rao",
    paymentMethod: "upi",
    items: [{ name: "5-Mukhi Himalayan Rudraksha Mala", qty: 1, price: 699 }],
    subtotal: 699,
    discount: 70,
    total: 629,
    status: "Delivered",
    date: "02 Nov 2026",
    timestamp: "2026-11-02T09:40:00.000Z",
  },
  {
    orderId: "VA-2026-61902",
    fullName: "Sunita Deshmukh",
    phone: "9822098765",
    email: "sunita.d@yahoo.com",
    addressLine1: "Bungalow 4, Aundh Heights",
    addressLine2: "Aundh",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411007",
    sankalpName: "Deshmukh Parivar",
    paymentMethod: "cod",
    items: [{ name: "Brass Vastu Tortoise with Plate", qty: 1, price: 799 }],
    subtotal: 799,
    discount: 0,
    total: 799,
    status: "Pending",
    date: "06 Nov 2026",
    timestamp: "2026-11-06T08:10:00.000Z",
  },
];

// Initial Seed Customers
const SEED_CUSTOMERS: AdminCustomer[] = [
  {
    id: "CUST-1001",
    name: "Rajeshwar Iyer",
    phone: "9820145290",
    email: "rajesh.iyer@gmail.com",
    city: "Mumbai",
    state: "Maharashtra",
    ordersCount: 3,
    totalSpend: 4890,
    segment: "VIP Patron",
    lastOrderDate: "05 Nov 2026",
  },
  {
    id: "CUST-1002",
    name: "Pooja Malhotra",
    phone: "9811223344",
    email: "pooja.malhotra@outlook.com",
    city: "Gurugram",
    state: "Haryana",
    ordersCount: 2,
    totalSpend: 3196,
    segment: "VIP Patron",
    lastOrderDate: "04 Nov 2026",
  },
  {
    id: "CUST-1003",
    name: "Venkatesh Rao",
    phone: "9448012345",
    email: "v.rao@techcorp.in",
    city: "Bengaluru",
    state: "Karnataka",
    ordersCount: 1,
    totalSpend: 629,
    segment: "Regular Patron",
    lastOrderDate: "02 Nov 2026",
  },
  {
    id: "CUST-1004",
    name: "Sunita Deshmukh",
    phone: "9822098765",
    email: "sunita.d@yahoo.com",
    city: "Pune",
    state: "Maharashtra",
    ordersCount: 1,
    totalSpend: 799,
    segment: "New Patron",
    lastOrderDate: "06 Nov 2026",
  },
];

// Initial Seed Inquiries
const SEED_INQUIRIES: AdminInquiry[] = [
  {
    id: "INQ-201",
    name: "Vikram Singhania",
    phone: "9819001122",
    email: "vikram@singhaniagroup.com",
    interest: "Corporate Gifting: 50x Golden Pyrite Wealth Trees",
    message: "Looking for custom branded gift boxes for our executive clients this Diwali. Please share bulk pricing and lead times.",
    date: "05 Nov 2026",
    status: "New Lead",
  },
  {
    id: "INQ-202",
    name: "Dr. Meenakshi Sundaram",
    phone: "9840123890",
    email: "dr.meenakshi@ayurclinic.in",
    interest: "Wellness Centre: 10x Orgonite Pyramids & Selenite Plates",
    message: "Setting up 4 meditation suites in Chennai. Need authentic crystal remedies to dissipate electromagnetic interference.",
    date: "03 Nov 2026",
    status: "Contacted",
  },
];

function AdminPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders" | "customers" | "inquiries">("overview");

  // Admin Data state
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [ordersList, setOrdersList] = useState<AdminOrder[]>([]);
  const [customersList, setCustomersList] = useState<AdminCustomer[]>([]);
  const [inquiriesList, setInquiriesList] = useState<AdminInquiry[]>([]);

  // Search & Filter state
  const [productSearch, setProductSearch] = useState("");
  const [productCategoryFilter, setProductCategoryFilter] = useState("All");
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("All");
  const [customerSearch, setCustomerSearch] = useState("");
  const [inquirySearch, setInquirySearch] = useState("");

  // Add / Edit Product Modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductSlug, setEditingProductSlug] = useState<string | null>(null);
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("Crystal Trees");
  const [formPrice, setFormPrice] = useState(799);
  const [formMrp, setFormMrp] = useState(1599);
  const [formRating, setFormRating] = useState(4.9);
  const [formReviews, setFormReviews] = useState(150);
  const [formImage, setFormImage] = useState("");
  const [formBlurb, setFormBlurb] = useState("");
  const [formIsBestseller, setFormIsBestseller] = useState(false);

  // Form IDs for accessibility
  const usernameId = useId();
  const passwordId = useId();

  // 1. Initial Load & Sync
  useEffect(() => {
    // Check saved session
    const isLogged = localStorage.getItem("vastu_admin_logged") === "true";
    if (isLogged) {
      setIsAuthenticated(true);
    }

    // Load Products
    const savedProducts = localStorage.getItem("vastu_catalog_products");
    if (savedProducts) {
      try {
        setProductsList(JSON.parse(savedProducts));
      } catch {
        setProductsList(defaultProducts);
      }
    } else {
      setProductsList(defaultProducts);
    }

    // Load Orders
    const savedOrders = localStorage.getItem("vastu_orders");
    if (savedOrders) {
      try {
        const parsed = JSON.parse(savedOrders);
        setOrdersList(parsed.length > 0 ? parsed : SEED_ORDERS);
      } catch {
        setOrdersList(SEED_ORDERS);
      }
    } else {
      localStorage.setItem("vastu_orders", JSON.stringify(SEED_ORDERS));
      setOrdersList(SEED_ORDERS);
    }

    // Load Customers
    const savedCustomers = localStorage.getItem("vastu_customers");
    if (savedCustomers) {
      try {
        const parsed = JSON.parse(savedCustomers);
        setCustomersList(parsed.length > 0 ? parsed : SEED_CUSTOMERS);
      } catch {
        setCustomersList(SEED_CUSTOMERS);
      }
    } else {
      localStorage.setItem("vastu_customers", JSON.stringify(SEED_CUSTOMERS));
      setCustomersList(SEED_CUSTOMERS);
    }

    // Load Inquiries
    const savedInquiries = localStorage.getItem("vastu_inquiries");
    if (savedInquiries) {
      try {
        setInquiriesList(JSON.parse(savedInquiries));
      } catch {
        setInquiriesList(SEED_INQUIRIES);
      }
    } else {
      localStorage.setItem("vastu_inquiries", JSON.stringify(SEED_INQUIRIES));
      setInquiriesList(SEED_INQUIRIES);
    }

    // Storage listener for real-time checkout updates
    const handleStorageUpdate = () => {
      const liveOrders = localStorage.getItem("vastu_orders");
      if (liveOrders) {
        try {
          setOrdersList(JSON.parse(liveOrders));
        } catch {
          // ignore
        }
      }
      const liveCust = localStorage.getItem("vastu_customers");
      if (liveCust) {
        try {
          setCustomersList(JSON.parse(liveCust));
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener("storage", handleStorageUpdate);
    window.addEventListener("vastu:orders-updated", handleStorageUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageUpdate);
      window.removeEventListener("vastu:orders-updated", handleStorageUpdate);
    };
  }, []);

  // 2. Authentication Handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    if (cleanUser === "admin" && (cleanPass === "admin123" || cleanPass === "vastu2026")) {
      setIsAuthenticated(true);
      localStorage.setItem("vastu_admin_logged", "true");
      setAuthError("");
    } else {
      setAuthError("Invalid credentials. Try: username: admin / password: admin123");
    }
  };

  const handleFillDemoCreds = () => {
    setUsername("admin");
    setPassword("admin123");
    setAuthError("");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("vastu_admin_logged");
  };

  // 3. Status update on Orders
  const handleUpdateOrderStatus = (orderId: string, newStatus: AdminOrder["status"]) => {
    setOrdersList((prev) => {
      const updated = prev.map((ord) => (ord.orderId === orderId ? { ...ord, status: newStatus } : ord));
      localStorage.setItem("vastu_orders", JSON.stringify(updated));
      return updated;
    });
  };

  // 4. Products Management
  const handleOpenAddProduct = () => {
    setEditingProductSlug(null);
    setFormName("");
    setFormCategory("Crystal Trees");
    setFormPrice(799);
    setFormMrp(1599);
    setFormRating(4.9);
    setFormReviews(120);
    setFormImage("/assets/hero-tree.jpg");
    setFormBlurb("Genuine energized crystal remedy for sustained household harmony.");
    setFormIsBestseller(false);
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProductSlug(prod.slug);
    setFormName(prod.name);
    setFormCategory(prod.category);
    setFormPrice(prod.price);
    setFormMrp(prod.mrp);
    setFormRating(prod.rating);
    setFormReviews(prod.reviewsCount);
    setFormImage(prod.image);
    setFormBlurb(prod.blurb);
    setFormIsBestseller(prod.isBestseller ?? false);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (editingProductSlug) {
      // Update existing
      setProductsList((prev) => {
        const updated = prev.map((p) =>
          p.slug === editingProductSlug
            ? {
                ...p,
                name: formName.trim(),
                category: formCategory,
                price: Number(formPrice),
                mrp: Number(formMrp),
                rating: Number(formRating),
                reviewsCount: Number(formReviews),
                image: formImage.trim() || p.image,
                blurb: formBlurb.trim(),
                isBestseller: formIsBestseller,
              }
            : p,
        );
        localStorage.setItem("vastu_catalog_products", JSON.stringify(updated));
        return updated;
      });
    } else {
      // Add new
      const newSlug = formName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const newProduct: Product = {
        slug: newSlug || `remedy-${Date.now()}`,
        name: formName.trim(),
        category: formCategory,
        price: Number(formPrice),
        mrp: Number(formMrp),
        rating: Number(formRating),
        reviewsCount: Number(formReviews),
        image: formImage.trim() || "/assets/hero-tree.jpg",
        blurb: formBlurb.trim(),
        description: formBlurb.trim(),
        benefits: ["Awakens positive frequencies", "Vedic mantra energized", "Includes free Selenite plate"],
        placement: "North or North-East quadrant of home or office",
        deity: "Lord Kuber / Maha Lakshmi",
        element: "Earth / Prithvi",
        isBestseller: formIsBestseller,
      };

      setProductsList((prev) => {
        const updated = [newProduct, ...prev];
        localStorage.setItem("vastu_catalog_products", JSON.stringify(updated));
        return updated;
      });
    }

    setIsProductModalOpen(false);
  };

  const handleDeleteProduct = (slug: string) => {
    if (confirm("Are you sure you want to remove this product from the catalog?")) {
      setProductsList((prev) => {
        const updated = prev.filter((p) => p.slug !== slug);
        localStorage.setItem("vastu_catalog_products", JSON.stringify(updated));
        return updated;
      });
    }
  };

  const handleResetCatalog = () => {
    if (confirm("Reset catalog back to the 21 default verified products?")) {
      localStorage.removeItem("vastu_catalog_products");
      setProductsList(defaultProducts);
    }
  };

  // 5. CSV Export Utilities
  const exportOrdersCSV = () => {
    const headers = [
      "OrderID",
      "Customer",
      "Phone",
      "Email",
      "City",
      "State",
      "Pincode",
      "ConsecrationName",
      "PaymentMethod",
      "TotalINR",
      "Status",
      "Date",
    ];
    const rows = ordersList.map((o) => [
      `"${o.orderId}"`,
      `"${o.fullName}"`,
      `"${o.phone}"`,
      `"${o.email}"`,
      `"${o.city}"`,
      `"${o.state}"`,
      `"${o.pincode}"`,
      `"${o.sankalpName}"`,
      `"${o.paymentMethod}"`,
      o.total,
      `"${o.status}"`,
      `"${o.date}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `vastu_adda_orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportProductsCSV = () => {
    const headers = ["Slug", "Name", "Category", "PriceINR", "MRPINR", "Rating", "ReviewsCount", "IsBestseller"];
    const rows = productsList.map((p) => [
      `"${p.slug}"`,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.category}"`,
      p.price,
      p.mrp,
      p.rating,
      p.reviewsCount,
      p.isBestseller ? "YES" : "NO",
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `vastu_adda_catalog_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportCustomersCSV = () => {
    const headers = ["CustomerID", "Name", "Phone", "Email", "City", "State", "Segment", "OrdersCount", "TotalSpendINR", "LastOrderDate"];
    const rows = customersList.map((c) => [
      `"${c.id}"`,
      `"${c.name}"`,
      `"${c.phone}"`,
      `"${c.email}"`,
      `"${c.city}"`,
      `"${c.state}"`,
      `"${c.segment}"`,
      c.ordersCount,
      c.totalSpend,
      `"${c.lastOrderDate}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `vastu_adda_patrons_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 6. Metrics Calculation for Dashboard
  const grossRevenue = ordersList.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = ordersList.length;
  const pendingOrdersCount = ordersList.filter((o) => o.status === "Pending").length;
  const processingOrdersCount = ordersList.filter((o) => o.status === "Processing").length;
  const shippedOrdersCount = ordersList.filter((o) => o.status === "Shipped").length;
  const deliveredOrdersCount = ordersList.filter((o) => o.status === "Delivered").length;
  const catalogValuation = productsList.reduce((sum, p) => sum + p.price * 25, 0); // sample estimated inventory

  // --- LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0d1f17] text-white flex flex-col justify-center items-center px-4 relative overflow-hidden font-sans">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-emerald-600/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="w-full max-w-md bg-[#132a20] border border-gold/30 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-black/40 border-2 border-gold/40 flex items-center justify-center mx-auto mb-4 p-2 shadow-inner">
              <img
                src="/cropped-VastuAdda-Golden-House-Logo-300x75.png"
                alt="Vastu Adda"
                className="w-full h-full object-contain brightness-110"
              />
            </div>
            <span className="text-[0.68rem] tracking-widest uppercase font-bold text-gold block">
              VASTU ADDA · COMMERCE SUITE
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1.5">
              Staff CRM &amp; Admin Hub
            </h1>
            <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
              Enter your staff credentials to manage the remedy catalog, review orders, and monitor store telemetry.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor={usernameId} className="block text-[11px] uppercase tracking-wider text-zinc-300 font-semibold mb-1">
                Staff Username
              </label>
              <input
                id={usernameId}
                type="text"
                required
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#0a1811] border border-zinc-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
              />
            </div>

            <div>
              <label htmlFor={passwordId} className="block text-[11px] uppercase tracking-wider text-zinc-300 font-semibold mb-1">
                Password
              </label>
              <input
                id={passwordId}
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0a1811] border border-zinc-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
              />
            </div>

            {authError && (
              <p className="text-xs text-red-400 bg-red-950/40 border border-red-800/60 rounded-lg p-2.5">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full mt-2 bg-gold hover:bg-gold-deep text-forest font-bold text-xs py-3.5 rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>Enter Staff Control Center</span>
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-zinc-800 text-center">
            <button
              type="button"
              onClick={handleFillDemoCreds}
              className="text-xs text-gold hover:text-white underline cursor-pointer inline-flex items-center gap-1.5 font-medium transition-colors"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span>Fill default demo credentials (admin / admin123)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- LOGGED IN STAFF ADMIN HUB ---
  return (
    <div className="min-h-screen bg-[#0b1712] text-zinc-100 font-sans pb-16">
      {/* 1. TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-[#0d1e17]/95 backdrop-blur-md border-b border-gold/30 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-black/40 border border-gold/40 flex items-center justify-center p-1">
            <img src="/cropped-VastuAdda-Golden-House-Logo-300x75.png" alt="Logo" className="w-full h-full object-contain brightness-110" />
          </div>
          <div>
            <span className="text-[0.62rem] tracking-widest uppercase font-bold text-gold block">
              COMMERCE SUITE &amp; CRM v2.0
            </span>
            <span className="font-display text-sm sm:text-base font-bold text-white tracking-wide">
              VASTU ADDA · STAFF CONTROL
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <nav className="flex items-center gap-1 bg-[#132a20] p-1 rounded-2xl border border-zinc-800 text-xs overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition-all ${
              activeTab === "overview" ? "bg-forest text-gold border border-gold/30 shadow" : "text-zinc-400 hover:text-white"
            }`}
          >
            Dashboard
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("products")}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition-all ${
              activeTab === "products" ? "bg-forest text-gold border border-gold/30 shadow" : "text-zinc-400 hover:text-white"
            }`}
          >
            Products ({productsList.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("orders")}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition-all ${
              activeTab === "orders" ? "bg-forest text-gold border border-gold/30 shadow" : "text-zinc-400 hover:text-white"
            }`}
          >
            Orders ({ordersList.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("customers")}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition-all ${
              activeTab === "customers" ? "bg-forest text-gold border border-gold/30 shadow" : "text-zinc-400 hover:text-white"
            }`}
          >
            Patron CRM ({customersList.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("inquiries")}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition-all ${
              activeTab === "inquiries" ? "bg-forest text-gold border border-gold/30 shadow" : "text-zinc-400 hover:text-white"
            }`}
          >
            Inquiries ({inquiriesList.length})
          </button>
        </nav>

        {/* Storefront Link & Logout */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            target="_blank"
            className="rounded-xl border border-zinc-700 bg-[#132a20] px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white hover:border-gold transition-colors flex items-center gap-1.5"
          >
            <span>Storefront</span>
            <span aria-hidden="true">→</span>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl bg-red-950/60 border border-red-800/80 px-3 py-1.5 text-xs font-semibold text-red-200 hover:bg-red-900 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="mx-auto max-w-7xl px-4 sm:px-8 mt-8">
        {/* ========================================================
            TAB 1: OVERVIEW / DASHBOARD TELEMETRY
            ======================================================== */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-gold font-bold">Executive Telemetry</span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-0.5">Command Center</h2>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleOpenAddProduct}
                  className="rounded-xl bg-gold px-4 py-2 text-xs font-bold text-forest hover:bg-gold-deep hover:text-white transition-all shadow"
                >
                  + Add Product
                </button>
                <button
                  type="button"
                  onClick={exportProductsCSV}
                  className="rounded-xl border border-zinc-700 bg-[#132a20] px-3.5 py-2 text-xs font-semibold text-zinc-300 hover:border-gold hover:text-white transition-colors"
                >
                  Export Products CSV
                </button>
                <button
                  type="button"
                  onClick={exportOrdersCSV}
                  className="rounded-xl border border-zinc-700 bg-[#132a20] px-3.5 py-2 text-xs font-semibold text-zinc-300 hover:border-gold hover:text-white transition-colors"
                >
                  Export Orders CSV
                </button>
              </div>
            </div>

            {/* 4 Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="rounded-3xl border border-gold/30 bg-[#132a20] p-5 shadow-sm">
                <span className="text-[0.7rem] uppercase tracking-wider text-zinc-400 font-semibold">Gross Revenue</span>
                <p className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">{inr(grossRevenue)}</p>
                <span className="text-[0.68rem] text-emerald-400 font-medium mt-1 block">Live synced orders</span>
              </div>

              <div className="rounded-3xl border border-gold/30 bg-[#132a20] p-5 shadow-sm">
                <span className="text-[0.7rem] uppercase tracking-wider text-zinc-400 font-semibold">Total Orders</span>
                <p className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">{totalOrdersCount}</p>
                <span className="text-[0.68rem] text-gold font-medium mt-1 block">{pendingOrdersCount} awaiting packing</span>
              </div>

              <div className="rounded-3xl border border-gold/30 bg-[#132a20] p-5 shadow-sm">
                <span className="text-[0.7rem] uppercase tracking-wider text-zinc-400 font-semibold">Active CRM Patrons</span>
                <p className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">{customersList.length}</p>
                <span className="text-[0.68rem] text-emerald-400 font-medium mt-1 block">All Indian pin codes</span>
              </div>

              <div className="rounded-3xl border border-gold/30 bg-[#132a20] p-5 shadow-sm">
                <span className="text-[0.7rem] uppercase tracking-wider text-zinc-400 font-semibold">Catalog Valuation</span>
                <p className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">{inr(catalogValuation)}</p>
                <span className="text-[0.68rem] text-zinc-400 font-medium mt-1 block">Across {productsList.length} remedies</span>
              </div>
            </div>

            {/* Funnel & Categories Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Order Fulfillment Funnel */}
              <div className="rounded-3xl border border-zinc-800 bg-[#132a20] p-6 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <h3 className="font-display text-base font-bold text-white">Order Fulfillment Funnel</h3>
                  <button type="button" onClick={() => setActiveTab("orders")} className="text-xs text-gold hover:underline">
                    Manage Orders →
                  </button>
                </div>
                <div className="mt-5 space-y-3.5">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-300">Delivered &amp; Blessed ({deliveredOrdersCount})</span>
                      <span className="text-emerald-400 font-semibold">
                        {totalOrdersCount ? Math.round((deliveredOrdersCount / totalOrdersCount) * 100) : 0}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${totalOrdersCount ? (deliveredOrdersCount / totalOrdersCount) * 100 : 0}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-300">Shipped / In Transit ({shippedOrdersCount})</span>
                      <span className="text-cyan-400 font-semibold">
                        {totalOrdersCount ? Math.round((shippedOrdersCount / totalOrdersCount) * 100) : 0}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full bg-cyan-500 rounded-full"
                        style={{ width: `${totalOrdersCount ? (shippedOrdersCount / totalOrdersCount) * 100 : 0}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-300">Processing / Consecrated ({processingOrdersCount})</span>
                      <span className="text-amber-400 font-semibold">
                        {totalOrdersCount ? Math.round((processingOrdersCount / totalOrdersCount) * 100) : 0}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${totalOrdersCount ? (processingOrdersCount / totalOrdersCount) * 100 : 0}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-300">Pending / Awaiting Consecration ({pendingOrdersCount})</span>
                      <span className="text-red-400 font-semibold">
                        {totalOrdersCount ? Math.round((pendingOrdersCount / totalOrdersCount) * 100) : 0}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full bg-red-500 rounded-full"
                        style={{ width: `${totalOrdersCount ? (pendingOrdersCount / totalOrdersCount) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Portfolio Distribution */}
              <div className="rounded-3xl border border-zinc-800 bg-[#132a20] p-6 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <h3 className="font-display text-base font-bold text-white">Portfolio Distribution</h3>
                  <button type="button" onClick={() => setActiveTab("products")} className="text-xs text-gold hover:underline">
                    View Catalog →
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  {["Crystal Trees", "Crystal Pyramids", "Crystal Bracelets", "Malas", "Vastu Products"].map((cat) => {
                    const count = productsList.filter((p) => p.category === cat).length;
                    return (
                      <div key={cat} className="rounded-2xl border border-zinc-800 bg-black/30 p-3.5">
                        <span className="text-zinc-400 text-[0.68rem] block truncate">{cat}</span>
                        <p className="font-display text-lg font-bold text-white mt-1">{count} Remedies</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Live Orders Stream */}
            <div className="rounded-3xl border border-zinc-800 bg-[#132a20] p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-800 gap-2">
                <div>
                  <h3 className="font-display text-lg font-bold text-white">Recent Orders &amp; Checkouts</h3>
                  <p className="text-xs text-zinc-400">Live feed of orders placed through the website</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("orders")}
                  className="rounded-xl border border-zinc-700 bg-black/30 px-3.5 py-1.5 text-xs text-gold hover:text-white transition-colors"
                >
                  View All Orders →
                </button>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs text-zinc-300">
                  <thead className="border-b border-zinc-800 text-[0.68rem] uppercase tracking-wider text-zinc-400">
                    <tr>
                      <th className="py-3 px-3">Order ID</th>
                      <th className="py-3 px-3">Customer</th>
                      <th className="py-3 px-3">Items</th>
                      <th className="py-3 px-3">Total</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">Date</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {ordersList.slice(0, 6).map((ord) => (
                      <tr key={ord.orderId} className="hover:bg-black/20 transition-colors">
                        <td className="py-3 px-3 font-semibold text-gold">{ord.orderId}</td>
                        <td className="py-3 px-3">
                          <p className="font-medium text-white">{ord.fullName}</p>
                          <p className="text-[0.68rem] text-zinc-400">+91 {ord.phone}</p>
                        </td>
                        <td className="py-3 px-3 max-w-[200px] truncate">
                          {ord.items.map((it) => `${it.qty}x ${it.name}`).join(", ")}
                        </td>
                        <td className="py-3 px-3 font-bold text-white">{inr(ord.total)}</td>
                        <td className="py-3 px-3">
                          <span
                            className={`rounded-full px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider ${
                              ord.status === "Delivered"
                                ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                                : ord.status === "Shipped"
                                ? "bg-cyan-950 text-cyan-300 border border-cyan-800"
                                : ord.status === "Processing"
                                ? "bg-amber-950 text-amber-300 border border-amber-800"
                                : "bg-red-950 text-red-300 border border-red-800"
                            }`}
                          >
                            {ord.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-zinc-400">{ord.date}</td>
                        <td className="py-3 px-3 text-right">
                          <a
                            href={`${STORE.whatsapp}?text=${encodeURIComponent(
                              `Hello ${ord.fullName}! Update on your Vastu Adda order #${ord.orderId}: Current status is ${ord.status}.`,
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[0.7rem] text-emerald-400 hover:text-emerald-300 font-semibold"
                          >
                            <span>WhatsApp</span>
                            <span aria-hidden="true">↗</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: PRODUCTS CATALOG (INVENTORY CONTROL)
            ======================================================== */}
        {activeTab === "products" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-gold font-bold">Inventory Control</span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-0.5">Products Catalog</h2>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleOpenAddProduct}
                  className="rounded-xl bg-gold px-4 py-2 text-xs font-bold text-forest hover:bg-gold-deep hover:text-white transition-all shadow"
                >
                  + Add Product
                </button>
                <button
                  type="button"
                  onClick={exportProductsCSV}
                  className="rounded-xl border border-zinc-700 bg-[#132a20] px-3.5 py-2 text-xs font-semibold text-zinc-300 hover:border-gold hover:text-white transition-colors"
                >
                  Export Catalog CSV
                </button>
                <button
                  type="button"
                  onClick={handleResetCatalog}
                  className="rounded-xl border border-zinc-700 bg-red-950/40 px-3.5 py-2 text-xs font-semibold text-red-300 hover:bg-red-900 transition-colors"
                >
                  Reset Defaults
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                placeholder="Search products by title..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full sm:w-80 bg-[#132a20] border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-gold"
              />
              <select
                value={productCategoryFilter}
                onChange={(e) => setProductCategoryFilter(e.target.value)}
                className="w-full sm:w-60 bg-[#132a20] border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-gold"
              >
                <option value="All">All Categories ({productsList.length})</option>
                <option value="Crystal Trees">Crystal Trees</option>
                <option value="Crystal Pyramids">Crystal Pyramids</option>
                <option value="Crystal Bracelets">Crystal Bracelets</option>
                <option value="Malas">Malas</option>
                <option value="Vastu Products">Vastu Products</option>
              </select>
            </div>

            {/* Products Table */}
            <div className="rounded-3xl border border-zinc-800 bg-[#132a20] overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-zinc-300">
                  <thead className="border-b border-zinc-800 bg-black/40 text-[0.68rem] uppercase tracking-wider text-zinc-400">
                    <tr>
                      <th className="py-3 px-4">Image</th>
                      <th className="py-3 px-4">Name &amp; Remedy Notes</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price (₹)</th>
                      <th className="py-3 px-4">Rating</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {productsList
                      .filter((p) => {
                        const matchesCat = productCategoryFilter === "All" || p.category === productCategoryFilter;
                        const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase());
                        return matchesCat && matchesSearch;
                      })
                      .map((prod) => (
                        <tr key={prod.slug} className="hover:bg-black/20 transition-colors">
                          <td className="py-3 px-4">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="h-12 w-12 rounded-xl object-cover border border-zinc-700 bg-black/40"
                            />
                          </td>
                          <td className="py-3 px-4 max-w-[280px]">
                            <p className="font-semibold text-white">{prod.name}</p>
                            <p className="text-[0.68rem] text-zinc-400 truncate">{prod.blurb}</p>
                          </td>
                          <td className="py-3 px-4">
                            <span className="rounded-full bg-zinc-800 px-2.5 py-1 text-[0.65rem] text-zinc-300 font-medium">
                              {prod.category}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-bold text-white">{inr(prod.price)}</p>
                            {prod.mrp > prod.price && (
                              <p className="text-[0.65rem] text-zinc-500 line-through">MRP {inr(prod.mrp)}</p>
                            )}
                          </td>
                          <td className="py-3 px-4 text-gold">
                            ★ {prod.rating} <span className="text-zinc-500 text-[0.68rem]">({prod.reviewsCount})</span>
                          </td>
                          <td className="py-3 px-4">
                            {prod.isBestseller ? (
                              <span className="rounded-full bg-amber-950 text-amber-300 border border-amber-800 px-2 py-0.5 text-[0.65rem] font-bold">
                                Bestseller
                              </span>
                            ) : (
                              <span className="rounded-full bg-zinc-800 text-zinc-400 px-2 py-0.5 text-[0.65rem]">
                                Active
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button
                              type="button"
                              onClick={() => handleOpenEditProduct(prod)}
                              className="text-xs text-gold hover:underline font-semibold"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(prod.slug)}
                              className="text-xs text-red-400 hover:underline"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: ORDERS & LOGISTICS (FULFILLMENT & SHIPPING)
            ======================================================== */}
        {activeTab === "orders" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-gold font-bold">Fulfillment &amp; Shipping</span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-0.5">Orders &amp; Logistics</h2>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={exportOrdersCSV}
                  className="rounded-xl border border-zinc-700 bg-[#132a20] px-4 py-2 text-xs font-semibold text-zinc-300 hover:border-gold hover:text-white transition-colors"
                >
                  Export Orders CSV
                </button>
              </div>
            </div>

            {/* Status Filter Tabs & Search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-full">
                {["All", "Pending", "Processing", "Shipped", "Delivered"].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setOrderStatusFilter(st)}
                    className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                      orderStatusFilter === st
                        ? "bg-forest text-gold border border-gold/40 shadow"
                        : "bg-[#132a20] text-zinc-400 hover:text-white"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <input
                type="text"
                placeholder="Search by customer name, phone, or Order ID..."
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                className="w-full sm:w-80 bg-[#132a20] border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-gold"
              />
            </div>

            {/* Orders Cards / List */}
            <div className="space-y-4">
              {ordersList
                .filter((ord) => {
                  const matchesStatus = orderStatusFilter === "All" || ord.status === orderStatusFilter;
                  const query = orderSearch.toLowerCase();
                  const matchesSearch =
                    ord.fullName.toLowerCase().includes(query) ||
                    ord.phone.includes(query) ||
                    ord.orderId.toLowerCase().includes(query);
                  return matchesStatus && matchesSearch;
                })
                .map((ord) => (
                  <div
                    key={ord.orderId}
                    className="rounded-3xl border border-zinc-800 bg-[#132a20] p-5 sm:p-6 shadow-sm hover:border-gold/30 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-800 gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display font-bold text-gold text-base">{ord.orderId}</span>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider ${
                              ord.status === "Delivered"
                                ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                                : ord.status === "Shipped"
                                ? "bg-cyan-950 text-cyan-300 border border-cyan-800"
                                : ord.status === "Processing"
                                ? "bg-amber-950 text-amber-300 border border-amber-800"
                                : "bg-red-950 text-red-300 border border-red-800"
                            }`}
                          >
                            {ord.status}
                          </span>
                          <span className="text-[0.7rem] text-zinc-400">Placed on {ord.date}</span>
                        </div>
                        <p className="text-xs text-zinc-300 mt-1">
                          Payment:{" "}
                          <strong className="text-white uppercase">{ord.paymentMethod === "cod" ? "Cash on Delivery" : "Prepaid UPI"}</strong>{" "}
                          • Consecration Sankalp: <span className="text-gold">{ord.sankalpName}</span>
                        </p>
                      </div>

                      {/* Status Selector & WhatsApp */}
                      <div className="flex items-center gap-2">
                        <select
                          value={ord.status}
                          onChange={(e) => handleUpdateOrderStatus(ord.orderId, e.target.value as AdminOrder["status"])}
                          className="rounded-xl border border-zinc-700 bg-black/40 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-gold"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>

                        <a
                          href={`${STORE.whatsapp}?text=${encodeURIComponent(
                            `Hello ${ord.fullName}! Update from Vastu Adda regarding your order #${ord.orderId} (${ord.items.map((i) => i.name).join(", ")}): Current status is "${ord.status}". Let us know if you have any questions!`,
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-xl bg-forest border border-emerald-700/60 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-900 transition-colors"
                        >
                          WhatsApp Customer
                        </a>
                      </div>
                    </div>

                    {/* Order Details Grid */}
                    <div className="mt-4 grid gap-4 sm:grid-cols-12 text-xs">
                      {/* Customer Address */}
                      <div className="sm:col-span-5 bg-black/25 rounded-2xl p-3.5 border border-zinc-800/80">
                        <span className="text-[0.68rem] uppercase tracking-wider text-zinc-400 font-bold block mb-1">
                          Delivery Recipient
                        </span>
                        <p className="font-semibold text-white">{ord.fullName}</p>
                        <p className="text-zinc-300">{ord.addressLine1}, {ord.addressLine2}</p>
                        <p className="text-zinc-300">{ord.city}, {ord.state} - {ord.pincode}</p>
                        <p className="text-gold font-medium mt-1">Phone: +91 {ord.phone}</p>
                      </div>

                      {/* Items Ordered */}
                      <div className="sm:col-span-7 bg-black/25 rounded-2xl p-3.5 border border-zinc-800/80">
                        <span className="text-[0.68rem] uppercase tracking-wider text-zinc-400 font-bold block mb-1">
                          Cart Formulation ({ord.items.length} items)
                        </span>
                        <div className="divide-y divide-zinc-800/60">
                          {ord.items.map((it, idx) => (
                            <div key={idx} className="py-1.5 flex justify-between items-center text-xs">
                              <span className="text-zinc-200">
                                <strong className="text-gold">{it.qty}x</strong> {it.name}
                              </span>
                              <span className="font-semibold text-white">{inr(it.price * it.qty)}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 pt-2 border-t border-zinc-800 flex justify-between font-bold text-sm">
                          <span className="text-zinc-300">Total Payable:</span>
                          <span className="text-gold">{inr(ord.total)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: CUSTOMERS / PATRON CRM DIRECTORY
            ======================================================== */}
        {activeTab === "customers" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-gold font-bold">Customer Relationships</span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-0.5">Patron CRM Directory</h2>
              </div>
              <button
                type="button"
                onClick={exportCustomersCSV}
                className="rounded-xl border border-zinc-700 bg-[#132a20] px-4 py-2 text-xs font-semibold text-zinc-300 hover:border-gold hover:text-white transition-colors"
              >
                Export Customers CSV
              </button>
            </div>

            <input
              type="text"
              placeholder="Search patrons by name, city, or phone..."
              value={customerSearch}
              onChange={(e) => setCustomerSearch(e.target.value)}
              className="w-full sm:w-80 bg-[#132a20] border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-gold"
            />

            <div className="rounded-3xl border border-zinc-800 bg-[#132a20] overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-zinc-300">
                  <thead className="border-b border-zinc-800 bg-black/40 text-[0.68rem] uppercase tracking-wider text-zinc-400">
                    <tr>
                      <th className="py-3 px-4">Patron Name</th>
                      <th className="py-3 px-4">Contact</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">CRM Segment</th>
                      <th className="py-3 px-4">Orders</th>
                      <th className="py-3 px-4">Lifetime Spend (₹)</th>
                      <th className="py-3 px-4">Last Order</th>
                      <th className="py-3 px-4 text-right">Direct Concierge</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {customersList
                      .filter((c) => {
                        const q = customerSearch.toLowerCase();
                        return (
                          c.name.toLowerCase().includes(q) ||
                          c.city.toLowerCase().includes(q) ||
                          c.phone.includes(q)
                        );
                      })
                      .map((cust) => (
                        <tr key={cust.id} className="hover:bg-black/20 transition-colors">
                          <td className="py-3 px-4 font-semibold text-white">{cust.name}</td>
                          <td className="py-3 px-4">
                            <p className="text-zinc-300">+91 {cust.phone}</p>
                            <p className="text-[0.68rem] text-zinc-500">{cust.email}</p>
                          </td>
                          <td className="py-3 px-4 text-zinc-400">
                            {cust.city}, {cust.state}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold ${
                                cust.segment === "VIP Patron"
                                  ? "bg-amber-950 text-gold border border-amber-800"
                                  : "bg-zinc-800 text-zinc-300"
                              }`}
                            >
                              {cust.segment}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-bold text-white">{cust.ordersCount}</td>
                          <td className="py-3 px-4 font-bold text-gold">{inr(cust.totalSpend)}</td>
                          <td className="py-3 px-4 text-zinc-400">{cust.lastOrderDate}</td>
                          <td className="py-3 px-4 text-right">
                            <a
                              href={`${STORE.whatsapp}?text=${encodeURIComponent(
                                `Namaste ${cust.name}! Connecting from Vastu Adda support regarding your orders.`,
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-emerald-400 hover:text-emerald-300 font-semibold"
                            >
                              WhatsApp ↗
                            </a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 5: INQUIRIES & CORPORATE LEADS
            ======================================================== */}
        {activeTab === "inquiries" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-gold font-bold">Wholesale &amp; Bulk Orders</span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-0.5">Inquiries &amp; Leads</h2>
              </div>
            </div>

            <div className="space-y-4">
              {inquiriesList.map((inq) => (
                <div key={inq.id} className="rounded-3xl border border-zinc-800 bg-[#132a20] p-5 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-zinc-800 gap-2">
                    <div>
                      <span className="font-bold text-white text-base">{inq.name}</span>
                      <span className="ml-3 text-xs text-gold font-semibold">{inq.interest}</span>
                    </div>
                    <span className="text-xs text-zinc-400">{inq.date}</span>
                  </div>
                  <p className="mt-3 text-xs text-zinc-300 leading-relaxed bg-black/25 p-3 rounded-xl border border-zinc-800">
                    "{inq.message}"
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-zinc-400">Phone: +91 {inq.phone} • {inq.email}</span>
                    <a
                      href={`${STORE.whatsapp}?text=${encodeURIComponent(
                        `Namaste ${inq.name}! We received your inquiry regarding "${inq.interest}". We would love to assist you.`,
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl bg-forest border border-emerald-700/60 px-3.5 py-1 text-xs font-bold text-emerald-300 hover:bg-emerald-900 transition-colors"
                    >
                      Connect on WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ========================================================
          ADD / EDIT PRODUCT MODAL
          ======================================================== */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-xl rounded-3xl border border-gold/40 bg-[#132a20] p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <h3 className="font-display text-xl font-bold text-white">
                {editingProductSlug ? "Edit Product Remedy" : "Add New Remedy to Catalog"}
              </h3>
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="text-zinc-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="mt-5 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Golden Pyrite Wealth Tree"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-[#0a1811] border border-zinc-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-[#0a1811] border border-zinc-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-gold"
                  >
                    <option value="Crystal Trees">Crystal Trees</option>
                    <option value="Crystal Pyramids">Crystal Pyramids</option>
                    <option value="Crystal Bracelets">Crystal Bracelets</option>
                    <option value="Malas">Malas</option>
                    <option value="Vastu Products">Vastu Products</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full bg-[#0a1811] border border-zinc-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">MRP (₹)</label>
                  <input
                    type="number"
                    required
                    value={formMrp}
                    onChange={(e) => setFormMrp(Number(e.target.value))}
                    className="w-full bg-[#0a1811] border border-zinc-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Star Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={formRating}
                    onChange={(e) => setFormRating(Number(e.target.value))}
                    className="w-full bg-[#0a1811] border border-zinc-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Image URL or Asset Path</label>
                <input
                  type="text"
                  placeholder="/assets/hero-tree.jpg or https://..."
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full bg-[#0a1811] border border-zinc-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Short Remedy Blurb</label>
                <textarea
                  rows={2}
                  value={formBlurb}
                  onChange={(e) => setFormBlurb(e.target.value)}
                  placeholder="Quick summary of spiritual intention and benefits..."
                  className="w-full bg-[#0a1811] border border-zinc-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-gold"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="bestsellerCheck"
                  checked={formIsBestseller}
                  onChange={(e) => setFormIsBestseller(e.target.checked)}
                  className="accent-gold h-4 w-4"
                />
                <label htmlFor="bestsellerCheck" className="text-zinc-300 font-semibold cursor-pointer">
                  Mark as Bestseller Remedy (shows special badge)
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="rounded-xl border border-zinc-700 px-4 py-2 text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-gold px-6 py-2 text-forest font-bold hover:bg-gold-deep hover:text-white transition-all shadow"
                >
                  Save Remedy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
