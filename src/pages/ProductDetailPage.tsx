import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, MessageSquareQuote, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { useProducts } from "@/lib/store";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getProduct } = useProducts();

  const product = id ? getProduct(id) : undefined;

  if (!product) {
    return (
      <div className="mx-auto max-w-[1400px] px-5 py-24 text-center lg:px-10">
        <h2 className="text-3xl font-extrabold text-foreground">Product Not Found</h2>
        <p className="mt-4 text-muted-foreground">The product you are looking for does not exist or has been moved.</p>
        <Link
          to="/products"
          className="mt-8 inline-flex h-11 items-center gap-2 rounded-xl bg-graphite px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-blue"
        >
          <ArrowLeft className="size-4" /> Back to Catalogue Directory
        </Link>
      </div>
    );
  }

  const isAmphenol = product.brand === "AMPHENOL";
  const manufacturerName = isAmphenol ? "Amphenol" : "Zolex";

  return (
    <div className="mx-auto max-w-[1400px] px-5 pt-28 pb-16 lg:px-10 lg:pt-36 lg:pb-24">
      <Reveal>
        <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Back to Product Catalogue
        </Link>
      </Reveal>

      <div className="mt-8 grid gap-12 lg:grid-cols-12">
        {/* Product Image */}
        <div className="lg:col-span-6">
          <Reveal>
            <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-platinum relative">
              <img
                src={product.images[0]}
                alt={product.name}
                className="size-full object-cover grayscale transition-all duration-300 hover:grayscale-0"
              />
              <span
                className={cn(
                  "absolute left-4 top-4 rounded-xl px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-md",
                  isAmphenol ? "bg-blue-600/90" : "bg-amber-600/90"
                )}
              >
                {product.brand} Official
              </span>
            </div>
          </Reveal>
        </div>

        {/* Product Specs & Direct External Link */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <Reveal>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-xl bg-platinum px-3 py-1 text-xs font-bold uppercase tracking-wider text-foreground">
                {product.category}
              </span>
              {product.subcategory && (
                <span className="rounded-xl bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
                  {product.subcategory}
                </span>
              )}
            </div>

            <h1 className="mt-4 text-3xl font-extrabold text-foreground sm:text-4xl">{product.name}</h1>
            <p className="mt-2 text-xs font-mono font-bold tracking-wider text-muted-foreground uppercase">{product.code}</p>

            <div className="mt-6 border-t border-border pt-6">
              <p className="text-sm leading-relaxed text-muted-foreground">{product.description || product.shortDescription}</p>
            </div>

            {/* Specifications List */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Technical Specifications</h3>
                <dl className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {product.specifications.map((spec) => (
                    <div key={spec.label} className="border-b border-border/60 pb-2">
                      <dt className="text-xs text-muted-foreground">{spec.label}</dt>
                      <dd className="mt-1 text-sm font-bold text-foreground">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </Reveal>

          {/* Outbound Manufacturer Action & RFQ */}
          <Reveal className="mt-8 border-t border-border pt-6">
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs text-muted-foreground">
                This item is part of the <strong>{product.brand}</strong> product portfolio. Access detailed technical drawings, 3D CAD models, test reports and datasheets on the original manufacturer portal:
              </p>

              <div className="mt-5 flex flex-wrap gap-4 items-center">
                {/* External Manufacturer Link */}
                <a
                  href={product.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex items-center gap-2 rounded-xl py-3 px-6 text-sm font-bold text-white shadow-md transition-all duration-300 hover:scale-105",
                    isAmphenol
                      ? "bg-brand-blue hover:bg-blue-700"
                      : "bg-amber-600 hover:bg-amber-700"
                  )}
                >
                  <span>View Product on {manufacturerName}</span>
                  <ExternalLink className="size-4" />
                </a>

                {/* Request Quote Button */}
                <Link
                  to={`/contact?intent=quote&product=${encodeURIComponent(product.name)}&brand=${product.brand}`}
                  className="flex items-center gap-2 rounded-xl border border-border bg-graphite px-6 py-3 text-sm font-bold text-white transition-all hover:bg-brand-blue"
                >
                  <MessageSquareQuote className="size-4" />
                  <span>Request RFQ Quote</span>
                </Link>
              </div>
            </div>

            {/* Quick Guarantees */}
            <div className="mt-8 grid gap-4 border-t border-border pt-6 sm:grid-cols-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-foreground" />
                <span>OEM Certified Standard</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="size-4 text-foreground" />
                <span>Prompt Delivery & Stock</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="size-4 text-foreground" />
                <span>Full Technical Support</span>
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
