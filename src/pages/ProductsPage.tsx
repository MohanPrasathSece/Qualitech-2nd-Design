import { useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { Search, X, ArrowUpDown, ExternalLink, Filter, Check, Globe } from "lucide-react";
import { useProducts } from "@/lib/store";
import { ProductCard } from "@/components/site/ProductCard";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { ProductMegaMenu } from "@/components/site/ProductMegaMenu";
import { amphenolCategories, zolexCategories } from "@/data/products";
import { cn } from "@/lib/utils";
import connectorsImage from "@/assets/connectors.jpg";

export default function ProductsPage() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "name" | "brand" | "category">("featured");

  const activeBrand = searchParams.get("brand") || "All";
  const activeCategory = searchParams.get("category") || "All";

  // Calculate real-time counts for badges
  const counts = useMemo(() => {
    const brandCounts: Record<string, number> = {
      All: products.length,
      AMPHENOL: products.filter((p) => p.brand === "AMPHENOL").length,
      ZOLEX: products.filter((p) => p.brand === "ZOLEX").length,
    };

    const categoryCounts: Record<string, number> = {};
    products.forEach((p) => {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });

    return { brandCounts, categoryCounts };
  }, [products]);

  // Filter products by Brand, Category and Search Query
  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => {
      const matchesBrand =
        activeBrand === "All" ||
        p.brand.toUpperCase() === activeBrand.toUpperCase();

      const matchesCategory =
        activeCategory === "All" ||
        p.category.toLowerCase() === activeCategory.toLowerCase();

      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.subcategory && p.subcategory.toLowerCase().includes(q)) ||
        p.shortDescription.toLowerCase().includes(q);

      return matchesBrand && matchesCategory && matchesQuery;
    });

    if (sortBy === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "brand") {
      list.sort((a, b) => a.brand.localeCompare(b.brand) || a.name.localeCompare(b.name));
    } else if (sortBy === "category") {
      list.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
    }

    return list;
  }, [products, activeBrand, activeCategory, searchQuery, sortBy]);

  const selectBrandAndCategory = (brand: string, category: string) => {
    const next = new URLSearchParams(searchParams);
    if (brand === "All") {
      next.delete("brand");
    } else {
      next.set("brand", brand);
    }

    if (category === "All") {
      next.delete("category");
    } else {
      next.set("category", category);
    }
    setSearchParams(next);
  };

  const selectBrand = (brand: string) => {
    const next = new URLSearchParams(searchParams);
    if (brand === "All") {
      next.delete("brand");
      next.delete("category");
    } else {
      next.set("brand", brand);
      // If current category does not belong to new brand, reset category
      if (brand === "AMPHENOL" && !(amphenolCategories as readonly string[]).includes(activeCategory)) {
        next.delete("category");
      } else if (brand === "ZOLEX" && !(zolexCategories as readonly string[]).includes(activeCategory)) {
        next.delete("category");
      }
    }
    setSearchParams(next);
  };

  const selectCategory = (category: string) => {
    const next = new URLSearchParams(searchParams);
    if (category === "All") {
      next.delete("category");
    } else {
      next.set("category", category);
      // Also sync brand automatically
      if ((amphenolCategories as readonly string[]).includes(category)) {
        next.set("brand", "AMPHENOL");
      } else if ((zolexCategories as readonly string[]).includes(category)) {
        next.set("brand", "ZOLEX");
      }
    }
    setSearchParams(next);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSearchParams({});
  };

  return (
    <>
      <PageHero
        eyebrow="Authorized Product Directory"
        title="Amphenol & Zolex Catalogue"
        lead="Explore our verified manufacturer directory covering Amphenol Connectors, Cables, Fiber Optics & Antennas, alongside Zolex Crimp Terminals, Lugs, Cable Glands, Earthing & Tools."
        image={connectorsImage}
      />

      <section className="mx-auto max-w-[1400px] px-5 py-8 lg:px-10 lg:py-12">
        {/* Interactive Top Category Mega Menu with Live Hover Preview */}
        <Reveal>
          <ProductMegaMenu
            activeBrand={activeBrand}
            activeCategory={activeCategory}
            onSelectBrandAndCategory={selectBrandAndCategory}
          />
        </Reveal>

        {/* Brand & Category Navigation Hierarchy */}
        <Reveal className="mb-8 rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-xs">
          <div className="flex flex-col gap-6">
            {/* 1. Main Brand Selector Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
              <div className="flex items-center gap-2">
                <Filter className="size-4 text-brand-blue" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
                  Manufacturer Filter:
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* ALL PRODUCTS */}
                <button
                  onClick={() => selectBrand("All")}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-300",
                    activeBrand === "All" && activeCategory === "All"
                      ? "bg-graphite text-white shadow-sm"
                      : "border border-border bg-background text-foreground/80 hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <span>ALL PRODUCTS</span>
                  <span className="rounded-md bg-white/20 px-1.5 py-0.2 text-[11px] font-bold">
                    {counts.brandCounts["All"] ?? 0}
                  </span>
                </button>

                {/* AMPHENOL */}
                <button
                  onClick={() => selectBrand("AMPHENOL")}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-300",
                    activeBrand === "AMPHENOL"
                      ? "bg-brand-blue text-white shadow-sm"
                      : "border border-border bg-background text-foreground/80 hover:bg-brand-blue/10 hover:text-brand-blue"
                  )}
                >
                  <span className="size-2 rounded-full bg-cyan-400" />
                  <span>AMPHENOL</span>
                  <span className="rounded-md bg-white/20 px-1.5 py-0.2 text-[11px] font-bold">
                    {counts.brandCounts["AMPHENOL"] ?? 0}
                  </span>
                </button>

                {/* ZOLEX */}
                <button
                  onClick={() => selectBrand("ZOLEX")}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-300",
                    activeBrand === "ZOLEX"
                      ? "bg-amber-600 text-white shadow-sm"
                      : "border border-border bg-background text-foreground/80 hover:bg-amber-600/10 hover:text-amber-600"
                  )}
                >
                  <span className="size-2 rounded-full bg-amber-400" />
                  <span>ZOLEX</span>
                  <span className="rounded-md bg-white/20 px-1.5 py-0.2 text-[11px] font-bold">
                    {counts.brandCounts["ZOLEX"] ?? 0}
                  </span>
                </button>
              </div>
            </div>

            {/* 2. Structured Category Tree Filter Pills */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Amphenol Tree */}
              <div
                className={cn(
                  "rounded-2xl p-4 transition-all duration-300 border",
                  activeBrand === "AMPHENOL"
                    ? "bg-blue-50/50 border-brand-blue/30 dark:bg-blue-950/20"
                    : "bg-background/60 border-border/70"
                )}
              >
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-brand-blue" />
                    <span className="text-xs font-extrabold uppercase tracking-wider text-brand-blue">
                      AMPHENOL Categories
                    </span>
                  </div>
                  <a
                    href="https://www.amphenol.com/products"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground hover:text-brand-blue"
                  >
                    <span>amphenol.com</span>
                    <ExternalLink className="size-3" />
                  </a>
                </div>

                <div className="flex flex-wrap gap-2">
                  {amphenolCategories.map((cat) => {
                    const isSelected = activeCategory === cat;
                    const catCount = counts.categoryCounts[cat] || 0;
                    return (
                      <button
                        key={cat}
                        onClick={() => selectCategory(isSelected ? "All" : cat)}
                        className={cn(
                          "group flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold transition-all duration-200",
                          isSelected
                            ? "bg-brand-blue text-white shadow-xs"
                            : "bg-card border border-border text-foreground hover:border-brand-blue/40 hover:bg-brand-blue/10 hover:text-brand-blue"
                        )}
                      >
                        {isSelected && <Check className="size-3 text-white shrink-0" />}
                        <span>{cat}</span>
                        <span
                          className={cn(
                            "rounded-md px-1.5 py-0.5 text-[10px] font-extrabold",
                            isSelected
                              ? "bg-white/20 text-white"
                              : "bg-secondary text-muted-foreground group-hover:text-brand-blue"
                          )}
                        >
                          {catCount}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Zolex Tree */}
              <div
                className={cn(
                  "rounded-2xl p-4 transition-all duration-300 border",
                  activeBrand === "ZOLEX"
                    ? "bg-amber-50/50 border-amber-600/30 dark:bg-amber-950/20"
                    : "bg-background/60 border-border/70"
                )}
              >
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-amber-600" />
                    <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600">
                      ZOLEX Categories
                    </span>
                  </div>
                  <a
                    href="https://www.zolex.in/products.php?category&product"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground hover:text-amber-600"
                  >
                    <span>zolex.in</span>
                    <ExternalLink className="size-3" />
                  </a>
                </div>

                <div className="flex flex-wrap gap-2">
                  {zolexCategories.map((cat) => {
                    const isSelected = activeCategory === cat;
                    const catCount = counts.categoryCounts[cat] || 0;
                    return (
                      <button
                        key={cat}
                        onClick={() => selectCategory(isSelected ? "All" : cat)}
                        className={cn(
                          "group flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold transition-all duration-200",
                          isSelected
                            ? "bg-amber-600 text-white shadow-xs"
                            : "bg-card border border-border text-foreground hover:border-amber-600/40 hover:bg-amber-600/10 hover:text-amber-600"
                        )}
                      >
                        {isSelected && <Check className="size-3 text-white shrink-0" />}
                        <span>{cat}</span>
                        <span
                          className={cn(
                            "rounded-md px-1.5 py-0.5 text-[10px] font-extrabold",
                            isSelected
                              ? "bg-white/20 text-white"
                              : "bg-secondary text-muted-foreground group-hover:text-amber-600"
                          )}
                        >
                          {catCount}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Directory Notice Strip */}
        <Reveal className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-secondary/60 px-4 py-3 text-xs text-muted-foreground border border-border">
          <div className="flex items-center gap-2">
            <Globe className="size-4 text-brand-blue shrink-0" />
            <span>
              <strong>Manufacturer Product Directory:</strong> Click <strong>"View on Amphenol"</strong> or <strong>"View on Zolex"</strong> on any item to open the verified official specifications on the manufacturer portal.
            </span>
          </div>

          {(activeBrand !== "All" || activeCategory !== "All" || searchQuery) && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 font-bold text-brand-blue hover:underline shrink-0"
            >
              <X className="size-3.5" />
              <span>Reset Active Filters</span>
            </button>
          )}
        </Reveal>

        {/* Full-Width Search & Sort Bar */}
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-border bg-card p-4 shadow-xs mb-8">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products by name, code, brand (Amphenol/Zolex), category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-9 text-xs sm:text-sm text-foreground focus:border-brand-blue focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* Sort & Count Controls */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ArrowUpDown className="size-3.5 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="h-10 rounded-xl border border-border bg-background px-3 text-xs font-semibold text-foreground focus:border-brand-blue focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="name">Product Name (A-Z)</option>
                <option value="brand">Manufacturer Brand</option>
                <option value="category">Category</option>
              </select>
            </div>

            <div className="text-xs text-muted-foreground font-semibold shrink-0">
              Showing <span className="text-foreground font-bold">{filteredProducts.length}</span> of {products.length}
            </div>
          </div>
        </Reveal>

        {/* Active Filter Badges */}
        {(activeBrand !== "All" || activeCategory !== "All") && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">Active filters:</span>
            {activeBrand !== "All" && (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-graphite px-2.5 py-1 text-xs font-bold text-white">
                Brand: {activeBrand}
                <button onClick={() => selectBrand("All")}>
                  <X className="size-3 hover:text-brand-yellow" />
                </button>
              </span>
            )}
            {activeCategory !== "All" && (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-brand-blue px-2.5 py-1 text-xs font-bold text-white">
                Category: {activeCategory}
                <button onClick={() => selectCategory("All")}>
                  <X className="size-3 hover:text-brand-yellow" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Full-Width Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <Reveal className="text-center py-20 rounded-3xl border border-dashed border-border bg-card">
            <p className="text-muted-foreground font-semibold text-sm">
              No products match your current search or category filter.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 inline-flex h-10 items-center justify-center rounded-xl bg-graphite px-5 text-xs font-bold text-primary-foreground transition-all hover:bg-brand-blue"
            >
              Reset All Filters
            </button>
          </Reveal>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((p, i) => (
              <Reveal key={p.id} delay={i * 35}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
