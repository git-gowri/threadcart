import { a as useParams, b as useInternetIdentity, j as jsxRuntimeExports, S as Skeleton } from "./index-BH8qyL0M.js";
import { L as Layout, B as Badge, S as ShoppingBag, a as Button } from "./Layout-BLXPJbtK.js";
import { S as Separator } from "./separator-HhzUdilm.js";
import { b as useOrder } from "./useOrders-BtTWmPY4.js";
import { A as ArrowLeft } from "./arrow-left-C-epcK1T.js";
import { M as MapPin } from "./map-pin-BsCuxXAB.js";
import { P as Package } from "./package-CFX01vBc.js";
import "./useActor-DLK9v9XA.js";
const STATUS_STYLES = {
  pending: "bg-secondary text-secondary-foreground border-secondary",
  confirmed: "bg-accent/15 text-accent border-accent/30",
  shipped: "bg-primary/10 text-primary border-primary/20",
  delivered: "bg-muted text-muted-foreground border-border"
};
const STATUS_LABELS = {
  pending: "Pending",
  confirmed: "Confirmed",
  shipped: "Shipped",
  delivered: "Delivered"
};
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function formatCurrency(cents) {
  return `$${(Number(cents) / 100).toFixed(2)}`;
}
function AccountOrderDetailPage() {
  const { orderId } = useParams({ from: "/account/orders/$orderId" });
  const { loginStatus } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success";
  const { data: order, isLoading } = useOrder(
    isLoggedIn ? BigInt(orderId) : void 0
  );
  const itemSubtotal = order ? order.items.reduce(
    (acc, item) => acc + Number(item.priceAtPurchase) * Number(item.quantity),
    0
  ) : 0;
  const shipping = order ? Math.max(0, Number(order.totalAmount) - itemSubtotal) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-2xl mx-auto px-4 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "/account",
            className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
            children: "Account"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "/account/orders",
            className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
            children: "Orders"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-foreground truncate max-w-24", children: [
          "#",
          orderId
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: "/account/orders",
          className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
          "data-ocid": "back-to-orders-link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4" }),
            "Back to Orders"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-2xl mx-auto px-4 py-8", children: [
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full" })
      ] }),
      !isLoading && order && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "order-detail", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border p-6 flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-1", children: "Order Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-lg font-medium text-foreground", children: [
              "#",
              order.id.toString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
              "Placed on ",
              formatDate(order.createdAt)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: `${STATUS_STYLES[order.status.toLowerCase()] ?? "bg-muted text-muted-foreground"} border text-xs uppercase tracking-wider flex-shrink-0`,
              "data-ocid": "order-status-badge",
              children: STATUS_LABELS[order.status.toLowerCase()] ?? order.status
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border",
            "data-ocid": "order-items",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 pb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "size-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base text-foreground uppercase tracking-wider text-sm", children: "Items Ordered" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-4", children: order.items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-start justify-between gap-4",
                  "data-ocid": "order-item",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground", children: [
                        "Item ",
                        i + 1
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1 flex-wrap", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground bg-muted px-2 py-0.5", children: item.size }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground bg-muted px-2 py-0.5", children: item.color }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                          "Qty: ",
                          item.quantity.toString()
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: formatCurrency(
                        Number(item.priceAtPurchase) * Number(item.quantity)
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                        formatCurrency(item.priceAtPurchase),
                        " each"
                      ] })
                    ] })
                  ]
                },
                `${item.productId}-${i}`
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border",
            "data-ocid": "order-shipping",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 pb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base text-foreground uppercase tracking-wider text-sm", children: "Shipping Address" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: order.shippingAddress.fullName }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1 leading-relaxed", children: [
                  order.shippingAddress.street,
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  order.shippingAddress.city,
                  ", ",
                  order.shippingAddress.state,
                  " ",
                  order.shippingAddress.postalCode,
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  order.shippingAddress.country
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border",
            "data-ocid": "order-totals",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 pb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "size-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base text-foreground uppercase tracking-wider text-sm", children: "Order Summary" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: formatCurrency(itemSubtotal) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Shipping" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: shipping === 0 ? "Free" : formatCurrency(shipping) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-semibold", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Total" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-display text-lg", children: formatCurrency(order.totalAmount) })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "outline",
              className: "flex-1",
              "data-ocid": "back-to-orders-btn",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/account/orders", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4" }),
                "All Orders"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              className: "flex-1",
              "data-ocid": "continue-shopping-btn",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/shop", children: "Continue Shopping" })
            }
          )
        ] })
      ] }),
      !isLoading && !order && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-16 border border-border bg-card",
          "data-ocid": "order-not-found",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "size-16 text-muted-foreground mx-auto mb-6 opacity-30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl text-foreground mb-2", children: "Order not found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-8", children: "This order may not exist or belong to your account." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", "data-ocid": "back-btn", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/account/orders", children: "Back to Orders" }) })
          ]
        }
      )
    ] })
  ] });
}
export {
  AccountOrderDetailPage as default
};
