import { useState, useId } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useShop, inr } from "@/lib/shop";
import { STORE } from "@/data/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      {
        title: "Secure Checkout | Vastu Adda",
      },
      {
        name: "description",
        content:
          "Complete your order for 100% authentic Vedic energized crystals and Vastu remedies with secure UPI, Cards, Net Banking, or Cash on Delivery.",
      },
      { property: "og:title", content: "Secure Checkout | Vastu Adda" },
      {
        property: "og:description",
        content:
          "Fast doorstep delivery with Cash on Delivery & UPI Cashback across India.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: CheckoutPage,
});

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Chandigarh",
  "Puducherry",
];

interface PlacedOrderDetails {
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
  date: string;
}

function CheckoutPage() {
  const { lines, subtotal, totalMrp, totalSavings, setQty, remove, clear, productFor } =
    useShop();

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Maharashtra");
  const [pincode, setPincode] = useState("");
  const [sankalpName, setSankalpName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "cod" | "card" | "netbanking">("upi");

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Form Validation & Errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Order Placed Success State
  const [placedOrder, setPlacedOrder] = useState<PlacedOrderDetails | null>(null);

  const nameInputId = useId();
  const phoneInputId = useId();
  const emailInputId = useId();
  const address1InputId = useId();
  const address2InputId = useId();
  const cityInputId = useId();
  const stateInputId = useId();
  const pincodeInputId = useId();
  const sankalpInputId = useId();
  const couponInputId = useId();

  // Calculate discounts
  let couponDiscount = 0;
  if (appliedCoupon === "VASTU10") {
    couponDiscount = Math.round(subtotal * 0.1);
  } else if (appliedCoupon === "WELCOME500") {
    couponDiscount = subtotal >= 1000 ? 500 : 0;
  }

  const finalTotal = Math.max(0, subtotal - couponDiscount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (code === "VASTU10") {
      setAppliedCoupon("VASTU10");
      setCouponCode("");
    } else if (code === "WELCOME500") {
      if (subtotal < 1000) {
        setCouponError("WELCOME500 requires minimum order of ₹1,000");
      } else {
        setAppliedCoupon("WELCOME500");
        setCouponCode("");
      }
    } else {
      setCouponError("Invalid promo code. Try VASTU10 for 10% off!");
    }
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = "Please enter your full name.";
    if (!phone.trim()) {
      errs.phone = "Please enter your mobile number.";
    } else if (!/^[6-9]\d{9}$/.test(phone.replace(/\D/g, ""))) {
      errs.phone = "Please enter a valid 10-digit Indian phone number.";
    }
    if (!addressLine1.trim()) errs.addressLine1 = "Flat / House / Building details required.";
    if (!city.trim()) errs.city = "Please enter your city.";
    if (!pincode.trim()) {
      errs.pincode = "Please enter your 6-digit PIN code.";
    } else if (!/^\d{6}$/.test(pincode.trim())) {
      errs.pincode = "Enter a valid 6-digit PIN code.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 120, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    const generatedOrderId = `VA-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    const itemsSummary = lines
      .map((l) => {
        const p = productFor(l.slug);
        return p ? { name: p.name, qty: l.qty, price: p.price } : null;
      })
      .filter((x): x is { name: string; qty: number; price: number } => x !== null);

    const orderDetails: PlacedOrderDetails = {
      orderId: generatedOrderId,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || "Not provided",
      addressLine1: addressLine1.trim(),
      addressLine2: addressLine2.trim() || "-",
      city: city.trim(),
      state,
      pincode: pincode.trim(),
      sankalpName: sankalpName.trim() || "Household Blessing",
      paymentMethod,
      items: itemsSummary,
      subtotal,
      discount: couponDiscount,
      total: finalTotal,
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };

    // Live Sync with CRM
    try {
      const storedOrders = JSON.parse(localStorage.getItem("vastu_orders") || "[]");
      storedOrders.unshift({
        ...orderDetails,
        status: "Pending",
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("vastu_orders", JSON.stringify(storedOrders));

      // Update customers CRM directory
      const storedCustomers = JSON.parse(localStorage.getItem("vastu_customers") || "[]");
      const existingCustIdx = storedCustomers.findIndex(
        (c: { phone?: string; email?: string }) =>
          c.phone === orderDetails.phone ||
          (c.email && c.email !== "Not provided" && c.email === orderDetails.email),
      );
      if (existingCustIdx >= 0) {
        storedCustomers[existingCustIdx].ordersCount += 1;
        storedCustomers[existingCustIdx].totalSpend += orderDetails.total;
        storedCustomers[existingCustIdx].lastOrderDate = orderDetails.date;
      } else {
        storedCustomers.unshift({
          id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
          name: orderDetails.fullName,
          phone: orderDetails.phone,
          email: orderDetails.email,
          city: orderDetails.city,
          state: orderDetails.state,
          ordersCount: 1,
          totalSpend: orderDetails.total,
          segment: orderDetails.total >= 3000 ? "VIP Patron" : "New Patron",
          lastOrderDate: orderDetails.date,
        });
      }
      localStorage.setItem("vastu_customers", JSON.stringify(storedCustomers));
      window.dispatchEvent(new Event("vastu:orders-updated"));
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      setPlacedOrder(orderDetails);
      clear();
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 700);
  };

  // 1. ORDER CONFIRMATION SCREEN
  if (placedOrder) {
    const paymentLabel =
      placedOrder.paymentMethod === "cod"
        ? "Cash on Delivery (COD)"
        : placedOrder.paymentMethod === "upi"
        ? "UPI Prepaid (₹500 Cashback Applied)"
        : placedOrder.paymentMethod === "card"
        ? "Debit / Credit Card"
        : "Net Banking";

    const whatsappMessage = encodeURIComponent(
      `🙏 *Order Confirmation — Vastu Adda*\n\n` +
        `• *Order ID:* ${placedOrder.orderId}\n` +
        `• *Customer:* ${placedOrder.fullName}\n` +
        `• *Phone:* ${placedOrder.phone}\n` +
        `• *Delivery Address:* ${placedOrder.addressLine1}, ${placedOrder.addressLine2}, ${placedOrder.city}, ${placedOrder.state} - ${placedOrder.pincode}\n` +
        `• *Consecration Name:* ${placedOrder.sankalpName}\n` +
        `• *Payment Method:* ${paymentLabel}\n` +
        `• *Total Payable:* ${inr(placedOrder.total)}\n\n` +
        `*Items Ordered:*\n` +
        placedOrder.items.map((it) => ` - ${it.qty}x ${it.name} (${inr(it.price * it.qty)})`).join("\n") +
        `\n\n_Please confirm dispatch and tracking details. Thank you!_`,
    );

    return (
      <div className="bg-background min-h-screen py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="overflow-hidden rounded-3xl border border-gold/40 bg-card p-6 sm:p-10 shadow-xl">
            {/* Success Header */}
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className="mt-4 inline-block rounded-full bg-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-gold-deep">
                Vedic Order Received
              </span>
              <h1 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-forest">
                Thank You, {placedOrder.fullName}!
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Your order <span className="font-semibold text-forest">#{placedOrder.orderId}</span> has been confirmed.
              </p>
            </div>

            {/* Sacred Consecration Box */}
            <div className="mt-8 rounded-2xl border border-gold/30 bg-secondary/50 p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest text-primary-foreground text-xs font-bold">
                  ✓
                </span>
                <div className="text-xs leading-relaxed text-foreground/85">
                  <p className="font-semibold text-forest text-sm">
                    Pre-Consecration Ritual Initiated
                  </p>
                  <p className="mt-1">
                    Your remedies are being consecrated with holy Ganga Jal and planetary beej mantras in the name of{" "}
                    <strong className="text-forest">{placedOrder.sankalpName}</strong>. Includes complimentary raw Selenite cleansing plate and signed Consecration Certificate.
                  </p>
                </div>
              </div>
            </div>

            {/* Order Details Grid */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2 text-xs border-t border-border pt-6">
              <div>
                <p className="font-semibold text-muted-foreground uppercase tracking-wider text-[0.7rem]">
                  Delivery Address
                </p>
                <p className="mt-1 font-medium text-foreground text-sm">{placedOrder.fullName}</p>
                <p className="mt-0.5 text-muted-foreground">
                  {placedOrder.addressLine1}, {placedOrder.addressLine2}
                </p>
                <p className="text-muted-foreground">
                  {placedOrder.city}, {placedOrder.state} — {placedOrder.pincode}
                </p>
                <p className="mt-1 text-forest font-semibold">Phone: +91 {placedOrder.phone}</p>
              </div>

              <div>
                <p className="font-semibold text-muted-foreground uppercase tracking-wider text-[0.7rem]">
                  Payment & Delivery Status
                </p>
                <p className="mt-1 text-sm font-semibold text-forest">{paymentLabel}</p>
                <p className="mt-0.5 text-muted-foreground">
                  Total Amount: <strong className="text-forest text-sm">{inr(placedOrder.total)}</strong>
                </p>
                <p className="mt-1 text-muted-foreground">
                  Est. Delivery: 3 to 5 business days via Insured Express Courier
                </p>
              </div>
            </div>

            {/* Ordered Items Preview */}
            <div className="mt-6 border-t border-border pt-6">
              <p className="font-semibold text-muted-foreground uppercase tracking-wider text-[0.7rem]">
                Consecrated Items in Package ({placedOrder.items.length})
              </p>
              <div className="mt-3 space-y-2">
                {placedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1 text-xs">
                    <span className="text-foreground">
                      <strong className="text-forest">{item.qty}x</strong> {item.name}
                    </span>
                    <span className="font-semibold text-forest">{inr(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href={`${STORE.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-forest px-6 py-3.5 text-xs font-bold tracking-wider text-primary-foreground uppercase shadow hover:bg-forest/90 transition-all"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.5 14.1c-.2.7-1.3 1.3-1.9 1.3-.5 0-1.1.1-3.4-.9-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.6-1.1-3s.7-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .7.5s.9 2.1 1 2.2c0 .1.1.3 0 .5-.4.8-.9.9-.6 1.4.5.9 1.2 1.7 2 2.3.9.7 1.3.8 1.6.6.2-.1.7-.9 1-1.2.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .8-.1 1.1Z" />
                </svg>
                <span>Track &amp; Confirm on WhatsApp</span>
              </a>

              <Link
                to="/collections"
                className="flex items-center justify-center rounded-xl border border-border bg-card px-6 py-3.5 text-xs font-semibold tracking-wider text-foreground uppercase hover:bg-secondary transition-all text-center"
              >
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. EMPTY CART SCREEN
  if (lines.length === 0) {
    return (
      <div className="bg-background min-h-[70vh] flex items-center justify-center py-20 px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-forest">
            <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <path d="M3 6h18"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
          <h1 className="mt-6 font-display text-2xl font-bold text-forest">
            Your Sacred Cart is Empty
          </h1>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            You do not have any remedies in your cart yet. Browse our lab-certified crystals, orgonite pyramids and rudraksha malas.
          </p>
          <div className="mt-8">
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 rounded-full bg-forest px-8 py-3.5 text-xs font-bold tracking-wider text-primary-foreground uppercase shadow hover:bg-forest/90 transition-all"
            >
              <span>Explore Sacred Collections</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. MAIN CHECKOUT WORKFLOW
  return (
    <div className="bg-background min-h-screen py-8 sm:py-14">
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        {/* Checkout Header & Trust Banner */}
        <div className="border-b border-border pb-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Link to="/collections" className="hover:text-forest transition-colors">
                Shop
              </Link>
              <span>/</span>
              <span className="text-forest font-semibold">Checkout</span>
            </div>
            <h1 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-forest">
              Secure Sacred Checkout
            </h1>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-secondary/80 border border-gold/30 px-3.5 py-2 text-xs text-forest">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-emerald-700 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className="font-medium">256-Bit SSL Encrypted &amp; Guaranteed Genuine</span>
          </div>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Customer Details, Address & Payment */}
          <div className="space-y-6 lg:col-span-7">
            {/* 1. Contact Information */}
            <div className="rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm">
              <div className="flex items-center gap-2.5 pb-4 border-b border-border">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-forest text-primary-foreground text-xs font-bold">
                  1
                </span>
                <h2 className="font-display text-base sm:text-lg font-bold text-forest">
                  Customer &amp; Contact Information
                </h2>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor={nameInputId} className="block text-xs font-semibold text-foreground">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id={nameInputId}
                    type="text"
                    required
                    placeholder="e.g. Ramesh Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`mt-1.5 w-full rounded-xl border bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-none ${
                      errors.fullName ? "border-red-500 focus:border-red-500" : "border-border focus:border-gold"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-[0.7rem] text-red-500">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor={phoneInputId} className="block text-xs font-semibold text-foreground">
                    Phone Number (WhatsApp) <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1.5 flex rounded-xl border border-border bg-background overflow-hidden focus-within:border-gold">
                    <span className="bg-secondary px-3 py-2.5 text-xs font-semibold text-muted-foreground border-r border-border">
                      +91
                    </span>
                    <input
                      id={phoneInputId}
                      type="tel"
                      required
                      placeholder="9876543210"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-transparent px-3 py-2.5 text-xs text-foreground focus:outline-none"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-[0.7rem] text-red-500">{errors.phone}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor={emailInputId} className="block text-xs font-semibold text-foreground">
                    Email Address <span className="text-xs text-muted-foreground font-normal">(For tracking &amp; Vedic certificate)</span>
                  </label>
                  <input
                    id={emailInputId}
                    type="email"
                    placeholder="ramesh@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-gold focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm">
              <div className="flex items-center gap-2.5 pb-4 border-b border-border">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-forest text-primary-foreground text-xs font-bold">
                  2
                </span>
                <h2 className="font-display text-base sm:text-lg font-bold text-forest">
                  Doorstep Delivery Address
                </h2>
              </div>

              <div className="mt-5 space-y-4 text-xs">
                <div>
                  <label htmlFor={address1InputId} className="block font-semibold text-foreground">
                    Flat / House No. / Building / Floor <span className="text-red-500">*</span>
                  </label>
                  <input
                    id={address1InputId}
                    type="text"
                    required
                    placeholder="e.g. Flat 402, Shivam Heights"
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    className={`mt-1.5 w-full rounded-xl border bg-background px-3.5 py-2.5 text-foreground focus:outline-none ${
                      errors.addressLine1 ? "border-red-500 focus:border-red-500" : "border-border focus:border-gold"
                    }`}
                  />
                  {errors.addressLine1 && (
                    <p className="mt-1 text-[0.7rem] text-red-500">{errors.addressLine1}</p>
                  )}
                </div>

                <div>
                  <label htmlFor={address2InputId} className="block font-semibold text-foreground">
                    Street Address / Colony / Area
                  </label>
                  <input
                    id={address2InputId}
                    type="text"
                    placeholder="e.g. MG Road, Near City Mall"
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-foreground focus:border-gold focus:outline-none"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label htmlFor={pincodeInputId} className="block font-semibold text-foreground">
                      PIN Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      id={pincodeInputId}
                      type="text"
                      required
                      placeholder="400001"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                      className={`mt-1.5 w-full rounded-xl border bg-background px-3.5 py-2.5 text-foreground focus:outline-none ${
                        errors.pincode ? "border-red-500 focus:border-red-500" : "border-border focus:border-gold"
                      }`}
                    />
                    {errors.pincode && (
                      <p className="mt-1 text-[0.7rem] text-red-500">{errors.pincode}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor={cityInputId} className="block font-semibold text-foreground">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      id={cityInputId}
                      type="text"
                      required
                      placeholder="e.g. Mumbai"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={`mt-1.5 w-full rounded-xl border bg-background px-3.5 py-2.5 text-foreground focus:outline-none ${
                        errors.city ? "border-red-500 focus:border-red-500" : "border-border focus:border-gold"
                      }`}
                    />
                    {errors.city && (
                      <p className="mt-1 text-[0.7rem] text-red-500">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor={stateInputId} className="block font-semibold text-foreground">
                      State <span className="text-red-500">*</span>
                    </label>
                    <select
                      id={stateInputId}
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-foreground focus:border-gold focus:outline-none"
                    >
                      {INDIAN_STATES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Optional Consecration Name */}
                <div className="pt-2">
                  <label htmlFor={sankalpInputId} className="block font-semibold text-foreground">
                    Name for Vedic Blessing Sankalp <span className="text-xs text-muted-foreground font-normal">(Optional)</span>
                  </label>
                  <input
                    id={sankalpInputId}
                    type="text"
                    placeholder="e.g. Ramesh &amp; Priya Sharma"
                    value={sankalpName}
                    onChange={(e) => setSankalpName(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-foreground focus:border-gold focus:outline-none"
                  />
                  <p className="mt-1 text-[0.7rem] text-muted-foreground">
                    Our Vedic Astrologer will recite specific planetary mantras with this name during pre-consecration.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Payment Method Selection */}
            <div className="rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm">
              <div className="flex items-center gap-2.5 pb-4 border-b border-border">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-forest text-primary-foreground text-xs font-bold">
                  3
                </span>
                <h2 className="font-display text-base sm:text-lg font-bold text-forest">
                  Select Payment Method
                </h2>
              </div>

              <div className="mt-5 space-y-3">
                {/* Option 1: UPI */}
                <label
                  className={`flex cursor-pointer items-start justify-between rounded-2xl border p-4 transition-all ${
                    paymentMethod === "upi"
                      ? "border-emerald-600 bg-emerald-50/50 shadow-sm"
                      : "border-border bg-background hover:bg-secondary/40"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                      className="mt-1 accent-forest"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-forest text-sm">UPI / QR (GPay, PhonePe, Paytm)</span>
                        <span className="rounded bg-emerald-700 px-2 py-0.5 text-[0.65rem] font-bold text-white uppercase">
                          Flat ₹500 Cashback
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Instant payment via QR code or UPI app with fastest priority dispatch.
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold">
                    <span className="text-[#00b9f5] bg-white px-1.5 py-0.5 rounded shadow-xs border">Paytm</span>
                    <span className="text-[#5f259f] bg-white px-1.5 py-0.5 rounded shadow-xs border">PhonePe</span>
                    <span className="text-slate-800 bg-white px-1.5 py-0.5 rounded shadow-xs border">GPay</span>
                  </div>
                </label>

                {/* Option 2: Cash on Delivery (COD) */}
                <label
                  className={`flex cursor-pointer items-start justify-between rounded-2xl border p-4 transition-all ${
                    paymentMethod === "cod"
                      ? "border-emerald-600 bg-emerald-50/50 shadow-sm"
                      : "border-border bg-background hover:bg-secondary/40"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="mt-1 accent-forest"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-forest text-sm">Cash on Delivery (COD)</span>
                        <span className="rounded bg-gold px-2 py-0.5 text-[0.65rem] font-bold text-forest uppercase">
                          Available
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Pay in cash or UPI directly at your doorstep when the parcel arrives.
                      </p>
                    </div>
                  </div>
                </label>

                {/* Option 3: Cards & Net Banking */}
                <label
                  className={`flex cursor-pointer items-start justify-between rounded-2xl border p-4 transition-all ${
                    paymentMethod === "card"
                      ? "border-emerald-600 bg-emerald-50/50 shadow-sm"
                      : "border-border bg-background hover:bg-secondary/40"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="mt-1 accent-forest"
                    />
                    <div>
                      <span className="font-semibold text-forest text-sm">Credit / Debit Card or Net Banking</span>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Visa, MasterCard, RuPay &amp; all major Indian banks supported.
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary, Coupon & Place Order */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm">
              <h2 className="font-display text-lg font-bold text-forest pb-3 border-b border-border">
                Order Summary ({lines.reduce((n, l) => n + l.qty, 0)} Items)
              </h2>

              {/* Items List */}
              <div className="divide-y divide-border/60 max-h-72 overflow-y-auto pr-1 mt-3">
                {lines.map((line) => {
                  const product = productFor(line.slug);
                  if (!product) return null;
                  return (
                    <div key={line.slug} className="py-3 flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-14 w-14 rounded-xl object-cover bg-secondary border border-border shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-forest truncate">{product.name}</p>
                        <p className="text-[0.65rem] text-muted-foreground">
                          {inr(product.price)} each • <span className="text-emerald-700 font-medium">Free Selenite Plate</span>
                        </p>
                        <div className="mt-1.5 flex items-center gap-2">
                          <div className="flex items-center rounded-lg border border-border bg-secondary/50 text-xs">
                            <button
                              type="button"
                              onClick={() => setQty(line.slug, line.qty - 1)}
                              className="px-2 py-0.5 text-muted-foreground hover:text-forest"
                            >
                              -
                            </button>
                            <span className="px-2 font-semibold text-forest">{line.qty}</span>
                            <button
                              type="button"
                              onClick={() => setQty(line.slug, line.qty + 1)}
                              className="px-2 py-0.5 text-muted-foreground hover:text-forest"
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(line.slug)}
                            className="text-[0.68rem] text-red-500 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-forest">{inr(product.price * line.qty)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Coupon Box */}
              <div className="mt-5 border-t border-border pt-4">
                <div className="flex gap-2">
                  <input
                    id={couponInputId}
                    type="text"
                    placeholder="Coupon code (e.g. VASTU10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-xs uppercase text-foreground focus:border-gold focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="rounded-xl bg-forest px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-forest/90 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="mt-1 text-[0.7rem] text-red-500">{couponError}</p>}
                {appliedCoupon && (
                  <div className="mt-2 flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-1.5 text-xs text-emerald-800 border border-emerald-200">
                    <span>
                      Coupon <strong>{appliedCoupon}</strong> applied!
                    </span>
                    <button
                      type="button"
                      onClick={() => setAppliedCoupon(null)}
                      className="text-[0.65rem] text-emerald-900 font-bold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Price Calculation */}
              <div className="mt-5 border-t border-border pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-medium text-foreground">{inr(subtotal)}</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Product Savings</span>
                    <span>-{inr(totalSavings)}</span>
                  </div>
                )}
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Coupon Discount</span>
                    <span>-{inr(couponDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>Express Shipping</span>
                  <span className="font-semibold text-emerald-700">FREE</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Vedic Consecration &amp; Selenite Bedding</span>
                  <span className="font-semibold text-emerald-700">FREE</span>
                </div>

                <div className="flex items-baseline justify-between pt-3 border-t border-border">
                  <span className="font-display text-base font-bold text-forest">Total Payable</span>
                  <div className="text-right">
                    {totalMrp > finalTotal && (
                      <span className="text-xs text-muted-foreground line-through mr-2">
                        {inr(totalMrp)}
                      </span>
                    )}
                    <span className="font-display text-2xl font-bold text-forest">
                      {inr(finalTotal)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Primary CTA Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-4 px-4 text-xs font-bold tracking-widest text-white uppercase shadow-xl hover:bg-zinc-900 active:scale-98 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processing Sacred Order...</span>
                ) : (
                  <span>
                    {paymentMethod === "cod"
                      ? `PLACE ORDER — CASH ON DELIVERY (${inr(finalTotal)})`
                      : `PROCEED TO PAY ${inr(finalTotal)}`}
                  </span>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-[0.7rem] text-muted-foreground">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-gold-deep" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>7-Day Hassle-Free Returns &amp; Pan-India Coverage</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
