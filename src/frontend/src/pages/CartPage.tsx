import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Layout } from "../components/Layout";
import { useCart } from "../hooks/useCart";

const SHIPPING_THRESHOLD = 50;
const FLAT_SHIPPING = 8.99;
const TAX_RATE = 0.08;

function calcShipping(subtotal: number): number {
  return subtotal >= SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();

  const shipping = calcShipping(total);
  const tax = total * TAX_RATE;
  const grandTotal = total + shipping + tax;

  if (itemCount === 0) {
    return (
      <Layout>
        <div
          className="container max-w-7xl mx-auto px-4 py-32 flex flex-col items-center justify-center text-center"
          data-ocid="cart-empty-state"
        >
          <div className="w-20 h-20 bg-muted flex items-center justify-center mb-8">
            <ShoppingBag className="size-10 text-muted-foreground opacity-50" />
          </div>
          <h1 className="font-display text-4xl text-foreground mb-3 tracking-tight">
            Your bag is empty
          </h1>
          <p className="text-muted-foreground mb-10 max-w-sm">
            Looks like you haven't added anything yet. Browse our collections to
            find something you'll love.
          </p>
          <Button asChild size="lg" className="px-10 h-12 text-base">
            <a href="/shop">Continue Shopping</a>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-muted/30 border-b border-border">
        <div className="container max-w-7xl mx-auto px-4 py-6">
          <h1 className="font-display text-3xl text-foreground tracking-tight">
            Shopping Bag
            <span className="ml-3 font-body text-base font-normal text-muted-foreground">
              ({itemCount} {itemCount === 1 ? "item" : "items"})
            </span>
          </h1>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Items list */}
          <div className="lg:col-span-2 space-y-3" data-ocid="cart-items">
            {items.map((item) => {
              const key = `${item.productId}-${item.size}-${item.color}`;
              const lineTotal = item.price * item.quantity;
              return (
                <div
                  key={key}
                  className="flex gap-5 bg-card border border-border p-5 transition-smooth hover:border-accent/40"
                  data-ocid="cart-item"
                >
                  {/* Product image */}
                  <a
                    href={`/shop/${item.productId}`}
                    className="w-24 h-32 sm:w-28 sm:h-36 flex-shrink-0 overflow-hidden bg-muted block"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </a>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <a
                          href={`/shop/${item.productId}`}
                          className="font-body font-semibold text-foreground text-sm leading-snug hover:text-accent transition-colors line-clamp-2"
                        >
                          {item.name}
                        </a>
                        <div className="flex flex-wrap items-center gap-x-3 mt-1.5">
                          {item.size && (
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">
                              Size:{" "}
                              <span className="font-medium text-foreground">
                                {item.size}
                              </span>
                            </span>
                          )}
                          {item.color && (
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">
                              Color:{" "}
                              <span className="font-medium text-foreground">
                                {item.color}
                              </span>
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          removeItem(item.productId, item.size, item.color)
                        }
                        className="flex-shrink-0 p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remove item"
                        data-ocid="remove-item-btn"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-border">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.color,
                              item.quantity - 1,
                            )
                          }
                          className="w-9 h-9 flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                          aria-label="Decrease quantity"
                          data-ocid="qty-decrease"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span
                          className="w-10 h-9 flex items-center justify-center text-sm font-medium border-x border-border"
                          aria-live="polite"
                        >
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.color,
                              item.quantity + 1,
                            )
                          }
                          className="w-9 h-9 flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                          aria-label="Increase quantity"
                          data-ocid="qty-increase"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>

                      {/* Line total */}
                      <div className="text-right">
                        <p className="font-semibold text-foreground">
                          ${lineTotal.toFixed(2)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-muted-foreground">
                            ${item.price.toFixed(2)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-1">
            <div
              className="bg-card border border-border p-6 sticky top-24"
              data-ocid="cart-summary"
            >
              <h2 className="font-display text-xl text-foreground mb-5">
                Order Summary
              </h2>
              <Separator className="mb-5" />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
                  </span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-accent font-medium">Free</span>
                  ) : (
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  )}
                </div>

                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground bg-muted/60 px-3 py-2 leading-relaxed">
                    Add ${(SHIPPING_THRESHOLD - total).toFixed(2)} more for free
                    shipping
                  </p>
                )}

                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Estimated Tax (8%)
                  </span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
              </div>

              <Separator className="my-5" />

              <div className="flex justify-between font-semibold text-base mb-6">
                <span>Estimated Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>

              <Button
                asChild
                className="w-full h-12 text-base font-semibold"
                data-ocid="checkout-btn"
              >
                <a href="/checkout">Proceed to Checkout</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full mt-3 h-10"
                data-ocid="continue-shopping-btn"
              >
                <a href="/shop">Continue Shopping</a>
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4 leading-relaxed">
                Taxes and final shipping are confirmed at checkout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
