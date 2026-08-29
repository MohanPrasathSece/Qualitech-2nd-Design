import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/data/products";
import { formatINR } from "@/lib/store";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/products/$id"
      params={{ id: product.id }}
      className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-platinum">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="size-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-sm bg-background/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-foreground">
          {product.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="label-tech text-muted-foreground">{product.code}</p>
        <h3 className="mt-2 text-base font-bold leading-snug text-foreground">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{product.shortDescription}</p>
        <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
          <div>
            <p className="text-lg font-bold text-foreground">
              {product.price === null ? "On Request" : formatINR(product.price)}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">{product.availability}</p>
          </div>
          <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
