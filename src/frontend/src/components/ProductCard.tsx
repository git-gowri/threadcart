import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Product } from "../backend";
import { useCart } from "../hooks/useCart";

interface ProductCardProps {
  product: Product;
}

const PLACEHOLDER = "/assets/generated/product-placeholder.jpg";

function formatPrice(price: bigint): string {
  return `$${(Number(price) / 100).toFixed(2)}`;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes[0] ?? "",
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0] ?? "",
  );
  const imageUrl = product.imageRefs[0] ?? PLACEHOLDER;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    addItem({
      productId: product.id.toString(),
      name: product.name,
      price: Number(product.price) / 100,
      image: imageUrl,
      size: selectedSize,
      color: selectedColor,
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <article
      className="group bg-card border border-border flex flex-col overflow-hidden transition-smooth hover:shadow-elevated"
      data-ocid="product-card"
    >
      <a
        href={`/shop/${product.id}`}
        className="block relative overflow-hidden aspect-[3/4] bg-muted"
      >
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
          }}
        />
        <Badge
          className="absolute top-3 left-3 bg-secondary text-secondary-foreground border-0 text-xs tracking-wider uppercase"
          data-ocid="product-category-badge"
        >
          {Object.keys(product.category as unknown as object)[0]?.replace(
            /^\w/,
            (c) => c.toUpperCase(),
          )}
        </Badge>
      </a>

      <div className="flex flex-col gap-3 p-4 flex-1">
        <div>
          <a href={`/shop/${product.id}`} className="block">
            <h3 className="font-display text-base text-foreground leading-tight truncate hover:text-accent transition-colors">
              {product.name}
            </h3>
          </a>
          <p className="text-accent font-body font-medium mt-1">
            {formatPrice(product.price)}
          </p>
        </div>

        {product.sizes.length > 0 && (
          <div
            className="flex flex-wrap gap-1"
            data-ocid="product-size-selector"
          >
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                type="button"
                className={`text-xs px-2 py-1 border transition-smooth ${
                  selectedSize === size
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-foreground border-border hover:border-accent"
                }`}
                aria-label={`Select size ${size}`}
                aria-pressed={selectedSize === size}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        {product.colors.length > 1 && (
          <div className="flex flex-wrap gap-1.5">
            {product.colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={`text-xs px-2 py-0.5 border transition-smooth ${
                  selectedColor === color
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted text-muted-foreground border-border hover:border-accent"
                }`}
                aria-label={`Select color ${color}`}
                aria-pressed={selectedColor === color}
              >
                {color}
              </button>
            ))}
          </div>
        )}

        <Button
          onClick={handleAddToCart}
          className="mt-auto w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"
          size="sm"
          data-ocid="add-to-cart-btn"
        >
          <ShoppingBag className="size-3.5" />
          Add to Cart
        </Button>
      </div>
    </article>
  );
}
