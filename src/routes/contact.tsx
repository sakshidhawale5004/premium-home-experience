import { useState, useId } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { STORE } from "@/data/products";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      {
        title: "Contact Us & Registered Atelier | Vastu Adda",
      },
      {
        name: "description",
        content:
          "Connect with Vastu Adda for remedy inquiries, order tracking, and corporate gifting. WhatsApp +91 90212 65071, email info.vastuadda@gmail.com, or visit our Mumbai atelier.",
      },
      { property: "og:title", content: "Contact Us & Registered Atelier | Vastu Adda" },
      {
        property: "og:description",
        content:
          "Direct WhatsApp & phone support, email inquiries, and Dahisar East Mumbai registered office details.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Order Tracking & Status");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const nameInputId = useId();
  const phoneInputId = useId();
  const emailInputId = useId();
  const subjectInputId = useId();
  const messageInputId = useId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !message.trim()) return;

    // Save to CRM Inquiries in localStorage
    try {
      const storedInquiries = JSON.parse(localStorage.getItem("vastu_inquiries") || "[]");
      const newInquiry = {
        id: `INQ-${Date.now().toString().slice(-4)}`,
        name: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || "Not provided",
        interest: subject,
        message: message.trim(),
        date: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        status: "New Lead",
      };
      storedInquiries.unshift(newInquiry);
      localStorage.setItem("vastu_inquiries", JSON.stringify(storedInquiries));
    } catch {
      // safe fallback
    }

    setSubmitted(true);
  };

  const directWhatsappUrl = `${STORE.whatsapp}?text=${encodeURIComponent(
    `Hello Vastu Adda!\n\nName: ${fullName || "[Your Name]"}\nTopic: ${subject}\nMessage: ${message || "I would like to inquire about my order."}`,
  )}`;

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-forest py-16 text-primary-foreground sm:py-20 border-b border-gold/30">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <p className="eyebrow text-gold font-bold">We Are Here to Assist You</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold text-primary-foreground">
            Connect With Vastu Adda
          </h1>
          <div className="gold-line mx-auto mt-4 w-28" />
          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-primary-foreground/85">
            Reach out for order updates, remedy recommendations, or wholesale corporate gifting. Our dedicated atelier team is available daily to assist your sacred journey.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        {/* 3 Key Contact Channels Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Channel 1: WhatsApp & Phone */}
          <div className="card-lift flex flex-col justify-between rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm hover:border-gold/50 transition-all">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                  <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.5 14.1c-.2.7-1.3 1.3-1.9 1.3-.5 0-1.1.1-3.4-.9-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.6-1.1-3s.7-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .7.5s.9 2.1 1 2.2c0 .1.1.3 0 .5-.4.8-.9.9-.6 1.4.5.9 1.2 1.7 2 2.3.9.7 1.3.8 1.6.6.2-.1.7-.9 1-1.2.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .8-.1 1.1Z" />
                </svg>
              </div>
              <h2 className="mt-4 font-display text-xl font-bold text-forest">
                Direct Phone &amp; WhatsApp
              </h2>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Connect directly with our customer concierge for real-time order status, pincode checks, and dispatch tracking.
              </p>
              <div className="mt-4">
                <a
                  href={STORE.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="font-display text-lg font-bold text-forest hover:text-gold-deep transition-colors block"
                >
                  {STORE.phone}
                </a>
                <span className="text-[0.72rem] text-muted-foreground block mt-0.5">
                  Available Mon – Sat: 10:00 AM – 7:00 PM IST
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <a
                href={STORE.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-forest px-4 py-2.5 text-xs font-bold text-primary-foreground uppercase shadow hover:bg-forest/90 transition-all"
              >
                <span>Chat on WhatsApp</span>
                <span aria-hidden="true">→</span>
              </a>
              <a
                href={`tel:${STORE.phone.replace(/\s/g, "")}`}
                className="flex items-center justify-center rounded-xl border border-border bg-secondary/50 px-4 py-2 text-xs font-semibold text-foreground hover:bg-secondary transition-colors"
              >
                Call Concierge
              </a>
            </div>
          </div>

          {/* Channel 2: Email Inquiries */}
          <div className="card-lift flex flex-col justify-between rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm hover:border-gold/50 transition-all">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-800 border border-amber-200">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <h2 className="mt-4 font-display text-xl font-bold text-forest">
                Email Inquiries
              </h2>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                For formal corporate inquiries, invoice requests, partnerships, and detailed order clarifications.
              </p>
              <div className="mt-4">
                <a
                  href={`mailto:${STORE.email}`}
                  className="font-display text-base sm:text-lg font-bold text-forest hover:text-gold-deep transition-colors break-all block"
                >
                  {STORE.email}
                </a>
                <span className="text-[0.72rem] text-muted-foreground block mt-0.5">
                  Guaranteed response within 24 business hours
                </span>
              </div>
            </div>

            <div className="mt-6">
              <a
                href={`mailto:${STORE.email}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-forest px-4 py-2.5 text-xs font-bold text-primary-foreground uppercase shadow hover:bg-forest/90 transition-all"
              >
                <span>Send an Email</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Channel 3: Registered Office & Atelier */}
          <div className="card-lift flex flex-col justify-between rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm hover:border-gold/50 transition-all">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-gold-deep border border-gold/30">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h2 className="mt-4 font-display text-xl font-bold text-forest">
                Registered Office &amp; Atelier
              </h2>
              <p className="mt-2 text-xs font-semibold text-forest uppercase tracking-wider">
                AVM Cloud Pro LLP
              </p>
              <address className="mt-2 text-xs not-italic text-muted-foreground leading-relaxed">
                203, 5th Floor, The Platina, Tanvi Complex,<br />
                S.V. Road, Dahisar East,<br />
                Mumbai – 400068, Maharashtra, India
              </address>
              <span className="text-[0.72rem] text-muted-foreground block mt-2">
                Landmark: Tanvi Complex, S.V. Road
              </span>
            </div>

            <div className="mt-6">
              <a
                href="https://maps.google.com/?q=The+Platina+Tanvi+Complex+SV+Road+Dahisar+East+Mumbai+400068"
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-secondary/50 px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-secondary transition-colors"
              >
                <span>View on Maps</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Form and Operational Details */}
        <div className="mt-14 grid gap-10 lg:grid-cols-12 items-start">
          {/* Left Column: Inquiry Form */}
          <div className="lg:col-span-7 rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-sm">
            <h2 className="font-display text-2xl font-bold text-forest">
              Send Us a Direct Message
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Fill in your details and our team will get in touch with you promptly.
            </p>

            {submitted ? (
              <div className="mt-6 rounded-2xl border border-emerald-300 bg-emerald-50 p-6 text-center text-xs">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 mb-3">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-display text-lg font-bold text-emerald-900">
                  Message Sent Successfully!
                </h3>
                <p className="mt-1 text-emerald-800 leading-relaxed max-w-md mx-auto">
                  Thank you, <strong>{fullName}</strong>. We have registered your inquiry and our atelier support team will reply within 24 hours.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <a
                    href={directWhatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-forest px-5 py-2.5 text-xs font-bold text-primary-foreground shadow"
                  >
                    Continue on WhatsApp Now ↗
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setMessage("");
                    }}
                    className="rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-medium text-foreground hover:bg-secondary"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor={nameInputId} className="block font-semibold text-foreground mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id={nameInputId}
                      type="text"
                      required
                      placeholder="e.g. Ramesh Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-foreground focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor={phoneInputId} className="block font-semibold text-foreground mb-1">
                      Phone Number (WhatsApp) <span className="text-red-500">*</span>
                    </label>
                    <input
                      id={phoneInputId}
                      type="tel"
                      required
                      placeholder="9876543210"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-foreground focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor={emailInputId} className="block font-semibold text-foreground mb-1">
                      Email Address <span className="text-muted-foreground font-normal">(Optional)</span>
                    </label>
                    <input
                      id={emailInputId}
                      type="email"
                      placeholder="your.email@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-foreground focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor={subjectInputId} className="block font-semibold text-foreground mb-1">
                      Inquiry Subject
                    </label>
                    <select
                      id={subjectInputId}
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-foreground focus:border-gold focus:outline-none"
                    >
                      <option value="Order Tracking & Status">Order Tracking &amp; Status</option>
                      <option value="Product Details & Verification">Product Details &amp; Verification</option>
                      <option value="Bulk & Corporate Gifting">Bulk &amp; Corporate Gifting</option>
                      <option value="Shipping & Delivery Pincode Check">Shipping &amp; Delivery Pincode Check</option>
                      <option value="Returns & Exchanges">Returns &amp; Exchanges</option>
                      <option value="Other Inquiries">Other Inquiries</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor={messageInputId} className="block font-semibold text-foreground mb-1">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id={messageInputId}
                    required
                    rows={4}
                    placeholder="Tell us how we can help you..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-foreground focus:border-gold focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-forest py-3.5 px-6 text-xs font-bold text-primary-foreground uppercase tracking-wider shadow hover:bg-forest/90 transition-all"
                  >
                    Submit Message
                  </button>
                  <a
                    href={directWhatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-emerald-600 bg-emerald-50 py-3 px-5 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition-colors"
                  >
                    <span>Instant WhatsApp</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: FAQ & Dispatch Notice */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
              <h3 className="font-display text-lg font-bold text-forest">
                Customer Assurance Standards
              </h3>
              <div className="mt-4 space-y-4 text-xs leading-relaxed text-muted-foreground">
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest text-primary-foreground text-[0.65rem] font-bold">
                    ✓
                  </span>
                  <div>
                    <strong className="text-foreground block">Pan-India Express Dispatch:</strong>
                    Orders are packed in multi-layer velvet cushioning with Selenite plates and dispatched within 24 to 48 hours.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest text-primary-foreground text-[0.65rem] font-bold">
                    ✓
                  </span>
                  <div>
                    <strong className="text-foreground block">Cash on Delivery &amp; UPI:</strong>
                    Flexible payment options across 19,000+ Indian postal codes with Flat ₹500 Cashback on prepaid orders.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest text-primary-foreground text-[0.65rem] font-bold">
                    ✓
                  </span>
                  <div>
                    <strong className="text-foreground block">7-Day Return Guarantee:</strong>
                    Damaged or defective parcels are replaced immediately with no questions asked.
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Link Card */}
            <div className="rounded-3xl border border-gold/40 bg-secondary/50 p-6 text-center">
              <p className="font-display text-base font-bold text-forest">
                Looking for our Sacred Catalog?
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Explore our full collection of 21 authentic earth remedies.
              </p>
              <div className="mt-4">
                <Link
                  to="/collections"
                  className="inline-block rounded-full bg-gold px-6 py-2.5 text-xs font-bold text-forest uppercase tracking-wider shadow hover:bg-gold-deep hover:text-white transition-all"
                >
                  Explore All Collections →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
