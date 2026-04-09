import { b as useInternetIdentity, r as reactExports, j as jsxRuntimeExports, S as Skeleton, u as ue } from "./index-BH8qyL0M.js";
import { L as Layout, U as User, a as Button, d as LogIn, B as Badge, I as Input } from "./Layout-BLXPJbtK.js";
import { L as Label } from "./label-B_YclXCM.js";
import { S as Separator } from "./separator-HhzUdilm.js";
import { u as useSavedAddresses, a as useRemoveAddress, b as useSaveAddress } from "./useAccount-IA1GIg_i.js";
import { P as Package } from "./package-CFX01vBc.js";
import { M as MapPin } from "./map-pin-BsCuxXAB.js";
import { P as Plus } from "./plus-BS7fI2CK.js";
import { T as Trash2 } from "./trash-2-Bd-usiTM.js";
import "./useActor-DLK9v9XA.js";
const EMPTY_FORM = {
  fullName: "",
  street: "",
  city: "",
  state: "",
  postalCode: "",
  country: ""
};
function truncatePrincipal(principal) {
  if (principal.length <= 16) return principal;
  return `${principal.slice(0, 8)}…${principal.slice(-8)}`;
}
function AccountPage() {
  const { login, loginStatus, identity } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success";
  const { data: addresses, isLoading } = useSavedAddresses();
  const removeAddress = useRemoveAddress();
  const saveAddress = useSaveAddress();
  const [showAddForm, setShowAddForm] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [saving, setSaving] = reactExports.useState(false);
  const principal = (identity == null ? void 0 : identity.getPrincipal().toText()) ?? "";
  const handleRemoveAddress = async (index) => {
    try {
      await removeAddress.mutateAsync(BigInt(index));
      ue.success("Address removed");
    } catch {
      ue.error("Failed to remove address");
    }
  };
  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.street || !form.city || !form.state || !form.postalCode || !form.country) {
      ue.error("Please fill in all fields");
      return;
    }
    setSaving(true);
    try {
      await saveAddress.mutateAsync(form);
      ue.success("Address saved");
      setForm(EMPTY_FORM);
      setShowAddForm(false);
    } catch {
      ue.error("Failed to save address");
    } finally {
      setSaving(false);
    }
  };
  if (!isLoggedIn) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "container max-w-md mx-auto px-4 py-24 text-center",
        "data-ocid": "account-login-prompt",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border bg-card p-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "size-16 text-muted-foreground mx-auto mb-6 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl text-foreground mb-3", children: "My Account" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-8 leading-relaxed", children: "Sign in to view your orders, saved addresses, and account details." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => login(),
              className: "w-full",
              "data-ocid": "account-login-btn",
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-3xl mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 bg-primary flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "size-5 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl text-foreground leading-none", children: "My Account" }),
        principal && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "outline",
            className: "mt-1.5 font-mono text-xs text-muted-foreground border-border",
            "data-ocid": "principal-badge",
            children: truncatePrincipal(principal)
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container max-w-3xl mx-auto px-4 py-8 space-y-6",
        "data-ocid": "account-page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "/account/orders",
                className: "group bg-card border border-border p-6 hover:border-accent transition-smooth flex items-center gap-4",
                "data-ocid": "nav-card-orders",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-12 bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "size-6 text-muted-foreground group-hover:text-accent transition-smooth" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg text-foreground", children: "Order History" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Track and view past orders" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "/shop",
                className: "group bg-card border border-border p-6 hover:border-accent transition-smooth flex items-center gap-4",
                "data-ocid": "nav-card-shop",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-12 bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-6 text-muted-foreground group-hover:text-accent transition-smooth" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg text-foreground", children: "Browse Shop" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Explore our collections" })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border",
              "data-ocid": "saved-addresses-section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-5" }),
                    "Saved Addresses"
                  ] }),
                  !showAddForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      onClick: () => setShowAddForm(true),
                      "data-ocid": "add-address-btn",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4" }),
                        "Add New"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-4", children: [
                  isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" })
                  ] }),
                  !isLoading && addresses && addresses.length === 0 && !showAddForm && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-sm text-muted-foreground py-2",
                      "data-ocid": "no-addresses",
                      children: "No saved addresses yet. Add one below or addresses will be saved automatically at checkout."
                    }
                  ),
                  !isLoading && addresses && addresses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "addresses-list", children: addresses.map((addr, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-start justify-between p-4 border border-border bg-background",
                      "data-ocid": "address-item",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground", children: addr.fullName }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1 leading-relaxed", children: [
                            addr.street,
                            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                            addr.city,
                            ", ",
                            addr.state,
                            " ",
                            addr.postalCode,
                            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                            addr.country
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => handleRemoveAddress(i),
                            disabled: removeAddress.isPending,
                            className: "text-muted-foreground hover:text-destructive transition-colors p-2 disabled:opacity-50 flex-shrink-0",
                            "aria-label": "Remove address",
                            "data-ocid": "remove-address-btn",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" })
                          }
                        )
                      ]
                    },
                    `${addr.street}-${i}`
                  )) }),
                  showAddForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "form",
                    {
                      onSubmit: handleAddAddress,
                      className: "border border-border bg-background p-5 space-y-4",
                      "data-ocid": "add-address-form",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-base text-foreground", children: "New Address" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Label,
                              {
                                htmlFor: "addr-fullname",
                                className: "text-xs uppercase tracking-wider text-muted-foreground",
                                children: "Full Name"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Input,
                              {
                                id: "addr-fullname",
                                value: form.fullName,
                                onChange: (e) => setForm((f) => ({ ...f, fullName: e.target.value })),
                                placeholder: "Jane Smith",
                                className: "mt-1",
                                "data-ocid": "addr-fullname"
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Label,
                              {
                                htmlFor: "addr-street",
                                className: "text-xs uppercase tracking-wider text-muted-foreground",
                                children: "Street Address"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Input,
                              {
                                id: "addr-street",
                                value: form.street,
                                onChange: (e) => setForm((f) => ({ ...f, street: e.target.value })),
                                placeholder: "123 Main Street",
                                className: "mt-1",
                                "data-ocid": "addr-street"
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Label,
                                {
                                  htmlFor: "addr-city",
                                  className: "text-xs uppercase tracking-wider text-muted-foreground",
                                  children: "City"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Input,
                                {
                                  id: "addr-city",
                                  value: form.city,
                                  onChange: (e) => setForm((f) => ({ ...f, city: e.target.value })),
                                  placeholder: "New York",
                                  className: "mt-1",
                                  "data-ocid": "addr-city"
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Label,
                                {
                                  htmlFor: "addr-state",
                                  className: "text-xs uppercase tracking-wider text-muted-foreground",
                                  children: "State"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Input,
                                {
                                  id: "addr-state",
                                  value: form.state,
                                  onChange: (e) => setForm((f) => ({ ...f, state: e.target.value })),
                                  placeholder: "NY",
                                  className: "mt-1",
                                  "data-ocid": "addr-state"
                                }
                              )
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Label,
                                {
                                  htmlFor: "addr-zip",
                                  className: "text-xs uppercase tracking-wider text-muted-foreground",
                                  children: "ZIP / Postal Code"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Input,
                                {
                                  id: "addr-zip",
                                  value: form.postalCode,
                                  onChange: (e) => setForm((f) => ({ ...f, postalCode: e.target.value })),
                                  placeholder: "10001",
                                  className: "mt-1",
                                  "data-ocid": "addr-zip"
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Label,
                                {
                                  htmlFor: "addr-country",
                                  className: "text-xs uppercase tracking-wider text-muted-foreground",
                                  children: "Country"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Input,
                                {
                                  id: "addr-country",
                                  value: form.country,
                                  onChange: (e) => setForm((f) => ({ ...f, country: e.target.value })),
                                  placeholder: "United States",
                                  className: "mt-1",
                                  "data-ocid": "addr-country"
                                }
                              )
                            ] })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Button,
                            {
                              type: "submit",
                              disabled: saving,
                              className: "flex-1",
                              "data-ocid": "save-address-btn",
                              children: saving ? "Saving…" : "Save Address"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Button,
                            {
                              type: "button",
                              variant: "outline",
                              onClick: () => {
                                setShowAddForm(false);
                                setForm(EMPTY_FORM);
                              },
                              className: "flex-1",
                              "data-ocid": "cancel-address-btn",
                              children: "Cancel"
                            }
                          )
                        ] })
                      ]
                    }
                  )
                ] })
              ]
            }
          )
        ]
      }
    )
  ] });
}
export {
  AccountPage as default
};
