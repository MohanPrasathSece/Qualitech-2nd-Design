import { useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { Search, X, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { categories } from "@/data/products";
import { useProducts } from "@/lib/store";
import { ProductCard } from "@/components/site/ProductCard";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { ProductMegaMenu } from "@/components/site/ProductMegaMenu";
import connectorsImage from "@/assets/connectors.jpg";

export default function ProductsPage() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "name" | "price-asc" | "price-desc">("featured");

  const activeCategory = searchParams.get("category") || "All";

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => {
      const matchesCategory =
        activeCategory === "All" ||
        p.category.toLowerCase() === activeCategory.toLowerCase() ||
        (activeCategory === "Cables" && p.category === "Cable Assemblies") ||
        (activeCategory === "Connectors" && ["DSUB", "DIN (EURO)", "IDC (FRC)", "HARTING DIN (EURO)"].includes(p.category));

      const matchesQuery =
        searchQuery.trim() === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesQuery;
    });

    if (sortBy === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "price-asc") {
      list.sort((a, b) => (a.price ?? 99999) - (b.price ?? 99999));
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    }

    return list;
  }, [products, activeCategory, searchQuery, sortBy]);

  const selectCategory = (category: string) => {
    if (category === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
  };

  return (
    <>
      <PageHero
        eyebrow="Catalogue & Interconnect"
        title="Products & Solutions"
        lead="Explore our ranges of GNSS & 5G Antennas, Optical Assemblies, Custom Wire Harnesses, and D-Sub, DIN (Euro), IDC, and HARTING Series Connectors."
        image={connectorsImage}
      />

      <section className="mx-auto max-w-[1400px] px-5 py-10 lg:px-10 lg:py-16">
        {/* Interactive Mega Category Menu with Live Hover Preview */}
        <Reveal>
          <ProductMegaMenu
            activeCategory={activeCategory}
            onSelectCategory={selectCategory}
          />
        </Reveal>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Sidebar Filter Menu */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
              <div className="flex items-center gap-2 border-b border-border/80 pb-3">
                <SlidersHorizontal className="size-4 text-brand-blue" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                  Browse by Category
                </h3>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:gap-1.5">
                <button
                  onClick={() => selectCategory("All")}
                  className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs sm:text-sm font-semibold transition-all ${
                    activeCategory === "All"
                      ? "bg-brand-blue text-white shadow-sm"
                      : "text-muted-foreground hover:bg-platinum hover:text-foreground"
                  }`}
                >
                  <span>All Products</span>
                  <span className="text-xs opacity-75">{products.length}</span>
                </button>

                {categories.map((c) => {
                  const catCount = products.filter(
                    (p) =>
                      p.category.toLowerCase() === c.toLowerCase() ||
                      (c === "Cables" && p.category === "Cable Assemblies") ||
                      (c === "Connectors" && ["DSUB", "DIN (EURO)", "IDC (FRC)", "HARTING DIN (EURO)"].includes(p.category))
                  ).length;

                  return (
                    <button
                      key={c}
                      onClick={() => selectCategory(c)}
                      className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs sm:text-sm font-semibold transition-all ${
                        activeCategory.toLowerCase() === c.toLowerCase()
                          ? "bg-brand-blue text-white shadow-sm"
                          : "text-muted-foreground hover:bg-platinum hover:text-foreground"
                      }`}
                    >
                      <span>{c}</span>
                      {catCount > 0 && <span className="text-xs opacity-75">{catCount}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main Grid Section */}
          <div className="flex-1">
            <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-border bg-card p-4 shadow-xs">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by product name, code (QTC-...), or category..."
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
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>

                <div className="text-xs text-muted-foreground font-semibold shrink-0">
                  Showing <span className="text-foreground font-bold">{filteredProducts.length}</span> of {products.length}
                </div>
              </div>
            </Reveal>

            {/* Product Cards Grid */}
            {filteredProducts.length === 0 ? (
              <Reveal className="mt-8 text-center py-20 rounded-3xl border border-dashed border-border bg-card">
                <p className="text-muted-foreground font-semibold text-sm">
                  No products match your current search or category filter.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    selectCategory("All");
                  }}
                  className="mt-4 inline-flex h-10 items-center justify-center rounded-xl bg-graphite px-5 text-xs font-bold text-primary-foreground transition-all hover:bg-brand-blue"
                >
                  Reset All Filters
                </button>
              </Reveal>
            ) : (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((p, i) => (
                  <Reveal key={p.id} delay={i * 50}>
                    <ProductCard product={p} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
