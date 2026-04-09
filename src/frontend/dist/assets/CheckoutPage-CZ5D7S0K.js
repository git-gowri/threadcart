import { b as useInternetIdentity, r as reactExports, j as jsxRuntimeExports, u as ue } from "./index-BH8qyL0M.js";
import { c as createLucideIcon, u as useCart, L as Layout, a as Button, I as Input, B as Badge } from "./Layout-BLXPJbtK.js";
import { L as Label } from "./label-B_YclXCM.js";
import { S as Separator } from "./separator-HhzUdilm.js";
import { u as useSavedAddresses } from "./useAccount-IA1GIg_i.js";
import { u as useCreateOrder, a as useCreateCheckoutSession } from "./useOrders-BtTWmPY4.js";
import { C as ChevronDown } from "./chevron-down-VGfPPhzO.js";
import "./useActor-DLK9v9XA.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
const ChevronUp = createLucideIcon("chevron-up", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i"
    }
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
];
const Truck = createLucideIcon("truck", __iconNode);
const SHIPPING_THRESHOLD = 50;
const TAX_RATE = 0.08;
const SHIPPING_OPTIONS = [
  {
    id: "standard",
    label: "Standard Shipping",
    description: "3–5 business days",
    price: (subtotal) => subtotal >= SHIPPING_THRESHOLD ? 0 : 8.99,
    priceLabel: (subtotal) => subtotal >= SHIPPING_THRESHOLD ? "Free" : "$8.99",
    icon: Truck
  },
  {
    id: "express",
    label: "Express Shipping",
    description: "1–2 business days",
    price: () => 19.99,
    priceLabel: () => "$19.99",
    icon: Clock
  }
];
const INITIAL_FORM = {
  fullName: "",
  street: "",
  city: "",
  state: "",
  postalCode: "",
  country: "US",
  email: ""
};
function validateForm(form, isLoggedIn) {
  var _a;
  const errors = {};
  if (!isLoggedIn && !((_a = form.email) == null ? void 0 : _a.trim()))
    errors.email = "Email is required for guest checkout";
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Please enter a valid email address";
  if (!form.fullName.trim()) errors.fullName = "Full name is required";
  if (!form.street.trim()) errors.street = "Street address is required";
  if (!form.city.trim()) errors.city = "City is required";
  if (!form.state.trim()) errors.state = "State is required";
  if (!form.postalCode.trim()) errors.postalCode = "Postal code is required";
  if (!form.country.trim()) errors.country = "Country is required";
  return errors;
}
function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { loginStatus } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success";
  const { data: savedAddresses } = useSavedAddresses();
  const createOrder = useCreateOrder();
  const createCheckout = useCreateCheckoutSession();
  const [form, setForm] = reactExports.useState(INITIAL_FORM);
  const [errors, setErrors] = reactExports.useState({});
  const [shippingMethod, setShippingMethod] = reactExports.useState("standard");
  const [summaryOpen, setSummaryOpen] = reactExports.useState(false);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const selectedShipping = SHIPPING_OPTIONS.find(
    (o) => o.id === shippingMethod
  );
  const shippingCost = selectedShipping.price(total);
  const tax = total * TAX_RATE;
  const grandTotal = total + shippingCost + tax;
  const handleFieldChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: void 0 }));
  };
  const handleSelectAddress = (idx) => {
    const addr = savedAddresses == null ? void 0 : savedAddresses[idx];
    if (addr) {
      setForm((f) => ({
        ...f,
        fullName: addr.fullName,
        street: addr.street,
        city: addr.city,
        state: addr.state,
        postalCode: addr.postalCode,
        country: addr.country
      }));
      setErrors({});
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      ue.error("Your cart is empty");
      return;
    }
    const fieldErrors = validateForm(form, isLoggedIn);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      const firstEl = document.querySelector("[data-field-error]");
      firstEl == null ? void 0 : firstEl.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
      return;
    }
    setIsSubmitting(true);
    const orderInput = {
      guestEmail: !isLoggedIn ? form.email : void 0,
      shippingAddress: {
        fullName: form.fullName,
        street: form.street,
        city: form.city,
        state: form.state,
        postalCode: form.postalCode,
        country: form.country
      },
      items: items.map((item) => ({
        productId: BigInt(item.productId),
        size: item.size,
        color: item.color,
        quantity: BigInt(item.quantity),
        priceAtPurchase: BigInt(Math.round(item.price * 100))
      }))
    };
    try {
      const order = await createOrder.mutateAsync(orderInput);
      const successUrl = `${window.location.origin}/order-confirmation/${order.id}`;
      const cancelUrl = `${window.location.origin}/checkout`;
      const shoppingItems = items.map((item) => ({
        productName: item.name,
        productDescription: `${item.name} — Size: ${item.size}, Color: ${item.color}`,
        currency: "usd",
        quantity: BigInt(item.quantity),
        priceInCents: BigInt(Math.round(item.price * 100))
      }));
      const sessionUrl = await createCheckout.mutateAsync({
        items: shoppingItems,
        successUrl,
        cancelUrl
      });
      clearCart();
      window.location.href = sessionUrl;
    } catch {
      ue.error("Failed to create order. Please try again.");
      setIsSubmitting(false);
    }
  };
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-4xl mx-auto px-4 py-32 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl mb-4", children: "Your bag is empty" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/shop", children: "Continue Shopping" }) })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-7xl mx-auto px-4 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl text-foreground tracking-tight", children: "Checkout" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-7xl mx-auto px-4 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "lg:hidden mb-6 bg-card border border-border",
          "data-ocid": "checkout-summary-mobile",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setSummaryOpen((v) => !v),
                className: "w-full flex items-center justify-between p-4 text-sm font-medium",
                "data-ocid": "summary-toggle",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                    summaryOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "size-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "size-4" }),
                    summaryOpen ? "Hide" : "Show",
                    " order summary"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
                    "$",
                    grandTotal.toFixed(2)
                  ] })
                ]
              }
            ),
            summaryOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border p-4 space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              OrderSummaryContent,
              {
                items,
                total,
                shippingCost,
                shippingLabel: selectedShipping.priceLabel(total),
                tax,
                grandTotal
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-5 gap-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: handleSubmit,
            className: "lg:col-span-3 space-y-8",
            noValidate: true,
            "data-ocid": "checkout-form",
            children: [
              isLoggedIn && savedAddresses && savedAddresses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl text-foreground mb-4", children: "Saved Addresses" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: savedAddresses.map((addr, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleSelectAddress(i),
                    className: "w-full text-left p-4 border border-border hover:border-accent bg-background transition-smooth text-sm",
                    "data-ocid": "saved-address-btn",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: addr.fullName }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-0.5", children: [
                        addr.street,
                        ", ",
                        addr.city,
                        ", ",
                        addr.state,
                        " ",
                        addr.postalCode,
                        ", ",
                        addr.country
                      ] })
                    ]
                  },
                  `${addr.street}-${i}`
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl text-foreground mb-5", children: "Shipping Information" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                  !isLoggedIn && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "email", children: [
                      "Email Address",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", "aria-hidden": true, children: "*" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "email",
                        type: "email",
                        placeholder: "your@email.com",
                        value: form.email,
                        onChange: (e) => handleFieldChange("email", e.target.value),
                        "aria-describedby": errors.email ? "email-err" : void 0,
                        "aria-invalid": !!errors.email,
                        "data-ocid": "checkout-email"
                      }
                    ),
                    errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        id: "email-err",
                        className: "text-destructive text-xs mt-1",
                        "data-field-error": true,
                        children: errors.email
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "fullName", children: [
                      "Full Name",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", "aria-hidden": true, children: "*" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "fullName",
                        placeholder: "Jane Doe",
                        value: form.fullName,
                        onChange: (e) => handleFieldChange("fullName", e.target.value),
                        "aria-describedby": errors.fullName ? "name-err" : void 0,
                        "aria-invalid": !!errors.fullName,
                        "data-ocid": "checkout-name"
                      }
                    ),
                    errors.fullName && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        id: "name-err",
                        className: "text-destructive text-xs",
                        "data-field-error": true,
                        children: errors.fullName
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "street", children: [
                      "Street Address",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", "aria-hidden": true, children: "*" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "street",
                        placeholder: "123 Main St, Apt 4B",
                        value: form.street,
                        onChange: (e) => handleFieldChange("street", e.target.value),
                        "aria-describedby": errors.street ? "street-err" : void 0,
                        "aria-invalid": !!errors.street,
                        "data-ocid": "checkout-street"
                      }
                    ),
                    errors.street && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        id: "street-err",
                        className: "text-destructive text-xs",
                        "data-field-error": true,
                        children: errors.street
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "city", children: [
                        "City",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", "aria-hidden": true, children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "city",
                          placeholder: "New York",
                          value: form.city,
                          onChange: (e) => handleFieldChange("city", e.target.value),
                          "aria-invalid": !!errors.city,
                          "data-ocid": "checkout-city"
                        }
                      ),
                      errors.city && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-xs", "data-field-error": true, children: errors.city })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "state", children: [
                        "State",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", "aria-hidden": true, children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "state",
                          placeholder: "NY",
                          value: form.state,
                          onChange: (e) => handleFieldChange("state", e.target.value),
                          "aria-invalid": !!errors.state,
                          "data-ocid": "checkout-state"
                        }
                      ),
                      errors.state && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-xs", "data-field-error": true, children: errors.state })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "postalCode", children: [
                        "Postal Code",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", "aria-hidden": true, children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "postalCode",
                          placeholder: "10001",
                          value: form.postalCode,
                          onChange: (e) => handleFieldChange("postalCode", e.target.value),
                          "aria-invalid": !!errors.postalCode,
                          "data-ocid": "checkout-postal"
                        }
                      ),
                      errors.postalCode && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-xs", "data-field-error": true, children: errors.postalCode })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "country", children: [
                        "Country",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", "aria-hidden": true, children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "country",
                          placeholder: "US",
                          value: form.country,
                          onChange: (e) => handleFieldChange("country", e.target.value),
                          "aria-invalid": !!errors.country,
                          "data-ocid": "checkout-country"
                        }
                      ),
                      errors.country && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-xs", "data-field-error": true, children: errors.country })
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl text-foreground mb-5", children: "Shipping Method" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "shipping-method", children: [
                  SHIPPING_OPTIONS.map((option) => {
                    const Icon = option.icon;
                    const selected = shippingMethod === option.id;
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "label",
                      {
                        className: `flex items-center gap-4 p-4 border cursor-pointer transition-smooth ${selected ? "border-accent bg-accent/5" : "border-border bg-background hover:border-accent/50"}`,
                        "data-ocid": `shipping-${option.id}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              type: "radio",
                              name: "shippingMethod",
                              value: option.id,
                              checked: selected,
                              onChange: () => setShippingMethod(option.id),
                              className: "sr-only"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: `w-4 h-4 border-2 flex-shrink-0 flex items-center justify-center ${selected ? "border-accent" : "border-border"}`,
                              children: selected && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-accent" })
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Icon,
                            {
                              className: `size-5 flex-shrink-0 ${selected ? "text-accent" : "text-muted-foreground"}`
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground", children: option.label }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: option.description })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Badge,
                            {
                              className: selected ? "bg-accent text-accent-foreground border-0" : "bg-secondary text-secondary-foreground border-0",
                              children: option.priceLabel(total)
                            }
                          )
                        ]
                      },
                      option.id
                    );
                  }),
                  shippingMethod === "standard" && total < SHIPPING_THRESHOLD && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground bg-muted/60 px-3 py-2", children: [
                    "Add $",
                    (SHIPPING_THRESHOLD - total).toFixed(2),
                    " more to your order for free standard shipping."
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  className: "w-full h-13 text-base font-semibold",
                  disabled: isSubmitting,
                  "data-ocid": "place-order-btn",
                  children: isSubmitting ? "Redirecting to payment…" : `Place Order — $${grandTotal.toFixed(2)}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "You'll be redirected to Stripe's secure checkout to complete payment." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border p-6 sticky top-24",
            "data-ocid": "checkout-summary",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl text-foreground mb-5", children: "Order Summary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                OrderSummaryContent,
                {
                  items,
                  total,
                  shippingCost,
                  shippingLabel: selectedShipping.priceLabel(total),
                  tax,
                  grandTotal
                }
              )
            ]
          }
        ) })
      ] })
    ] })
  ] });
}
function OrderSummaryContent({
  items,
  total,
  shippingCost,
  shippingLabel,
  tax,
  grandTotal
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-h-64 overflow-y-auto pr-1", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex gap-3 text-sm",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-14 h-18 flex-shrink-0 overflow-hidden bg-muted relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: item.image,
                alt: item.name,
                className: "w-full h-full object-cover"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1.5 -right-1.5 w-5 h-5 bg-foreground text-background text-xs flex items-center justify-center font-medium", children: item.quantity })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate", children: item.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs mt-0.5", children: [
              item.size,
              " · ",
              item.color
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-accent text-sm font-medium mt-0.5", children: [
              "$",
              (item.price * item.quantity).toFixed(2)
            ] })
          ] })
        ]
      },
      `${item.productId}-${item.size}-${item.color}`
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "$",
          total.toFixed(2)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Shipping" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: shippingCost === 0 ? "text-accent font-medium" : "", children: shippingLabel })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Tax (8%)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "$",
          tax.toFixed(2)
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-semibold text-base", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "$",
        grandTotal.toFixed(2)
      ] })
    ] })
  ] });
}
export {
  CheckoutPage as default
};
