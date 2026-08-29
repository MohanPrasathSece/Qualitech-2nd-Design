import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { Trash2, ArrowRight, Check, ShoppingBag, CreditCard, ShieldCheck } from "lucide-react";
import { useCart, useProducts, formatINR } from "@/lib/store";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { toast } from "sonner";
import connectorsImage from "@/assets/connectors.jpg";

export default function CartPage() {
  const { lines, count, setQty, remove, clear } = useCart();
  const { getProduct } = useProducts();

  const [checkoutStep, setCheckoutStep] = useState<"cart" | "success">("cart");
  const [orderForm, setOrderForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
  });

  // Hydrate cart lines with product details
  const cartItems = useMemo(() => {
    return lines
      .map((line) => {
        const product = getProduct(line.id);
        return product ? { product, qty: line.qty } : null;
      })
      .filter((item): item is { product: any; qty: number } => item !== null);
  }, [lines, getProduct]);

  // Calculate subtotal
  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const price = item.product.price || 0;
      return sum + price * item.qty;
    }, 0);
  }, [cartItems]);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderForm.name || !orderForm.email || !orderForm.phone || !orderForm.address) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setCheckoutStep("success");
    toast.success("Order request submitted successfully.");
    
    // Clear cart after checkout
    setTimeout(() => {
      clear();
    }, 100);
  };

  if (checkoutStep === "success") {
    return (
      <div className="mx-auto max-w-[600px] px-5 py-24 text-center">
        <Reveal className="flex flex-col items-center">
          <div className="rounded-full bg-emerald-100 p-5 text-emerald-600">
            <Check className="size-10" />
          </div>
          <h2 className="mt-8 text-3xl font-extrabold text-foreground">Order Request Submitted</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Thank you for your order! We have received your request. A representative from Qualitech Connectronics will email you shortly with an official proforma invoice and lead time specifications.
          </p>
          <div className="mt-8 flex flex-col gap-3 w-full sm:flex-row justify-center">
            <Link
              to="/products"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-graphite px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-steel"
            >
              Continue Browsing
            </Link>
            <Link
              to="/"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-card px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Back to Home
            </Link>
          </div>
        </Reveal>
      </div>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Checkout"
        title="Your Cart"
        lead="Manage quantities, review order details, and submit a quote/dispatch order request directly to our desk."
        image={connectorsImage}
      />

      <section className="mx-auto max-w-[1400px] px-5 py-12 lg:px-10 lg:py-20">
        {cartItems.length === 0 ? (
          <Reveal className="text-center py-20 rounded-xl border border-dashed border-border bg-card">
            <div className="mx-auto rounded-full bg-platinum p-4 w-fit text-muted-foreground">
              <ShoppingBag className="size-8" />
            </div>
            <h3 className="mt-6 text-xl font-bold text-foreground">Your cart is empty</h3>
            <p className="mt-2 text-sm text-muted-foreground">Add products from our catalogue to start an order.</p>
            <Link
              to="/products"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-graphite px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-steel"
            >
              Browse Products
            </Link>
          </Reveal>
        ) : (
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Cart Items List */}
            <div className="lg:col-span-7 space-y-6">
              <Reveal>
                <h3 className="text-lg font-bold text-foreground">Items in your cart</h3>
              </Reveal>

              <div className="divide-y divide-border border-y border-border">
                {cartItems.map((item, idx) => (
                  <Reveal key={item.product.id} delay={idx * 60}>
                    <div className="flex flex-col py-6 sm:flex-row sm:items-center sm:justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="size-20 shrink-0 overflow-hidden rounded-xl border border-border bg-platinum">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="size-full object-cover grayscale"
                          />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-foreground">{item.product.name}</h4>
                          <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mt-0.5">
                            {item.product.code}
                          </p>
                          <p className="text-sm font-bold text-foreground mt-2">
                            {item.product.price === null ? "On Request" : formatINR(item.product.price)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-6">
                        {/* Quantity controls */}
                        <div className="flex h-9 items-center rounded-xl border border-border bg-card">
                          <button
                            onClick={() => setQty(item.product.id, item.qty - 1)}
                            className="px-3 text-muted-foreground hover:text-foreground font-semibold"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-foreground">{item.qty}</span>
                          <button
                            onClick={() => setQty(item.product.id, item.qty + 1)}
                            className="px-3 text-muted-foreground hover:text-foreground font-semibold"
                          >
                            +
                          </button>
                        </div>

                        {/* Price total & Remove */}
                        <div className="flex items-center gap-4 min-w-28 justify-end">
                          <p className="text-sm font-extrabold text-foreground">
                            {item.product.price === null ? "On Request" : formatINR(item.product.price * item.qty)}
                          </p>
                          <button
                            onClick={() => remove(item.product.id)}
                            className="text-muted-foreground hover:text-red-600 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Order Form & Summary */}
            <div className="lg:col-span-5">
              <Reveal className="rounded-xl border border-border bg-card p-6 lg:p-8">
                <h3 className="text-lg font-bold text-foreground border-b border-border pb-4">Order Summary</h3>

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Items Count</span>
                    <span className="font-semibold text-foreground">{count} units</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-semibold text-foreground">{formatINR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery</span>
                    <span className="font-semibold text-emerald-600">Free Ex-Works</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-4 text-base font-extrabold text-foreground">
                    <span>Total Estimated</span>
                    <span>{formatINR(subtotal)}</span>
                  </div>
                </div>

                <form onSubmit={handleCheckoutSubmit} className="mt-8 space-y-4 border-t border-border pt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Delivery & Billing Details</h4>
                  
                  <div>
                    <label htmlFor="checkout-name" className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="checkout-name"
                      required
                      value={orderForm.name}
                      onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                      className="mt-1 h-9 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground focus:border-graphite focus:outline-none"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="checkout-email" className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="checkout-email"
                        required
                        value={orderForm.email}
                        onChange={(e) => setOrderForm({ ...orderForm, email: e.target.value })}
                        className="mt-1 h-9 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground focus:border-graphite focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="checkout-phone" className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        id="checkout-phone"
                        required
                        value={orderForm.phone}
                        onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                        className="mt-1 h-9 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground focus:border-graphite focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="checkout-company" className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="checkout-company"
                      value={orderForm.company}
                      onChange={(e) => setOrderForm({ ...orderForm, company: e.target.value })}
                      className="mt-1 h-9 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground focus:border-graphite focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="checkout-address" className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Shipping / Delivery Address *
                    </label>
                    <textarea
                      id="checkout-address"
                      required
                      rows={3}
                      value={orderForm.address}
                      onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground focus:border-graphite focus:outline-none"
                    />
                  </div>

                  <div className="rounded-xl bg-platinum p-3 text-[10px] leading-relaxed text-muted-foreground flex gap-2 border border-border/80">
                    <ShieldCheck className="size-4 text-foreground shrink-0" />
                    <span>Quote request billing will be finalized upon email/invoice verification. No payments are charged now.</span>
                  </div>

                  <button
                    type="submit"
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-graphite text-xs font-semibold text-primary-foreground transition-colors hover:bg-steel"
                  >
                    Submit Order Request <ArrowRight className="size-3.5" />
                  </button>
                </form>
              </Reveal>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
