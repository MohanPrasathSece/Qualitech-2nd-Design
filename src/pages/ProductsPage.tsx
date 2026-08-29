import { useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { categories } from "@/data/products";
import { useProducts } from "@/lib/store";
import { ProductCard } from "@/components/site/ProductCard";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import connectorsImage from "@/assets/connectors.jpg";

export default function ProductsPage() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  const activeCategory = searchParams.get("category") || "All";

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const matchesQuery =
        searchQuery.trim() === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [products, activeCategory, searchQuery]);

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
        eyebrow="Catalogue"
        title="Products"
        lead="Explore our ranges of D-Sub, DIN (EURO), IDC (FRC), HARTING series, allied components, and custom terminated cable assemblies."
        image={connectorsImage}
      />

      <section className="mx-auto max-w-[1400px] px-5 py-12 lg:px-10 lg:py-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Categories</h3>
              <div className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
                <button
                  onClick={() => selectCategory("All")}
                  className={`rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors ${
                    activeCategory === "All"
                      ? "bg-graphite text-white"
                      : "text-muted-foreground hover:bg-platinum hover:text-foreground"
                  }`}
                >
                  All Products
                </button>
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => selectCategory(c)}
                    className={`rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors ${
                      activeCategory === c
                        ? "bg-graphite text-white"
                        : "text-muted-foreground hover:bg-platinum hover:text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Grid */}
          <div className="flex-1">
            <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products by name or code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 w-full rounded-xl border border-border bg-card pl-10 pr-8 text-sm text-foreground focus:border-graphite focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>

              <div className="text-xs text-muted-foreground font-medium">
                Showing {filteredProducts.length} of {products.length} products
              </div>
            </Reveal>

            {filteredProducts.length === 0 ? (
              <Reveal className="mt-12 text-center py-20 rounded-xl border border-dashed border-border bg-card">
                <p className="text-muted-foreground font-medium">No products match your search or filter criteria.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    selectCategory("All");
                  }}
                  className="mt-4 inline-flex h-9 items-center justify-center rounded-xl bg-graphite px-4 text-xs font-semibold text-primary-foreground transition-colors hover:bg-steel"
                >
                  Reset Filters
                </button>
              </Reveal>
            ) : (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((p, i) => (
                  <Reveal key={p.id} delay={i * 60}>
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
