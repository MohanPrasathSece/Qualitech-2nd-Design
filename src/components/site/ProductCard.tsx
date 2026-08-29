import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/data/products";
import { formatINR } from "@/lib/store";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-lift hover:border-brand-blue/20"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-platinum">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="size-full object-cover grayscale transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:grayscale-0"
        />
        <span className="absolute left-3 top-3 rounded-lg bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-foreground backdrop-blur-sm transition-all duration-300 group-hover:bg-brand-blue group-hover:text-white">
          {product.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="label-tech text-muted-foreground">{product.code}</p>
        <h3 className="mt-2 text-base font-bold leading-snug text-foreground transition-colors duration-300 group-hover:text-brand-blue">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{product.shortDescription}</p>
        <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
          <div>
            <p className="text-lg font-bold text-foreground">
              {product.price === null ? "On Request" : formatINR(product.price)}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">{product.availability}</p>
          </div>
          <div className="grid size-8 place-items-center rounded-lg bg-platinum transition-all duration-300 group-hover:bg-brand-blue group-hover:text-white group-hover:scale-110">
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
