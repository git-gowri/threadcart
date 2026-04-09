import { a as useParams, b as useInternetIdentity, j as jsxRuntimeExports, S as Skeleton } from "./index-BH8qyL0M.js";
import { c as createLucideIcon, L as Layout, B as Badge, a as Button } from "./Layout-BLXPJbtK.js";
import { S as Separator } from "./separator-HhzUdilm.js";
import { b as useOrder } from "./useOrders-BtTWmPY4.js";
import { P as Package } from "./package-CFX01vBc.js";
import "./useActor-DLK9v9XA.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode);
const STATUS_LABELS = {
  pending: "Pending",
  confirmed: "Confirmed",
  shipped: "Shipped",
  delivered: "Delivered"
};
const STATUS_STYLES = {
  pending: "bg-secondary text-secondary-foreground border-0",
  confirmed: "bg-accent text-accent-foreground border-0",
  shipped: "bg-primary text-primary-foreground border-0",
  delivered: "bg-muted text-muted-foreground border-0"
};
function getEstimatedDelivery() {
  const date = /* @__PURE__ */ new Date();
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
    day: "numeric"
  });
}
function OrderConfirmationPage() {
  const { orderId } = useParams({ from: "/order-confirmation/$orderId" });
  const { data: order, isLoading } = useOrder(BigInt(orderId));
  const { loginStatus } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success";
  const estimatedDelivery = getEstimatedDelivery();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-2xl mx-auto px-4 py-16", children: [
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-pulse", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-16 mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-3/5 mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-2/3 mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mt-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-4/5" })
      ] })
    ] }),
    !isLoading && order && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", "data-ocid": "order-confirmation", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-accent/10 flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-9 text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl text-foreground mb-3 tracking-tight", children: "Order Confirmed!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed max-w-sm mx-auto", children: "Thank you for your order. We've received your purchase and will get started right away." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border p-5 flex items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest mb-1", children: "Order Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-foreground font-semibold", children: [
            "#",
            order.id.toString().padStart(6, "0")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            className: STATUS_STYLES[order.status] ?? "bg-muted text-muted-foreground border-0",
            children: STATUS_LABELS[order.status] ?? order.status
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 border border-border p-5 flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "size-5 text-accent flex-shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm", children: "Estimated Delivery" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-0.5", children: [
            estimatedDelivery,
            " (3–5 business days)"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border p-6 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg text-foreground", children: "Order Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: order.items.map((item, i) => {
          const lineTotal = Number(item.priceAtPurchase) / 100 * Number(item.quantity);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between text-sm gap-3",
              "data-ocid": "order-item",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 bg-muted flex items-center justify-center text-xs font-medium flex-shrink-0", children: item.quantity.toString() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground font-medium truncate", children: [
                      "Item ",
                      i + 1
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs", children: [
                      item.size,
                      " · ",
                      item.color
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground flex-shrink-0", children: [
                  "$",
                  lineTotal.toFixed(2)
                ] })
              ]
            },
            `${item.productId}-${i}`
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-semibold text-base", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total Charged" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "$",
            (Number(order.totalAmount) / 100).toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest mb-3", children: "Shipping To" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm", children: order.shippingAddress.fullName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-0.5 leading-relaxed", children: [
            order.shippingAddress.street,
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            order.shippingAddress.city,
            ", ",
            order.shippingAddress.state,
            " ",
            order.shippingAddress.postalCode,
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            order.shippingAddress.country
          ] }),
          order.guestEmail && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
            "Confirmation sent to:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: order.guestEmail })
          ] })
        ] })
      ] }),
      !isLoggedIn && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-secondary/30 border border-border p-5 flex items-start gap-4",
          "data-ocid": "guest-account-prompt",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "size-5 text-accent flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm", children: "Track future orders with an account" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-1 leading-relaxed", children: "Sign in with Internet Identity to save your addresses, view order history, and get faster checkout next time." })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            className: "flex-1 h-11",
            "data-ocid": "continue-shopping-btn",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/shop", children: "Continue Shopping" })
          }
        ),
        isLoggedIn && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            variant: "outline",
            className: "flex-1 h-11",
            "data-ocid": "view-orders-btn",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/account/orders", children: "View Account Orders" })
          }
        )
      ] })
    ] }),
    !isLoading && !order && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", "data-ocid": "order-not-found", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl text-foreground mb-3", children: "Order not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: "We couldn't find that order. It may still be processing." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/shop", children: "Return to Shop" }) })
    ] })
  ] }) });
}
export {
  OrderConfirmationPage as default
};
