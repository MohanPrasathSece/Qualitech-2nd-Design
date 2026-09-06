import { ExternalLink, MessageSquareQuote } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const isAmphenol = product.brand === "AMPHENOL";
  const manufacturerName = isAmphenol ? "Amphenol" : "Zolex";
  const externalButtonLabel = `View on ${manufacturerName}`;

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-xl hover:border-brand-blue/30">
      {/* Product Image Header */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-platinum">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="size-full object-cover grayscale transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:grayscale-0"
        />

        {/* Brand Tag Top Left */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span
            className={cn(
              "rounded-lg px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider backdrop-blur-md shadow-xs transition-colors",
              isAmphenol
                ? "bg-blue-600/90 text-white"
                : "bg-amber-600/90 text-white"
            )}
          >
            {product.brand}
          </span>
        </div>

        {/* Category Badge Top Right */}
        <span className="absolute right-3 top-3 rounded-lg bg-background/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground backdrop-blur-md shadow-xs">
          {product.category}
        </span>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Code & Subcategory */}
        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <span className="label-tech font-bold text-foreground/80">{product.code}</span>
          {product.subcategory && (
            <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
              {product.subcategory}
            </span>
          )}
        </div>

        {/* Product Title */}
        <h3 className="mt-2.5 text-base font-bold leading-snug text-foreground transition-colors group-hover:text-brand-blue">
          {product.name}
        </h3>

        {/* Short Description */}
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {product.shortDescription}
        </p>

        {/* Manufacturer info footnote */}
        <div className="mt-4 flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground/90">
          <span>Manufacturer:</span>
          <strong className="text-foreground font-bold">{manufacturerName} Official Catalogue</strong>
        </div>

        {/* Bottom Actions */}
        <div className="mt-auto border-t border-border pt-4 mt-5 flex items-center gap-2">
          {/* Direct External Link to Amphenol / Zolex Official Page */}
          <a
            href={product.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-bold text-white shadow-xs transition-all duration-300 hover:shadow-md",
              isAmphenol
                ? "bg-brand-blue hover:bg-blue-700"
                : "bg-slate-900 hover:bg-amber-700 dark:bg-slate-800"
            )}
            title={`Open official ${manufacturerName} product specification page`}
          >
            <span>{externalButtonLabel}</span>
            <ExternalLink className="size-3.5 shrink-0" />
          </a>

          {/* Direct RFQ / Inquire Button */}
          <Link
            to={`/contact?intent=quote&product=${encodeURIComponent(product.name)}&brand=${product.brand}`}
            className="flex size-9.5 items-center justify-center rounded-xl border border-border bg-secondary text-foreground transition-colors hover:bg-brand-blue hover:text-white hover:border-brand-blue shrink-0"
            title="Request Custom Quote / Availability"
          >
            <MessageSquareQuote className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
