import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, ShoppingCart, Check, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { useProducts, useCart, formatINR } from "@/lib/store";
import { Reveal } from "@/components/site/Reveal";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getProduct } = useProducts();
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  const product = id ? getProduct(id) : undefined;

  if (!product) {
    return (
      <div className="mx-auto max-w-[1400px] px-5 py-24 text-center lg:px-10">
        <h2 className="text-3xl font-extrabold text-foreground">Product Not Found</h2>
        <p className="mt-4 text-muted-foreground">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="mt-8 inline-flex h-11 items-center gap-2 rounded-xl bg-graphite px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-steel"
        >
          <ArrowLeft className="size-4" /> Back to Catalogue
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    add(product.id, qty);
    toast.success(`${qty} x ${product.name} added to cart`, {
      action: {
        label: "View Cart",
        onClick: () => window.location.href = "/cart",
      },
    });
  };

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-12 lg:px-10 lg:py-20">
      <Reveal>
        <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Back to Catalogue
        </Link>
      </Reveal>

      <div className="mt-8 grid gap-12 lg:grid-cols-12">
        {/* Product Image */}
        <div className="lg:col-span-6">
          <Reveal>
            <div className="aspect-[4/3] overflow-hidden rounded-xl border border-border bg-platinum">
              <img
                src={product.images[0]}
                alt={product.name}
                className="size-full object-cover grayscale transition-all duration-300 hover:grayscale-0"
              />
            </div>
          </Reveal>
        </div>

        {/* Product Specs & Add to Cart */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <Reveal>
            <span className="rounded-xl bg-platinum px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              {product.category}
            </span>
            <h1 className="mt-4 text-3xl font-extrabold text-foreground sm:text-4xl">{product.name}</h1>
            <p className="mt-2 text-sm font-semibold tracking-wider text-muted-foreground uppercase">{product.code}</p>

            <div className="mt-6 border-t border-border pt-6">
              <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
            </div>

            {/* Specifications List */}
            <div className="mt-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Specifications</h3>
              <dl className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {product.specifications.map((spec) => (
                  <div key={spec.label} className="border-b border-border/60 pb-2">
                    <dt className="text-xs text-muted-foreground">{spec.label}</dt>
                    <dd className="mt-1 text-sm font-bold text-foreground">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          {/* Price, Action & Value props */}
          <Reveal className="mt-8 border-t border-border pt-6">
            <div className="flex flex-wrap items-baseline gap-4">
              <span className="text-3xl font-extrabold text-foreground">
                {product.price === null ? "Price on Request" : formatINR(product.price)}
              </span>
              <span className={`inline-flex items-center gap-1 text-xs font-semibold ${
                product.availability === "In Stock" ? "text-emerald-600" : "text-amber-600"
              }`}>
                <span className={`size-1.5 rounded-full ${
                  product.availability === "In Stock" ? "bg-emerald-600" : "bg-amber-600"
                }`} />
                {product.availability}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 items-center">
              {/* Quantity selector */}
              <div className="flex h-12 items-center rounded-xl border border-border bg-card">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-4 text-muted-foreground hover:text-foreground font-semibold"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-bold text-foreground">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="px-4 text-muted-foreground hover:text-foreground font-semibold"
                >
                  +
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={handleAddToCart}
                className="flex h-12 items-center gap-2 rounded-xl bg-graphite px-8 text-sm font-semibold text-primary-foreground transition-colors hover:bg-steel"
              >
                <ShoppingCart className="size-4" /> Add to Cart
              </button>
            </div>

            {/* Quick Guarantees */}
            <div className="mt-8 grid gap-4 border-t border-border pt-6 sm:grid-cols-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-foreground" />
                <span>OEM Certified Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="size-4 text-foreground" />
                <span>Secure Packaged Supply</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="size-4 text-foreground" />
                <span>30-Day Material Warranty</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Applications section */}
      {product.applications && product.applications.length > 0 && (
        <section className="mt-16 border-t border-border pt-12">
          <Reveal>
            <h3 className="text-lg font-bold text-foreground">Typical Applications</h3>
            <div className="mt-6 flex flex-wrap gap-3">
              {product.applications.map((app) => (
                <span key={app} className="rounded-full bg-platinum px-4 py-1.5 text-xs font-semibold text-foreground">
                  {app}
                </span>
              ))}
            </div>
          </Reveal>
        </section>
      )}
    </div>
  );
}
