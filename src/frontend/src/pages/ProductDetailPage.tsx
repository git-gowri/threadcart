import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "@tanstack/react-router";
import { ArrowLeft, ChevronDown, Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Layout } from "../components/Layout";
import { useCart } from "../hooks/useCart";
import { useProduct } from "../hooks/useProducts";

function formatPrice(price: bigint): string {
  return `$${(Number(price) / 100).toFixed(2)}`;
}

/** Map common color names to CSS values for swatch rendering */
const COLOR_MAP: Record<string, string> = {
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
  denim: "#3b6897",
};

function getSwatchColor(colorName: string): string {
  const key = colorName.toLowerCase().trim();
  if (COLOR_MAP[key]) return COLOR_MAP[key];
  // Try partial match
  for (const [k, v] of Object.entries(COLOR_MAP)) {
    if (key.includes(k) || k.includes(key)) return v;
  }
  return "#ccc";
}

function isDarkSwatch(colorName: string): boolean {
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
    "gray",
  ];
  const key = colorName.toLowerCase();
  return dark.some((d) => key.includes(d));
}

function ProductDetailSkeleton() {
  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <Skeleton className="h-4 w-48 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-[55%_1fr] gap-10 lg:gap-16">
          <div className="space-y-3">
            <Skeleton className="aspect-[4/5] w-full" />
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((n) => (
                <Skeleton key={n} className="w-16 h-16 flex-shrink-0" />
              ))}
            </div>
          </div>
          <div className="space-y-5 pt-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-9 w-3/4" />
            <Skeleton className="h-7 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-5/6" />
            <div className="space-y-2 pt-2">
              <Skeleton className="h-4 w-16" />
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((n) => (
                  <Skeleton key={n} className="w-10 h-10" />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <div className="flex gap-2">
                {[1, 2, 3].map((n) => (
                  <Skeleton key={n} className="w-8 h-8 rounded-full" />
                ))}
              </div>
            </div>
            <Skeleton className="h-12 w-full mt-4" />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default function ProductDetailPage() {
  const { productId } = useParams({ from: "/shop/$productId" });
  const id = BigInt(productId);
  const { data: product, isLoading } = useProduct(id);
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<number>(0);
  const [careOpen, setCareOpen] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  if (isLoading) return <ProductDetailSkeleton />;

  if (!product) {
    return (
      <Layout>
        <div
          className="container max-w-7xl mx-auto px-4 py-32 text-center flex flex-col items-center gap-6"
          data-ocid="product-not-found"
        >
          <div className="w-16 h-16 border-2 border-border flex items-center justify-center">
            <ShoppingBag className="size-7 text-muted-foreground" />
          </div>
          <div>
            <h1 className="font-display text-2xl text-foreground mb-2">
              Product not found
            </h1>
            <p className="text-muted-foreground text-sm">
              This item may no longer be available.
            </p>
          </div>
          <Button asChild variant="outline" className="gap-2">
            <a href="/shop" data-ocid="back-to-shop-404">
              <ArrowLeft className="size-4" />
              Back to Shop
            </a>
          </Button>
        </div>
      </Layout>
    );
  }

  const images =
    product.imageRefs.length > 0
      ? product.imageRefs
      : ["/assets/generated/product-placeholder.jpg"];
  const imageUrl = images[activeImage] ?? images[0];
  const categoryLabel =
    typeof product.category === "string"
      ? product.category
      : (Object.keys(product.category)[0] ?? "Shop");

  const canAddToCart = product.sizes.length === 0 || selectedSize !== "";

  const handleQtyDown = () => setQuantity((q) => Math.max(1, q - 1));
  const handleQtyUp = () => setQuantity((q) => Math.min(99, q + 1));

  const handleAddToCart = () => {
    if (!canAddToCart) {
      toast.error("Please select a size before adding to cart");
      return;
    }
    addItem({
      productId: product.id.toString(),
      name: product.name,
      price: Number(product.price) / 100,
      image: images[0],
      size: selectedSize || product.sizes[0] || "",
      color: selectedColor || product.colors[0] || "",
      quantity,
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb + back link */}
        <div className="flex items-center justify-between mb-6">
          <a
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="back-to-shop"
          >
            <ArrowLeft className="size-3.5" />
            Back to Shop
          </a>
          <nav
            aria-label="breadcrumb"
            className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground"
          >
            <a href="/shop" className="hover:text-foreground transition-colors">
              Home
            </a>
            <span>/</span>
            <a
              href={`/shop?category=${categoryLabel}`}
              className="hover:text-foreground transition-colors capitalize"
            >
              {categoryLabel}
            </a>
            <span>/</span>
            <span className="text-foreground truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>
        </div>

        {/* Main grid — 55% image / rest info on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[55%_1fr] gap-10 lg:gap-16 items-start">
          {/* === IMAGE GALLERY === */}
          <div className="space-y-3 sticky top-6" data-ocid="image-gallery">
            {/* Primary image with zoom */}
            <div
              className="aspect-[4/5] overflow-hidden bg-muted/30 border border-border cursor-zoom-in relative"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <img
                src={imageUrl}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 ease-out"
                style={{ transform: isZoomed ? "scale(1.08)" : "scale(1)" }}
              />
              {/* Low-stock badge if needed */}
              {product.sizes.length > 0 && (
                <div className="absolute top-3 left-3">
                  <Badge
                    variant="secondary"
                    className="uppercase text-[10px] tracking-widest font-semibold"
                  >
                    {categoryLabel}
                  </Badge>
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div
                className="flex gap-2 overflow-x-auto pb-1"
                data-ocid="thumbnail-strip"
              >
                {images.map((ref, i) => (
                  <button
                    key={ref || `img-thumb-${i}`}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1}`}
                    aria-pressed={activeImage === i}
                    className={`flex-shrink-0 w-16 h-20 overflow-hidden border-2 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      activeImage === i
                        ? "border-foreground"
                        : "border-transparent hover:border-border"
                    }`}
                  >
                    <img
                      src={ref}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* === PRODUCT INFO === */}
          <div className="space-y-6" data-ocid="product-detail">
            {/* Header block */}
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 font-semibold">
                {categoryLabel}
              </p>
              <h1 className="font-display text-4xl text-foreground leading-tight mb-3">
                {product.name}
              </h1>
              <p className="text-2xl font-body font-semibold text-foreground">
                {formatPrice(product.price)}
              </p>
            </div>

            <Separator />

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed text-sm">
              {product.description}
            </p>

            {/* Color selector */}
            {product.colors.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <p className="text-xs font-semibold text-foreground uppercase tracking-[0.12em]">
                    Color
                  </p>
                  {selectedColor && (
                    <span className="text-xs text-muted-foreground capitalize">
                      — {selectedColor}
                    </span>
                  )}
                </div>
                <div
                  className="flex flex-wrap gap-2.5"
                  data-ocid="color-selector"
                >
                  {product.colors.map((color) => {
                    const swatchBg = getSwatchColor(color);
                    const dark = isDarkSwatch(color);
                    const isSelected = selectedColor === color;
                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        aria-pressed={isSelected}
                        aria-label={color}
                        title={color}
                        className={`w-8 h-8 rounded-full border-2 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                          isSelected
                            ? dark
                              ? "border-foreground ring-2 ring-foreground/20"
                              : "border-foreground ring-2 ring-foreground/20"
                            : "border-border hover:border-foreground/50"
                        }`}
                        style={{ backgroundColor: swatchBg }}
                      >
                        {isSelected && (
                          <span
                            className="flex items-center justify-center w-full h-full text-[10px]"
                            style={{ color: dark ? "#fff" : "#1a1a1a" }}
                          >
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size selector */}
            {product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-foreground uppercase tracking-[0.12em]">
                    Size
                    {!selectedSize && (
                      <span className="ml-2 text-destructive normal-case font-normal tracking-normal">
                        * required
                      </span>
                    )}
                  </p>
                  <button
                    type="button"
                    className="text-xs text-muted-foreground underline hover:text-foreground transition-colors"
                  >
                    Size guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2" data-ocid="size-selector">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      aria-pressed={selectedSize === size}
                      className={`min-w-[44px] h-11 px-3 text-sm font-medium border transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        selectedSize === size
                          ? "bg-foreground text-background border-foreground"
                          : "bg-background text-foreground border-border hover:border-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity stepper */}
            <div>
              <p className="text-xs font-semibold text-foreground uppercase tracking-[0.12em] mb-3">
                Quantity
              </p>
              <div
                className="inline-flex items-center border border-border"
                data-ocid="quantity-stepper"
              >
                <button
                  type="button"
                  onClick={handleQtyDown}
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                  className="w-11 h-11 flex items-center justify-center text-foreground hover:bg-muted transition-smooth disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Minus className="size-3.5" />
                </button>
                <span
                  className="w-12 h-11 flex items-center justify-center text-sm font-semibold text-foreground border-x border-border select-none"
                  aria-live="polite"
                  aria-label={`Quantity: ${quantity}`}
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleQtyUp}
                  aria-label="Increase quantity"
                  disabled={quantity >= 99}
                  className="w-11 h-11 flex items-center justify-center text-foreground hover:bg-muted transition-smooth disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
            </div>

            {/* Add to cart CTA */}
            <div className="space-y-2 pt-1">
              <Button
                onClick={handleAddToCart}
                disabled={!canAddToCart}
                className="w-full h-13 text-sm font-semibold tracking-widest uppercase gap-2.5"
                data-ocid="add-to-cart-btn"
                size="lg"
              >
                <ShoppingBag className="size-4" />
                {canAddToCart ? "Add to Cart" : "Select a Size"}
              </Button>
              {!canAddToCart && (
                <p className="text-xs text-muted-foreground text-center">
                  Please select a size to continue
                </p>
              )}
            </div>

            <Separator />

            {/* Care instructions — collapsible */}
            {product.careInstructions && (
              <div data-ocid="care-instructions">
                <button
                  type="button"
                  onClick={() => setCareOpen((o) => !o)}
                  className="w-full flex items-center justify-between py-3 text-left group"
                  aria-expanded={careOpen}
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground">
                    Care Instructions
                  </span>
                  <ChevronDown
                    className={`size-4 text-muted-foreground transition-transform duration-200 ${
                      careOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    careOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-sm text-muted-foreground leading-relaxed pb-4">
                    {product.careInstructions}
                  </p>
                </div>
                <Separator />
              </div>
            )}

            {/* Shipping note */}
            <div className="flex flex-col gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                Free shipping on orders over $100
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                Free returns within 30 days
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
