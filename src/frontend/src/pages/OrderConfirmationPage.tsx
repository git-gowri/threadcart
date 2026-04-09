import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useParams } from "@tanstack/react-router";
import { CheckCircle2, Package, UserPlus } from "lucide-react";
import { Layout } from "../components/Layout";
import { useOrder } from "../hooks/useOrders";

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  shipped: "Shipped",
  delivered: "Delivered",
};

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-secondary text-secondary-foreground border-0",
  confirmed: "bg-accent text-accent-foreground border-0",
  shipped: "bg-primary text-primary-foreground border-0",
  delivered: "bg-muted text-muted-foreground border-0",
};

function getEstimatedDelivery(): string {
  const date = new Date();
  let businessDays = 0;
  let daysAdded = 0;
  while (businessDays < 5) {
    date.setDate(date.getDate() + 1);
    daysAdded++;
    const day = date.getDay();
    if (day !== 0 && day !== 6) businessDays++;
    if (daysAdded > 30) break;
  }
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function OrderConfirmationPage() {
  const { orderId } = useParams({ from: "/order-confirmation/$orderId" });
  const { data: order, isLoading } = useOrder(BigInt(orderId));
  const { loginStatus } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success";
  const estimatedDelivery = getEstimatedDelivery();

  return (
    <Layout>
      <div className="container max-w-2xl mx-auto px-4 py-16">
        {isLoading && (
          <div className="space-y-6 animate-pulse">
            <Skeleton className="h-16 w-16 mx-auto" />
            <Skeleton className="h-10 w-3/5 mx-auto" />
            <Skeleton className="h-5 w-2/3 mx-auto" />
            <div className="space-y-3 mt-8">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-4/5" />
            </div>
          </div>
        )}

        {!isLoading && order && (
          <div className="space-y-8" data-ocid="order-confirmation">
            {/* Success header */}
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="size-9 text-accent" />
              </div>
              <h1 className="font-display text-4xl text-foreground mb-3 tracking-tight">
                Order Confirmed!
              </h1>
              <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
                Thank you for your order. We've received your purchase and will
                get started right away.
              </p>
            </div>

            {/* Order ID + status card */}
            <div className="bg-card border border-border p-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                  Order Number
                </p>
                <p className="font-mono text-foreground font-semibold">
                  #{order.id.toString().padStart(6, "0")}
                </p>
              </div>
              <Badge
                className={
                  STATUS_STYLES[order.status] ??
                  "bg-muted text-muted-foreground border-0"
                }
              >
                {STATUS_LABELS[order.status] ?? order.status}
              </Badge>
            </div>

            {/* Estimated delivery */}
            <div className="bg-muted/40 border border-border p-5 flex items-start gap-4">
              <Package className="size-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground text-sm">
                  Estimated Delivery
                </p>
                <p className="text-muted-foreground text-sm mt-0.5">
                  {estimatedDelivery} (3–5 business days)
                </p>
              </div>
            </div>

            {/* Order summary */}
            <div className="bg-card border border-border p-6 space-y-5">
              <h2 className="font-display text-lg text-foreground">
                Order Summary
              </h2>
              <Separator />

              {/* Items */}
              <div className="space-y-3">
                {order.items.map((item, i) => {
                  const lineTotal =
                    (Number(item.priceAtPurchase) / 100) *
                    Number(item.quantity);
                  return (
                    <div
                      key={`${item.productId}-${i}`}
                      className="flex items-center justify-between text-sm gap-3"
                      data-ocid="order-item"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-6 h-6 bg-muted flex items-center justify-center text-xs font-medium flex-shrink-0">
                          {item.quantity.toString()}
                        </span>
                        <div className="min-w-0">
                          <p className="text-foreground font-medium truncate">
                            Item {i + 1}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {item.size} · {item.color}
                          </p>
                        </div>
                      </div>
                      <span className="font-medium text-foreground flex-shrink-0">
                        ${lineTotal.toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <Separator />

              <div className="flex justify-between font-semibold text-base">
                <span>Total Charged</span>
                <span>${(Number(order.totalAmount) / 100).toFixed(2)}</span>
              </div>

              {/* Shipping address */}
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">
                  Shipping To
                </p>
                <p className="font-medium text-foreground text-sm">
                  {order.shippingAddress.fullName}
                </p>
                <p className="text-muted-foreground text-sm mt-0.5 leading-relaxed">
                  {order.shippingAddress.street}
                  <br />
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.postalCode}
                  <br />
                  {order.shippingAddress.country}
                </p>
                {order.guestEmail && (
                  <p className="text-muted-foreground text-sm mt-1">
                    Confirmation sent to:{" "}
                    <span className="text-foreground">{order.guestEmail}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Guest account prompt */}
            {!isLoggedIn && (
              <div
                className="bg-secondary/30 border border-border p-5 flex items-start gap-4"
                data-ocid="guest-account-prompt"
              >
                <UserPlus className="size-5 text-accent flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-sm">
                    Track future orders with an account
                  </p>
                  <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                    Sign in with Internet Identity to save your addresses, view
                    order history, and get faster checkout next time.
                  </p>
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                className="flex-1 h-11"
                data-ocid="continue-shopping-btn"
              >
                <a href="/shop">Continue Shopping</a>
              </Button>
              {isLoggedIn && (
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 h-11"
                  data-ocid="view-orders-btn"
                >
                  <a href="/account/orders">View Account Orders</a>
                </Button>
              )}
            </div>
          </div>
        )}

        {!isLoading && !order && (
          <div className="text-center py-16" data-ocid="order-not-found">
            <p className="font-display text-3xl text-foreground mb-3">
              Order not found
            </p>
            <p className="text-muted-foreground mb-8">
              We couldn't find that order. It may still be processing.
            </p>
            <Button asChild>
              <a href="/shop">Return to Shop</a>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
