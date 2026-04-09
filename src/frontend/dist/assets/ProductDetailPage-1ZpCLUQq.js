import { a as useParams, r as reactExports, j as jsxRuntimeExports, u as ue, S as Skeleton } from "./index-BH8qyL0M.js";
import { u as useCart, L as Layout, S as ShoppingBag, a as Button, B as Badge } from "./Layout-BLXPJbtK.js";
import { S as Separator } from "./separator-HhzUdilm.js";
import { a as useProduct } from "./useProducts-CiM4J0yi.js";
import { A as ArrowLeft } from "./arrow-left-C-epcK1T.js";
import { M as Minus } from "./minus-zbQVrhJc.js";
import { P as Plus } from "./plus-BS7fI2CK.js";
import { C as ChevronDown } from "./chevron-down-VGfPPhzO.js";
import "./useActor-DLK9v9XA.js";
function formatPrice(price) {
  return `$${(Number(price) / 100).toFixed(2)}`;
}
const COLOR_MAP = {
  black: "#1a1a1a",
  white: "#f5f5f5",
  cream: "#f5f0e8",
  ivory: "#fffff0",
  beige: "#d4c9b0",
  taupe: "#8b7d6b",
  charcoal: "#3c3c3c",
  navy: "#1e2d5a",
  brown: "#6b4226",
  camel: "#c19a6b",
  tan: "#d2b48c",
  khaki: "#c3b091",
  grey: "#808080",
  gray: "#808080",
  red: "#c0392b",
  burgundy: "#6d1f2f",
  green: "#2d5a27",
  olive: "#6b6b2d",
  blue: "#2c5282",
  slate: "#607b96",
  pink: "#e8a0b0",
  blush: "#f2b5b5",
  rust: "#b7410e",
  terracotta: "#c25f3d",
  sand: "#dcc9a0",
  stone: "#a09080",
  sage: "#7d9e7d",
  denim: "#3b6897"
};
function getSwatchColor(colorName) {
  const key = colorName.toLowerCase().trim();
  if (COLOR_MAP[key]) return COLOR_MAP[key];
  for (const [k, v] of Object.entries(COLOR_MAP)) {
    if (key.includes(k) || k.includes(key)) return v;
  }
  return "#ccc";
}
function isDarkSwatch(colorName) {
  const dark = [
    "black",
    "charcoal",
    "navy",
    "brown",
    "burgundy",
    "green",
    "denim",
    "slate",
    "grey",
    "gray"
  ];
  const key = colorName.toLowerCase();
  return dark.some((d) => key.includes(d));
}
function ProductDetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-7xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48 mb-6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[55%_1fr] gap-10 lg:gap-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[4/5] w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: [1, 2, 3, 4].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-16 h-16 flex-shrink-0" }, n)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-24" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-3/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-1/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4/5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: [1, 2, 3, 4].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-10 h-10" }, n)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-8 h-8 rounded-full" }, n)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full mt-4" })
      ] })
    ] })
  ] }) });
}
function ProductDetailPage() {
  const { productId } = useParams({ from: "/shop/$productId" });
  const id = BigInt(productId);
  const { data: product, isLoading } = useProduct(id);
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = reactExports.useState("");
  const [selectedColor, setSelectedColor] = reactExports.useState("");
  const [quantity, setQuantity] = reactExports.useState(1);
  const [activeImage, setActiveImage] = reactExports.useState(0);
  const [careOpen, setCareOpen] = reactExports.useState(false);
  const [isZoomed, setIsZoomed] = reactExports.useState(false);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(ProductDetailSkeleton, {});
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container max-w-7xl mx-auto px-4 py-32 text-center flex flex-col items-center gap-6",
        "data-ocid": "product-not-found",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 border-2 border-border flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "size-7 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl text-foreground mb-2", children: "Product not found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "This item may no longer be available." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/shop", "data-ocid": "back-to-shop-404", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4" }),
            "Back to Shop"
          ] }) })
        ]
      }
    ) });
  }
  const images = product.imageRefs.length > 0 ? product.imageRefs : ["/assets/generated/product-placeholder.jpg"];
  const imageUrl = images[activeImage] ?? images[0];
  const categoryLabel = typeof product.category === "string" ? product.category : Object.keys(product.category)[0] ?? "Shop";
  const canAddToCart = product.sizes.length === 0 || selectedSize !== "";
  const handleQtyDown = () => setQuantity((q) => Math.max(1, q - 1));
  const handleQtyUp = () => setQuantity((q) => Math.min(99, q + 1));
  const handleAddToCart = () => {
    if (!canAddToCart) {
      ue.error("Please select a size before adding to cart");
      return;
    }
    addItem({
      productId: product.id.toString(),
      name: product.name,
      price: Number(product.price) / 100,
      image: images[0],
      size: selectedSize || product.sizes[0] || "",
      color: selectedColor || product.colors[0] || "",
      quantity
    });
    ue.success(`${product.name} added to cart`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-7xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: "/shop",
          className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
          "data-ocid": "back-to-shop",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-3.5" }),
            "Back to Shop"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "nav",
        {
          "aria-label": "breadcrumb",
          className: "hidden md:flex items-center gap-1.5 text-xs text-muted-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/shop", className: "hover:text-foreground transition-colors", children: "Home" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: `/shop?category=${categoryLabel}`,
                className: "hover:text-foreground transition-colors capitalize",
                children: categoryLabel
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground truncate max-w-[200px]", children: product.name })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[55%_1fr] gap-10 lg:gap-16 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 sticky top-6", "data-ocid": "image-gallery", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "aspect-[4/5] overflow-hidden bg-muted/30 border border-border cursor-zoom-in relative",
            onMouseEnter: () => setIsZoomed(true),
            onMouseLeave: () => setIsZoomed(false),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: imageUrl,
                  alt: product.name,
                  className: "w-full h-full object-cover transition-transform duration-500 ease-out",
                  style: { transform: isZoomed ? "scale(1.08)" : "scale(1)" }
                }
              ),
              product.sizes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "secondary",
                  className: "uppercase text-[10px] tracking-widest font-semibold",
                  children: categoryLabel
                }
              ) })
            ]
          }
        ),
        images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex gap-2 overflow-x-auto pb-1",
            "data-ocid": "thumbnail-strip",
            children: images.map((ref, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setActiveImage(i),
                "aria-label": `View image ${i + 1}`,
                "aria-pressed": activeImage === i,
                className: `flex-shrink-0 w-16 h-20 overflow-hidden border-2 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${activeImage === i ? "border-foreground" : "border-transparent hover:border-border"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: ref,
                    alt: "",
                    className: "w-full h-full object-cover"
                  }
                )
              },
              ref || `img-thumb-${i}`
            ))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "product-detail", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 font-semibold", children: categoryLabel }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl text-foreground leading-tight mb-3", children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-body font-semibold text-foreground", children: formatPrice(product.price) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-sm", children: product.description }),
        product.colors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground uppercase tracking-[0.12em]", children: "Color" }),
            selectedColor && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground capitalize", children: [
              "— ",
              selectedColor
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex flex-wrap gap-2.5",
              "data-ocid": "color-selector",
              children: product.colors.map((color) => {
                const swatchBg = getSwatchColor(color);
                const dark = isDarkSwatch(color);
                const isSelected = selectedColor === color;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setSelectedColor(color),
                    "aria-pressed": isSelected,
                    "aria-label": color,
                    title: color,
                    className: `w-8 h-8 rounded-full border-2 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${isSelected ? dark ? "border-foreground ring-2 ring-foreground/20" : "border-foreground ring-2 ring-foreground/20" : "border-border hover:border-foreground/50"}`,
                    style: { backgroundColor: swatchBg },
                    children: isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "flex items-center justify-center w-full h-full text-[10px]",
                        style: { color: dark ? "#fff" : "#1a1a1a" },
                        children: "✓"
                      }
                    )
                  },
                  color
                );
              })
            }
          )
        ] }),
        product.sizes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-foreground uppercase tracking-[0.12em]", children: [
              "Size",
              !selectedSize && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-destructive normal-case font-normal tracking-normal", children: "* required" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "text-xs text-muted-foreground underline hover:text-foreground transition-colors",
                children: "Size guide"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", "data-ocid": "size-selector", children: product.sizes.map((size) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSelectedSize(size),
              "aria-pressed": selectedSize === size,
              className: `min-w-[44px] h-11 px-3 text-sm font-medium border transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selectedSize === size ? "bg-foreground text-background border-foreground" : "bg-background text-foreground border-border hover:border-foreground"}`,
              children: size
            },
            size
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground uppercase tracking-[0.12em] mb-3", children: "Quantity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "inline-flex items-center border border-border",
              "data-ocid": "quantity-stepper",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleQtyDown,
                    "aria-label": "Decrease quantity",
                    disabled: quantity <= 1,
                    className: "w-11 h-11 flex items-center justify-center text-foreground hover:bg-muted transition-smooth disabled:opacity-40 disabled:cursor-not-allowed",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "size-3.5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "w-12 h-11 flex items-center justify-center text-sm font-semibold text-foreground border-x border-border select-none",
                    "aria-live": "polite",
                    "aria-label": `Quantity: ${quantity}`,
                    children: quantity
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleQtyUp,
                    "aria-label": "Increase quantity",
                    disabled: quantity >= 99,
                    className: "w-11 h-11 flex items-center justify-center text-foreground hover:bg-muted transition-smooth disabled:opacity-40 disabled:cursor-not-allowed",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-3.5" })
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handleAddToCart,
              disabled: !canAddToCart,
              className: "w-full h-13 text-sm font-semibold tracking-widest uppercase gap-2.5",
              "data-ocid": "add-to-cart-btn",
              size: "lg",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "size-4" }),
                canAddToCart ? "Add to Cart" : "Select a Size"
              ]
            }
          ),
          !canAddToCart && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "Please select a size to continue" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        product.careInstructions && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "care-instructions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setCareOpen((o) => !o),
              className: "w-full flex items-center justify-between py-3 text-left group",
              "aria-expanded": careOpen,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.12em] text-foreground", children: "Care Instructions" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ChevronDown,
                  {
                    className: `size-4 text-muted-foreground transition-transform duration-200 ${careOpen ? "rotate-180" : ""}`
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `overflow-hidden transition-all duration-300 ease-in-out ${careOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed pb-4", children: product.careInstructions })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {})
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" }),
            "Free shipping on orders over $100"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" }),
            "Free returns within 30 days"
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  ProductDetailPage as default
};
