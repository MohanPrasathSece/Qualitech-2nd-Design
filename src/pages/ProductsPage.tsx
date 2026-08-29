import { useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { Search, X, ArrowUpDown } from "lucide-react";
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
        {/* Interactive Top Category Mega Menu with Live Hover Preview */}
        <Reveal>
          <ProductMegaMenu
            activeCategory={activeCategory}
            onSelectCategory={selectCategory}
          />
        </Reveal>

        {/* Full-Width Search & Sort Bar */}
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-border bg-card p-4 shadow-xs mb-8">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-lg">
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

        {/* Full-Width Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <Reveal className="text-center py-20 rounded-3xl border border-dashed border-border bg-card">
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
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((p, i) => (
              <Reveal key={p.id} delay={i * 45}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
