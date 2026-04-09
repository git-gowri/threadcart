import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { SlidersHorizontal, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Product } from "../backend";
import { Category } from "../backend";
import { Layout } from "../components/Layout";
import { ProductCard } from "../components/ProductCard";
import { useFilterProducts } from "../hooks/useProducts";
import type { LocalProductFilter } from "../types";

// ─── Constants ─────────────────────────────────────────────────────────────
const CATEGORIES: { label: string; value: Category | undefined }[] = [
  { label: "All", value: undefined },
  { label: "Men", value: Category.Men },
  { label: "Women", value: Category.Women },
  { label: "Kids", value: Category.Kids },
  { label: "Accessories", value: Category.Accessories },
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const COLORS = [
  { name: "Black", hex: "#1a1a1a" },
  { name: "White", hex: "#f5f0e8" },
  { name: "Charcoal", hex: "#3d3d3d" },
  { name: "Taupe", hex: "#9e8e7e" },
  { name: "Cream", hex: "#f0e6d3" },
  { name: "Navy", hex: "#1e2d4a" },
  { name: "Olive", hex: "#6b6b3a" },
  { name: "Burgundy", hex: "#6b2737" },
];

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low → High", value: "price-asc" },
  { label: "Price: High → Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
];

// ─── URL ↔ State helpers ────────────────────────────────────────────────────
function readParams(): {
  filter: LocalProductFilter;
  sort: string;
  search: string;
} {
  const p = new URLSearchParams(window.location.search);
  const cat = p.get("category");
  return {
    filter: {
      category: cat ? (cat as Category) : undefined,
      size: p.get("size") ?? undefined,
      color: p.get("color") ?? undefined,
      minPrice: p.get("minPrice") ? Number(p.get("minPrice")) : undefined,
      maxPrice: p.get("maxPrice") ? Number(p.get("maxPrice")) : undefined,
    },
    sort: p.get("sort") ?? "featured",
    search: p.get("search") ?? "",
  };
}

function writeParams(filter: LocalProductFilter, sort: string, search: string) {
  const p = new URLSearchParams();
  if (filter.category) p.set("category", filter.category as string);
  if (filter.size) p.set("size", filter.size);
  if (filter.color) p.set("color", filter.color);
  if (filter.minPrice !== undefined) p.set("minPrice", String(filter.minPrice));
  if (filter.maxPrice !== undefined) p.set("maxPrice", String(filter.maxPrice));
  if (sort !== "featured") p.set("sort", sort);
  if (search) p.set("search", search);
  const qs = p.toString();
  window.history.replaceState(
    null,
    "",
    qs ? `?${qs}` : window.location.pathname,
  );
}

// ─── Sort helper ─────────────────────────────────────────────────────────────
function sortProducts(products: Product[], sort: string): Product[] {
  const arr = [...products];
  if (sort === "price-asc")
    return arr.sort((a, b) => Number(a.price) - Number(b.price));
  if (sort === "price-desc")
    return arr.sort((a, b) => Number(b.price) - Number(a.price));
  if (sort === "newest")
    return arr.sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
  return arr;
}

// ─── FilterSidebar ───────────────────────────────────────────────────────────
interface SidebarProps {
  filter: LocalProductFilter;
  onFilterChange: (patch: Partial<LocalProductFilter>) => void;
  onClearAll: () => void;
  activeCount: number;
}

function FilterSidebar({
  filter,
  onFilterChange,
  onClearAll,
  activeCount,
}: SidebarProps) {
  const [minVal, setMinVal] = useState(filter.minPrice?.toString() ?? "");
  const [maxVal, setMaxVal] = useState(filter.maxPrice?.toString() ?? "");

  // Sync local price inputs when filter is cleared externally
  useEffect(() => {
    setMinVal(filter.minPrice?.toString() ?? "");
    setMaxVal(filter.maxPrice?.toString() ?? "");
  }, [filter.minPrice, filter.maxPrice]);

  const commitPrice = () => {
    const min = minVal !== "" ? Number(minVal) : undefined;
    const max = maxVal !== "" ? Number(maxVal) : undefined;
    onFilterChange({ minPrice: min, maxPrice: max });
  };

  return (
    <aside className="w-full lg:w-64 shrink-0" data-ocid="filter-sidebar">
      <div className="border border-border bg-card p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={15} className="text-muted-foreground" />
            <span className="font-display text-sm tracking-widest uppercase text-foreground">
              Filters
            </span>
            {activeCount > 0 && (
              <Badge variant="secondary" className="text-xs h-5 px-1.5">
                {activeCount}
              </Badge>
            )}
          </div>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              data-ocid="clear-all-filters"
            >
              <X size={12} />
              Clear all
            </button>
          )}
        </div>

        <Separator className="mb-5" />

        {/* Size */}
        <div className="mb-6">
          <Label className="text-xs tracking-widest uppercase text-muted-foreground mb-3 block">
            Size
          </Label>
          <div className="grid grid-cols-3 gap-1.5">
            {SIZES.map((size) => (
              <button
                type="button"
                key={size}
                onClick={() =>
                  onFilterChange({
                    size: filter.size === size ? undefined : size,
                  })
                }
                className={`h-9 text-xs font-medium border transition-colors ${
                  filter.size === size
                    ? "border-foreground bg-foreground text-primary-foreground"
                    : "border-border bg-background text-foreground hover:border-foreground"
                }`}
                data-ocid={`size-${size.toLowerCase()}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <Separator className="mb-5" />

        {/* Color */}
        <div className="mb-6">
          <Label className="text-xs tracking-widest uppercase text-muted-foreground mb-3 block">
            Color
          </Label>
          <div className="flex flex-wrap gap-2">
            {COLORS.map((c) => (
              <button
                type="button"
                key={c.name}
                onClick={() =>
                  onFilterChange({
                    color: filter.color === c.name ? undefined : c.name,
                  })
                }
                title={c.name}
                className={`w-7 h-7 border-2 transition-all ${
                  filter.color === c.name
                    ? "border-foreground scale-110 ring-1 ring-foreground ring-offset-1"
                    : "border-border hover:border-foreground"
                }`}
                style={{ backgroundColor: c.hex }}
                data-ocid={`color-${c.name.toLowerCase()}`}
              />
            ))}
          </div>
          {filter.color && (
            <p className="text-xs text-muted-foreground mt-2">{filter.color}</p>
          )}
        </div>

        <Separator className="mb-5" />

        {/* Price */}
        <div className="mb-1">
          <Label className="text-xs tracking-widest uppercase text-muted-foreground mb-3 block">
            Price Range
          </Label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                $
              </span>
              <Input
                type="number"
                min={0}
                placeholder="Min"
                value={minVal}
                onChange={(e) => setMinVal(e.target.value)}
                onBlur={commitPrice}
                onKeyDown={(e) => e.key === "Enter" && commitPrice()}
                className="pl-6 h-9 text-sm"
                data-ocid="price-min"
              />
            </div>
            <span className="text-muted-foreground text-xs">–</span>
            <div className="relative flex-1">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                $
              </span>
              <Input
                type="number"
                min={0}
                placeholder="Max"
                value={maxVal}
                onChange={(e) => setMaxVal(e.target.value)}
                onBlur={commitPrice}
                onKeyDown={(e) => e.key === "Enter" && commitPrice()}
                className="pl-6 h-9 text-sm"
                data-ocid="price-max"
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ShopPage() {
  const initial = readParams();
  const [filter, setFilter] = useState<LocalProductFilter>(initial.filter);
  const [sort, setSort] = useState(initial.sort);
  const [search, setSearch] = useState(initial.search);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // Merge search into filter for backend call
  const activeFilter: LocalProductFilter = {
    ...filter,
    searchTerm: search || undefined,
  };

  const { data: rawProducts, isLoading } = useFilterProducts(activeFilter);

  // Derive products with client-side sort
  const products = rawProducts ? sortProducts(rawProducts, sort) : undefined;

  // Sync state → URL
  useEffect(() => {
    writeParams(filter, sort, search);
  }, [filter, sort, search]);

  const handleFilterChange = useCallback(
    (patch: Partial<LocalProductFilter>) => {
      setFilter((prev) => ({ ...prev, ...patch }));
    },
    [],
  );

  const clearAll = useCallback(() => {
    setFilter({});
    setSort("featured");
    setSearch("");
  }, []);

  // Count active filters (excluding search since it's shown inline)
  const activeCount = [
    filter.category,
    filter.size,
    filter.color,
    filter.minPrice,
    filter.maxPrice,
  ].filter((v) => v !== undefined && v !== "").length;

  const activeCategory = filter.category;

  return (
    <Layout>
      {/* Category tabs bar */}
      <div className="border-b border-border bg-card sticky top-0 z-30">
        <div className="container max-w-7xl mx-auto px-4">
          <div
            className="flex items-center gap-0 overflow-x-auto no-scrollbar"
            data-ocid="category-nav"
          >
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat.value;
              return (
                <button
                  type="button"
                  key={cat.label}
                  onClick={() => handleFilterChange({ category: cat.value })}
                  className={`relative px-5 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-ocid={`cat-${cat.label.toLowerCase()}`}
                >
                  {cat.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Top toolbar: search + sort + mobile filter toggle */}
        <div className="flex items-center gap-3 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <svg
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
            >
              <path
                d="M10 6.5C10 8.43 8.43 10 6.5 10C4.57 10 3 8.43 3 6.5C3 4.57 4.57 3 6.5 3C8.43 3 10 4.57 10 6.5ZM9.5 10.5a5.5 5.5 0 1 1 1-1l3 3-1 1-3-3Z"
                fill="currentColor"
              />
            </svg>
            <Input
              ref={searchRef}
              type="search"
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-sm"
              data-ocid="search-input"
            />
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-9 px-3 text-sm border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring min-w-[160px]"
            data-ocid="sort-select"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Mobile filter toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSidebarOpen((v) => !v)}
            className="lg:hidden flex items-center gap-2"
            data-ocid="mobile-filter-toggle"
          >
            <SlidersHorizontal size={14} />
            Filters
            {activeCount > 0 && (
              <Badge variant="secondary" className="text-xs h-4 px-1 ml-0.5">
                {activeCount}
              </Badge>
            )}
          </Button>

          {/* Results count */}
          {products && (
            <span className="text-sm text-muted-foreground ml-auto whitespace-nowrap">
              {products.length} {products.length === 1 ? "item" : "items"}
            </span>
          )}
        </div>

        <div className="flex gap-8 items-start">
          {/* Sidebar — desktop always visible, mobile conditionally */}
          <div className={`${sidebarOpen ? "block" : "hidden"} lg:block`}>
            <FilterSidebar
              filter={filter}
              onFilterChange={handleFilterChange}
              onClearAll={clearAll}
              activeCount={activeCount}
            />
          </div>

          {/* Product area */}
          <div className="flex-1 min-w-0">
            {/* Loading */}
            {isLoading && (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                {["a", "b", "c", "d", "e", "f", "g", "h"].map((k) => (
                  <div key={k} className="space-y-3">
                    <Skeleton className="aspect-[3/4] w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                ))}
              </div>
            )}

            {/* Grid */}
            {!isLoading && products && products.length > 0 && (
              <div
                className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
                data-ocid="products-grid"
              >
                {products.map((product) => (
                  <ProductCard key={product.id.toString()} product={product} />
                ))}
              </div>
            )}

            {/* Empty state */}
            {!isLoading && products && products.length === 0 && (
              <div
                className="flex flex-col items-center justify-center py-24 text-center border border-border bg-card"
                data-ocid="empty-state"
              >
                <p className="font-display text-3xl text-foreground mb-2">
                  No products found
                </p>
                <p className="text-muted-foreground mb-8 max-w-xs">
                  {search
                    ? `No results for "${search}". Try different keywords or clear your filters.`
                    : "Try adjusting your filters to see more results."}
                </p>
                <Button
                  variant="outline"
                  onClick={clearAll}
                  data-ocid="empty-clear-btn"
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
