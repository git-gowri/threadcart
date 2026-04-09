import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useParams } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Package, ShoppingBag } from "lucide-react";
import { Layout } from "../components/Layout";
import { useOrder } from "../hooks/useOrders";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-secondary text-secondary-foreground border-secondary",
  confirmed: "bg-accent/15 text-accent border-accent/30",
  shipped: "bg-primary/10 text-primary border-primary/20",
  delivered: "bg-muted text-muted-foreground border-border",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  shipped: "Shipped",
  delivered: "Delivered",
};

function formatDate(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatCurrency(cents: bigint | number): string {
  return `$${(Number(cents) / 100).toFixed(2)}`;
}

export default function AccountOrderDetailPage() {
  const { orderId } = useParams({ from: "/account/orders/$orderId" });
  const { loginStatus } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success";
  const { data: order, isLoading } = useOrder(
    isLoggedIn ? BigInt(orderId) : undefined,
  );

  const itemSubtotal = order
    ? order.items.reduce(
        (acc, item) =>
          acc + Number(item.priceAtPurchase) * Number(item.quantity),
        0,
      )
    : 0;
  const shipping = order
    ? Math.max(0, Number(order.totalAmount) - itemSubtotal)
    : 0;

  return (
    <Layout>
      <div className="bg-muted/30 border-b border-border">
        <div className="container max-w-2xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2 mb-2">
            <a
              href="/account"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Account
            </a>
            <span className="text-muted-foreground">/</span>
            <a
              href="/account/orders"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Orders
            </a>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm text-foreground truncate max-w-24">
              #{orderId}
            </span>
          </div>
          <a
            href="/account/orders"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="back-to-orders-link"
          >
            <ArrowLeft className="size-4" />
            Back to Orders
          </a>
        </div>
      </div>

      <div className="container max-w-2xl mx-auto px-4 py-8">
        {isLoading && (
          <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        )}

        {!isLoading && order && (
          <div className="space-y-5" data-ocid="order-detail">
            {/* Order header */}
            <div className="bg-card border border-border p-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Order Number
                </p>
                <p className="font-mono text-lg font-medium text-foreground">
                  #{order.id.toString()}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Placed on {formatDate(order.createdAt)}
                </p>
              </div>
              <Badge
                className={`${STATUS_STYLES[order.status.toLowerCase()] ?? "bg-muted text-muted-foreground"} border text-xs uppercase tracking-wider flex-shrink-0`}
                data-ocid="order-status-badge"
              >
                {STATUS_LABELS[order.status.toLowerCase()] ?? order.status}
              </Badge>
            </div>

            {/* Items */}
            <div
              className="bg-card border border-border"
              data-ocid="order-items"
            >
              <div className="p-6 pb-4 flex items-center gap-2">
                <ShoppingBag className="size-4 text-muted-foreground" />
                <h2 className="font-display text-base text-foreground uppercase tracking-wider text-sm">
                  Items Ordered
                </h2>
              </div>
              <Separator />
              <div className="p-6 space-y-4">
                {order.items.map((item, i) => (
                  <div
                    key={`${item.productId}-${i}`}
                    className="flex items-start justify-between gap-4"
                    data-ocid="order-item"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        Item {i + 1}
                      </p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5">
                          {item.size}
                        </span>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5">
                          {item.color}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Qty: {item.quantity.toString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-medium text-foreground">
                        {formatCurrency(
                          Number(item.priceAtPurchase) * Number(item.quantity),
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {formatCurrency(item.priceAtPurchase)} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div
              className="bg-card border border-border"
              data-ocid="order-shipping"
            >
              <div className="p-6 pb-4 flex items-center gap-2">
                <MapPin className="size-4 text-muted-foreground" />
                <h2 className="font-display text-base text-foreground uppercase tracking-wider text-sm">
                  Shipping Address
                </h2>
              </div>
              <Separator />
              <div className="p-6">
                <p className="text-sm font-medium text-foreground">
                  {order.shippingAddress.fullName}
                </p>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {order.shippingAddress.street}
                  <br />
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.postalCode}
                  <br />
                  {order.shippingAddress.country}
                </p>
              </div>
            </div>

            {/* Order total breakdown */}
            <div
              className="bg-card border border-border"
              data-ocid="order-totals"
            >
              <div className="p-6 pb-4 flex items-center gap-2">
                <Package className="size-4 text-muted-foreground" />
                <h2 className="font-display text-base text-foreground uppercase tracking-wider text-sm">
                  Order Summary
                </h2>
              </div>
              <Separator />
              <div className="p-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">
                    {formatCurrency(itemSubtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">
                    {shipping === 0 ? "Free" : formatCurrency(shipping)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground font-display text-lg">
                    {formatCurrency(order.totalAmount)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <Button
                asChild
                variant="outline"
                className="flex-1"
                data-ocid="back-to-orders-btn"
              >
                <a href="/account/orders">
                  <ArrowLeft className="size-4" />
                  All Orders
                </a>
              </Button>
              <Button
                asChild
                className="flex-1"
                data-ocid="continue-shopping-btn"
              >
                <a href="/shop">Continue Shopping</a>
              </Button>
            </div>
          </div>
        )}

        {!isLoading && !order && (
          <div
            className="text-center py-16 border border-border bg-card"
            data-ocid="order-not-found"
          >
            <Package className="size-16 text-muted-foreground mx-auto mb-6 opacity-30" />
            <p className="font-display text-2xl text-foreground mb-2">
              Order not found
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              This order may not exist or belong to your account.
            </p>
            <Button asChild variant="outline" data-ocid="back-btn">
              <a href="/account/orders">Back to Orders</a>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
