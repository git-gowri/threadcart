import { r as reactExports, j as jsxRuntimeExports, u as ue, S as Skeleton } from "./index-BH8qyL0M.js";
import { c as createLucideIcon, u as useCart, B as Badge, a as Button, S as ShoppingBag, L as Layout, C as Category, I as Input } from "./Layout-BLXPJbtK.js";
import { L as Label } from "./label-B_YclXCM.js";
import { S as Separator } from "./separator-HhzUdilm.js";
import { u as useFilterProducts } from "./useProducts-CiM4J0yi.js";
import "./useActor-DLK9v9XA.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
const PLACEHOLDER = "/assets/generated/product-placeholder.jpg";
function formatPrice(price) {
  return `$${(Number(price) / 100).toFixed(2)}`;
}
function ProductCard({ product }) {
  var _a;
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = reactExports.useState(
    product.sizes[0] ?? ""
  );
  const [selectedColor, setSelectedColor] = reactExports.useState(
    product.colors[0] ?? ""
  );
  const imageUrl = product.imageRefs[0] ?? PLACEHOLDER;
  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!selectedSize) {
      ue.error("Please select a size");
      return;
    }
    addItem({
      productId: product.id.toString(),
      name: product.name,
      price: Number(product.price) / 100,
      image: imageUrl,
      size: selectedSize,
      color: selectedColor
    });
    ue.success(`${product.name} added to cart`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      className: "group bg-card border border-border flex flex-col overflow-hidden transition-smooth hover:shadow-elevated",
      "data-ocid": "product-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: `/shop/${product.id}`,
            className: "block relative overflow-hidden aspect-[3/4] bg-muted",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: imageUrl,
                  alt: product.name,
                  className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
                  onError: (e) => {
                    e.currentTarget.src = PLACEHOLDER;
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: "absolute top-3 left-3 bg-secondary text-secondary-foreground border-0 text-xs tracking-wider uppercase",
                  "data-ocid": "product-category-badge",
                  children: (_a = Object.keys(product.category)[0]) == null ? void 0 : _a.replace(
                    /^\w/,
                    (c) => c.toUpperCase()
                  )
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 p-4 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `/shop/${product.id}`, className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base text-foreground leading-tight truncate hover:text-accent transition-colors", children: product.name }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-accent font-body font-medium mt-1", children: formatPrice(product.price) })
          ] }),
          product.sizes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex flex-wrap gap-1",
              "data-ocid": "product-size-selector",
              children: product.sizes.map((size) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setSelectedSize(size),
                  type: "button",
                  className: `text-xs px-2 py-1 border transition-smooth ${selectedSize === size ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border hover:border-accent"}`,
                  "aria-label": `Select size ${size}`,
                  "aria-pressed": selectedSize === size,
                  children: size
                },
                size
              ))
            }
          ),
          product.colors.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: product.colors.map((color) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSelectedColor(color),
              className: `text-xs px-2 py-0.5 border transition-smooth ${selectedColor === color ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-border hover:border-accent"}`,
              "aria-label": `Select color ${color}`,
              "aria-pressed": selectedColor === color,
              children: color
            },
            color
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handleAddToCart,
              className: "mt-auto w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth",
              size: "sm",
              "data-ocid": "add-to-cart-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "size-3.5" }),
                "Add to Cart"
              ]
            }
          )
        ] })
      ]
    }
  );
}
const CATEGORIES = [
  { label: "All", value: void 0 },
  { label: "Men", value: Category.Men },
  { label: "Women", value: Category.Women },
  { label: "Kids", value: Category.Kids },
  { label: "Accessories", value: Category.Accessories }
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
  { name: "Burgundy", hex: "#6b2737" }
];
const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low → High", value: "price-asc" },
  { label: "Price: High → Low", value: "price-desc" },
  { label: "Newest", value: "newest" }
];
function readParams() {
  const p = new URLSearchParams(window.location.search);
  const cat = p.get("category");
  return {
    filter: {
      category: cat ? cat : void 0,
      size: p.get("size") ?? void 0,
      color: p.get("color") ?? void 0,
      minPrice: p.get("minPrice") ? Number(p.get("minPrice")) : void 0,
      maxPrice: p.get("maxPrice") ? Number(p.get("maxPrice")) : void 0
    },
    sort: p.get("sort") ?? "featured",
    search: p.get("search") ?? ""
  };
}
function writeParams(filter, sort, search) {
  const p = new URLSearchParams();
  if (filter.category) p.set("category", filter.category);
  if (filter.size) p.set("size", filter.size);
  if (filter.color) p.set("color", filter.color);
  if (filter.minPrice !== void 0) p.set("minPrice", String(filter.minPrice));
  if (filter.maxPrice !== void 0) p.set("maxPrice", String(filter.maxPrice));
  if (sort !== "featured") p.set("sort", sort);
  if (search) p.set("search", search);
  const qs = p.toString();
  window.history.replaceState(
    null,
    "",
    qs ? `?${qs}` : window.location.pathname
  );
}
function sortProducts(products, sort) {
  const arr = [...products];
  if (sort === "price-asc")
    return arr.sort((a, b) => Number(a.price) - Number(b.price));
  if (sort === "price-desc")
    return arr.sort((a, b) => Number(b.price) - Number(a.price));
  if (sort === "newest")
    return arr.sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
  return arr;
}
function FilterSidebar({
  filter,
  onFilterChange,
  onClearAll,
  activeCount
}) {
  var _a, _b;
  const [minVal, setMinVal] = reactExports.useState(((_a = filter.minPrice) == null ? void 0 : _a.toString()) ?? "");
  const [maxVal, setMaxVal] = reactExports.useState(((_b = filter.maxPrice) == null ? void 0 : _b.toString()) ?? "");
  reactExports.useEffect(() => {
    var _a2, _b2;
    setMinVal(((_a2 = filter.minPrice) == null ? void 0 : _a2.toString()) ?? "");
    setMaxVal(((_b2 = filter.maxPrice) == null ? void 0 : _b2.toString()) ?? "");
  }, [filter.minPrice, filter.maxPrice]);
  const commitPrice = () => {
    const min = minVal !== "" ? Number(minVal) : void 0;
    const max = maxVal !== "" ? Number(maxVal) : void 0;
    onFilterChange({ minPrice: min, maxPrice: max });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "w-full lg:w-64 shrink-0", "data-ocid": "filter-sidebar", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border bg-card p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { size: 15, className: "text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm tracking-widest uppercase text-foreground", children: "Filters" }),
        activeCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs h-5 px-1.5", children: activeCount })
      ] }),
      activeCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: onClearAll,
          className: "text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1",
          "data-ocid": "clear-all-filters",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 12 }),
            "Clear all"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs tracking-widest uppercase text-muted-foreground mb-3 block", children: "Size" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-1.5", children: SIZES.map((size) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onFilterChange({
            size: filter.size === size ? void 0 : size
          }),
          className: `h-9 text-xs font-medium border transition-colors ${filter.size === size ? "border-foreground bg-foreground text-primary-foreground" : "border-border bg-background text-foreground hover:border-foreground"}`,
          "data-ocid": `size-${size.toLowerCase()}`,
          children: size
        },
        size
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs tracking-widest uppercase text-muted-foreground mb-3 block", children: "Color" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: COLORS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onFilterChange({
            color: filter.color === c.name ? void 0 : c.name
          }),
          title: c.name,
          className: `w-7 h-7 border-2 transition-all ${filter.color === c.name ? "border-foreground scale-110 ring-1 ring-foreground ring-offset-1" : "border-border hover:border-foreground"}`,
          style: { backgroundColor: c.hex },
          "data-ocid": `color-${c.name.toLowerCase()}`
        },
        c.name
      )) }),
      filter.color && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: filter.color })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs tracking-widest uppercase text-muted-foreground mb-3 block", children: "Price Range" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground", children: "$" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: 0,
              placeholder: "Min",
              value: minVal,
              onChange: (e) => setMinVal(e.target.value),
              onBlur: commitPrice,
              onKeyDown: (e) => e.key === "Enter" && commitPrice(),
              className: "pl-6 h-9 text-sm",
              "data-ocid": "price-min"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "–" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground", children: "$" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: 0,
              placeholder: "Max",
              value: maxVal,
              onChange: (e) => setMaxVal(e.target.value),
              onBlur: commitPrice,
              onKeyDown: (e) => e.key === "Enter" && commitPrice(),
              className: "pl-6 h-9 text-sm",
              "data-ocid": "price-max"
            }
          )
        ] })
      ] })
    ] })
  ] }) });
}
function ShopPage() {
  const initial = readParams();
  const [filter, setFilter] = reactExports.useState(initial.filter);
  const [sort, setSort] = reactExports.useState(initial.sort);
  const [search, setSearch] = reactExports.useState(initial.search);
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(false);
  const searchRef = reactExports.useRef(null);
  const activeFilter = {
    ...filter,
    searchTerm: search || void 0
  };
  const { data: rawProducts, isLoading } = useFilterProducts(activeFilter);
  const products = rawProducts ? sortProducts(rawProducts, sort) : void 0;
  reactExports.useEffect(() => {
    writeParams(filter, sort, search);
  }, [filter, sort, search]);
  const handleFilterChange = reactExports.useCallback(
    (patch) => {
      setFilter((prev) => ({ ...prev, ...patch }));
    },
    []
  );
  const clearAll = reactExports.useCallback(() => {
    setFilter({});
    setSort("featured");
    setSearch("");
  }, []);
  const activeCount = [
    filter.category,
    filter.size,
    filter.color,
    filter.minPrice,
    filter.maxPrice
  ].filter((v) => v !== void 0 && v !== "").length;
  const activeCategory = filter.category;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-card sticky top-0 z-30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-7xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center gap-0 overflow-x-auto no-scrollbar",
        "data-ocid": "category-nav",
        children: CATEGORIES.map((cat) => {
          const active = activeCategory === cat.value;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => handleFilterChange({ category: cat.value }),
              className: `relative px-5 py-4 text-sm font-medium whitespace-nowrap transition-colors ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`,
              "data-ocid": `cat-${cat.label.toLowerCase()}`,
              children: [
                cat.label,
                active && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" })
              ]
            },
            cat.label
          );
        })
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-7xl mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "svg",
            {
              "aria-hidden": "true",
              className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
              width: "15",
              height: "15",
              viewBox: "0 0 15 15",
              fill: "none",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M10 6.5C10 8.43 8.43 10 6.5 10C4.57 10 3 8.43 3 6.5C3 4.57 4.57 3 6.5 3C8.43 3 10 4.57 10 6.5ZM9.5 10.5a5.5 5.5 0 1 1 1-1l3 3-1 1-3-3Z",
                  fill: "currentColor"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              ref: searchRef,
              type: "search",
              placeholder: "Search products…",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "pl-9 h-9 text-sm",
              "data-ocid": "search-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            value: sort,
            onChange: (e) => setSort(e.target.value),
            className: "h-9 px-3 text-sm border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring min-w-[160px]",
            "data-ocid": "sort-select",
            children: SORT_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: opt.value, children: opt.label }, opt.value))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setSidebarOpen((v) => !v),
            className: "lg:hidden flex items-center gap-2",
            "data-ocid": "mobile-filter-toggle",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { size: 14 }),
              "Filters",
              activeCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs h-4 px-1 ml-0.5", children: activeCount })
            ]
          }
        ),
        products && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground ml-auto whitespace-nowrap", children: [
          products.length,
          " ",
          products.length === 1 ? "item" : "items"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-8 items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${sidebarOpen ? "block" : "hidden"} lg:block`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          FilterSidebar,
          {
            filter,
            onFilterChange: handleFilterChange,
            onClearAll: clearAll,
            activeCount
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5", children: ["a", "b", "c", "d", "e", "f", "g", "h"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[3/4] w-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/3" })
          ] }, k)) }),
          !isLoading && products && products.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5",
              "data-ocid": "products-grid",
              children: products.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product }, product.id.toString()))
            }
          ),
          !isLoading && products && products.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-24 text-center border border-border bg-card",
              "data-ocid": "empty-state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl text-foreground mb-2", children: "No products found" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 max-w-xs", children: search ? `No results for "${search}". Try different keywords or clear your filters.` : "Try adjusting your filters to see more results." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    onClick: clearAll,
                    "data-ocid": "empty-clear-btn",
                    children: "Clear all filters"
                  }
                )
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}
export {
  ShopPage as default
};
