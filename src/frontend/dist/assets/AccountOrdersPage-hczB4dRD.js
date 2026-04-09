import { b as useInternetIdentity, j as jsxRuntimeExports, S as Skeleton } from "./index-BH8qyL0M.js";
import { c as createLucideIcon, L as Layout, d as LogIn, a as Button, B as Badge } from "./Layout-BLXPJbtK.js";
import { c as useMyOrders } from "./useOrders-BtTWmPY4.js";
import { P as Package } from "./package-CFX01vBc.js";
import "./useActor-DLK9v9XA.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode);
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
    month: "short",
    day: "numeric"
  });
}
function formatCurrency(cents) {
  return `$${(Number(cents) / 100).toFixed(2)}`;
}
function AccountOrdersPage() {
  const { login, loginStatus } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success";
  const { data: orders, isLoading } = useMyOrders();
  if (!isLoggedIn) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "container max-w-md mx-auto px-4 py-24 text-center",
        "data-ocid": "orders-login-prompt",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border bg-card p-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "size-16 text-muted-foreground mx-auto mb-6 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl text-foreground mb-3", children: "Order History" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-8", children: "Sign in to view your order history and track shipments." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => login(),
              className: "w-full",
              "data-ocid": "orders-login-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "size-4" }),
                "Sign In with Internet Identity"
              ]
            }
          )
        ] })
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-3xl mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "/account",
            className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
            children: "Account"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: "Orders" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl text-foreground", children: "Order History" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container max-w-3xl mx-auto px-4 py-8",
        "data-ocid": "orders-page",
        children: [
          isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full" }, k)) }),
          !isLoading && orders && orders.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-24 border border-border bg-card",
              "data-ocid": "no-orders",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "size-16 text-muted-foreground mx-auto mb-6 opacity-30" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl text-foreground mb-2", children: "No orders yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-8", children: "Start shopping to place your first order." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, "data-ocid": "start-shopping-btn", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/shop", children: "Start Shopping" }) })
              ]
            }
          ),
          !isLoading && orders && orders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "orders-list", children: orders.map((order) => {
            const statusKey = order.status.toLowerCase();
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "bg-card border border-border hover:border-accent transition-smooth",
                "data-ocid": "order-row",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-1", children: "Order Number" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-sm font-medium text-foreground", children: [
                        "#",
                        order.id.toString()
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        className: `${STATUS_STYLES[statusKey] ?? "bg-muted text-muted-foreground"} border text-xs uppercase tracking-wider`,
                        "data-ocid": "order-status-badge",
                        children: STATUS_LABELS[statusKey] ?? order.status
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm border-t border-border pt-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(order.createdAt) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        order.items.length,
                        " item",
                        order.items.length !== 1 ? "s" : ""
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: formatCurrency(order.totalAmount) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "a",
                      {
                        href: `/account/orders/${order.id}`,
                        className: "inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent/80 transition-colors font-medium",
                        "data-ocid": "view-order-details-link",
                        children: [
                          "View Details",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-3.5" })
                        ]
                      }
                    )
                  ] })
                ] })
              },
              order.id.toString()
            );
          }) })
        ]
      }
    )
  ] });
}
export {
  AccountOrdersPage as default
};
