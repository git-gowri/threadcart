import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { ArrowRight, LogIn, Package } from "lucide-react";
import { Layout } from "../components/Layout";
import { useMyOrders } from "../hooks/useOrders";

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
    month: "short",
    day: "numeric",
  });
}

function formatCurrency(cents: bigint): string {
  return `$${(Number(cents) / 100).toFixed(2)}`;
}

export default function AccountOrdersPage() {
  const { login, loginStatus } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success";
  const { data: orders, isLoading } = useMyOrders();

  if (!isLoggedIn) {
    return (
      <Layout>
        <div
          className="container max-w-md mx-auto px-4 py-24 text-center"
          data-ocid="orders-login-prompt"
        >
          <div className="border border-border bg-card p-12">
            <LogIn className="size-16 text-muted-foreground mx-auto mb-6 opacity-30" />
            <h1 className="font-display text-3xl text-foreground mb-3">
              Order History
            </h1>
            <p className="text-muted-foreground text-sm mb-8">
              Sign in to view your order history and track shipments.
            </p>
            <Button
              onClick={() => login()}
              className="w-full"
              data-ocid="orders-login-btn"
            >
              <LogIn className="size-4" />
              Sign In with Internet Identity
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-muted/30 border-b border-border">
        <div className="container max-w-3xl mx-auto px-4 py-8">
          <div className="flex items-center gap-2 mb-1">
            <a
              href="/account"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Account
            </a>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm text-foreground">Orders</span>
          </div>
          <h1 className="font-display text-2xl text-foreground">
            Order History
          </h1>
        </div>
      </div>

      <div
        className="container max-w-3xl mx-auto px-4 py-8"
        data-ocid="orders-page"
      >
        {isLoading && (
          <div className="space-y-4">
            {["a", "b", "c"].map((k) => (
              <Skeleton key={k} className="h-28 w-full" />
            ))}
          </div>
        )}

        {!isLoading && orders && orders.length === 0 && (
          <div
            className="text-center py-24 border border-border bg-card"
            data-ocid="no-orders"
          >
            <Package className="size-16 text-muted-foreground mx-auto mb-6 opacity-30" />
            <p className="font-display text-2xl text-foreground mb-2">
              No orders yet
            </p>
            <p className="text-muted-foreground text-sm mb-8">
              Start shopping to place your first order.
            </p>
            <Button asChild data-ocid="start-shopping-btn">
              <a href="/shop">Start Shopping</a>
            </Button>
          </div>
        )}

        {!isLoading && orders && orders.length > 0 && (
          <div className="space-y-3" data-ocid="orders-list">
            {orders.map((order) => {
              const statusKey = order.status.toLowerCase();
              return (
                <div
                  key={order.id.toString()}
                  className="bg-card border border-border hover:border-accent transition-smooth"
                  data-ocid="order-row"
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                          Order Number
                        </p>
                        <p className="font-mono text-sm font-medium text-foreground">
                          #{order.id.toString()}
                        </p>
                      </div>
                      <Badge
                        className={`${STATUS_STYLES[statusKey] ?? "bg-muted text-muted-foreground"} border text-xs uppercase tracking-wider`}
                        data-ocid="order-status-badge"
                      >
                        {STATUS_LABELS[statusKey] ?? order.status}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm border-t border-border pt-4">
                      <div className="flex items-center gap-6 text-muted-foreground">
                        <span>{formatDate(order.createdAt)}</span>
                        <span>
                          {order.items.length} item
                          {order.items.length !== 1 ? "s" : ""}
                        </span>
                        <span className="font-medium text-foreground">
                          {formatCurrency(order.totalAmount)}
                        </span>
                      </div>
                      <a
                        href={`/account/orders/${order.id}`}
                        className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent/80 transition-colors font-medium"
                        data-ocid="view-order-details-link"
                      >
                        View Details
                        <ArrowRight className="size-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
