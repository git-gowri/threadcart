import { j as jsxRuntimeExports } from "./index-BH8qyL0M.js";
import { u as useCart, L as Layout, S as ShoppingBag, a as Button } from "./Layout-BLXPJbtK.js";
import { S as Separator } from "./separator-HhzUdilm.js";
import { T as Trash2 } from "./trash-2-Bd-usiTM.js";
import { M as Minus } from "./minus-zbQVrhJc.js";
import { P as Plus } from "./plus-BS7fI2CK.js";
const SHIPPING_THRESHOLD = 50;
const FLAT_SHIPPING = 8.99;
const TAX_RATE = 0.08;
function calcShipping(subtotal) {
  return subtotal >= SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
}
function CartPage() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();
  const shipping = calcShipping(total);
  const tax = total * TAX_RATE;
  const grandTotal = total + shipping + tax;
  if (itemCount === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container max-w-7xl mx-auto px-4 py-32 flex flex-col items-center justify-center text-center",
        "data-ocid": "cart-empty-state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-muted flex items-center justify-center mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "size-10 text-muted-foreground opacity-50" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl text-foreground mb-3 tracking-tight", children: "Your bag is empty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-10 max-w-sm", children: "Looks like you haven't added anything yet. Browse our collections to find something you'll love." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "px-10 h-12 text-base", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/shop", children: "Continue Shopping" }) })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-7xl mx-auto px-4 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl text-foreground tracking-tight", children: [
      "Shopping Bag",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-3 font-body text-base font-normal text-muted-foreground", children: [
        "(",
        itemCount,
        " ",
        itemCount === 1 ? "item" : "items",
        ")"
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-7xl mx-auto px-4 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 space-y-3", "data-ocid": "cart-items", children: items.map((item) => {
        const key = `${item.productId}-${item.size}-${item.color}`;
        const lineTotal = item.price * item.quantity;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex gap-5 bg-card border border-border p-5 transition-smooth hover:border-accent/40",
            "data-ocid": "cart-item",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: `/shop/${item.productId}`,
                  className: "w-24 h-32 sm:w-28 sm:h-36 flex-shrink-0 overflow-hidden bg-muted block",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: item.image,
                      alt: item.name,
                      className: "w-full h-full object-cover"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 flex flex-col", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "a",
                      {
                        href: `/shop/${item.productId}`,
                        className: "font-body font-semibold text-foreground text-sm leading-snug hover:text-accent transition-colors line-clamp-2",
                        children: item.name
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-3 mt-1.5", children: [
                      item.size && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: [
                        "Size:",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: item.size })
                      ] }),
                      item.color && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: [
                        "Color:",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: item.color })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => removeItem(item.productId, item.size, item.color),
                      className: "flex-shrink-0 p-1.5 text-muted-foreground hover:text-destructive transition-colors",
                      "aria-label": "Remove item",
                      "data-ocid": "remove-item-btn",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-auto pt-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border border-border", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => updateQuantity(
                          item.productId,
                          item.size,
                          item.color,
                          item.quantity - 1
                        ),
                        className: "w-9 h-9 flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground",
                        "aria-label": "Decrease quantity",
                        "data-ocid": "qty-decrease",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "size-3" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "w-10 h-9 flex items-center justify-center text-sm font-medium border-x border-border",
                        "aria-live": "polite",
                        children: item.quantity
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => updateQuantity(
                          item.productId,
                          item.size,
                          item.color,
                          item.quantity + 1
                        ),
                        className: "w-9 h-9 flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground",
                        "aria-label": "Increase quantity",
                        "data-ocid": "qty-increase",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-3" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground", children: [
                      "$",
                      lineTotal.toFixed(2)
                    ] }),
                    item.quantity > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      "$",
                      item.price.toFixed(2),
                      " each"
                    ] })
                  ] })
                ] })
              ] })
            ]
          },
          key
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border p-6 sticky top-24",
          "data-ocid": "cart-summary",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl text-foreground mb-5", children: "Order Summary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                  "Subtotal (",
                  itemCount,
                  " ",
                  itemCount === 1 ? "item" : "items",
                  ")"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                  "$",
                  total.toFixed(2)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Shipping" }),
                shipping === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent font-medium", children: "Free" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                  "$",
                  shipping.toFixed(2)
                ] })
              ] }),
              shipping > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground bg-muted/60 px-3 py-2 leading-relaxed", children: [
                "Add $",
                (SHIPPING_THRESHOLD - total).toFixed(2),
                " more for free shipping"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Estimated Tax (8%)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                  "$",
                  tax.toFixed(2)
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-semibold text-base mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Estimated Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "$",
                grandTotal.toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                className: "w-full h-12 text-base font-semibold",
                "data-ocid": "checkout-btn",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/checkout", children: "Proceed to Checkout" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                variant: "outline",
                className: "w-full mt-3 h-10",
                "data-ocid": "continue-shopping-btn",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/shop", children: "Continue Shopping" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center mt-4 leading-relaxed", children: "Taxes and final shipping are confirmed at checkout." })
          ]
        }
      ) })
    ] }) })
  ] });
}
export {
  CartPage as default
};
