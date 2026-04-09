import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { ChevronDown, ChevronUp, Clock, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { OrderInput, ShoppingItem } from "../backend";
import { Layout } from "../components/Layout";
import { useSavedAddresses } from "../hooks/useAccount";
import { useCart } from "../hooks/useCart";
import { useCreateCheckoutSession, useCreateOrder } from "../hooks/useOrders";
import type { CheckoutFormData } from "../types";

const SHIPPING_THRESHOLD = 50;
const TAX_RATE = 0.08;

type ShippingMethod = "standard" | "express";

const SHIPPING_OPTIONS: {
  id: ShippingMethod;
  label: string;
  description: string;
  price: (subtotal: number) => number;
  priceLabel: (subtotal: number) => string;
  icon: React.ElementType;
}[] = [
  {
    id: "standard",
    label: "Standard Shipping",
    description: "3–5 business days",
    price: (subtotal) => (subtotal >= SHIPPING_THRESHOLD ? 0 : 8.99),
    priceLabel: (subtotal) =>
      subtotal >= SHIPPING_THRESHOLD ? "Free" : "$8.99",
    icon: Truck,
  },
  {
    id: "express",
    label: "Express Shipping",
    description: "1–2 business days",
    price: () => 19.99,
    priceLabel: () => "$19.99",
    icon: Clock,
  },
];

const INITIAL_FORM: CheckoutFormData = {
  fullName: "",
  street: "",
  city: "",
  state: "",
  postalCode: "",
  country: "US",
  email: "",
};

interface FieldError {
  fullName?: string;
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  email?: string;
}

function validateForm(form: CheckoutFormData, isLoggedIn: boolean): FieldError {
  const errors: FieldError = {};
  if (!isLoggedIn && !form.email?.trim())
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

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { loginStatus } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success";
  const { data: savedAddresses } = useSavedAddresses();
  const createOrder = useCreateOrder();
  const createCheckout = useCreateCheckoutSession();

  const [form, setForm] = useState<CheckoutFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FieldError>({});
  const [shippingMethod, setShippingMethod] =
    useState<ShippingMethod>("standard");
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedShipping = SHIPPING_OPTIONS.find(
    (o) => o.id === shippingMethod,
  )!;
  const shippingCost = selectedShipping.price(total);
  const tax = total * TAX_RATE;
  const grandTotal = total + shippingCost + tax;

  const handleFieldChange = (field: keyof CheckoutFormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSelectAddress = (idx: number) => {
    const addr = savedAddresses?.[idx];
    if (addr) {
      setForm((f) => ({
        ...f,
        fullName: addr.fullName,
        street: addr.street,
        city: addr.city,
        state: addr.state,
        postalCode: addr.postalCode,
        country: addr.country,
      }));
      setErrors({});
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const fieldErrors = validateForm(form, isLoggedIn);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      const firstEl = document.querySelector("[data-field-error]");
      (firstEl as HTMLElement | null)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    setIsSubmitting(true);

    const orderInput: OrderInput = {
      guestEmail: !isLoggedIn ? form.email : undefined,
      shippingAddress: {
        fullName: form.fullName,
        street: form.street,
        city: form.city,
        state: form.state,
        postalCode: form.postalCode,
        country: form.country,
      },
      items: items.map((item) => ({
        productId: BigInt(item.productId),
        size: item.size,
        color: item.color,
        quantity: BigInt(item.quantity),
        priceAtPurchase: BigInt(Math.round(item.price * 100)),
      })),
    };

    try {
      const order = await createOrder.mutateAsync(orderInput);
      const successUrl = `${window.location.origin}/order-confirmation/${order.id}`;
      const cancelUrl = `${window.location.origin}/checkout`;
      const shoppingItems: ShoppingItem[] = items.map((item) => ({
        productName: item.name,
        productDescription: `${item.name} — Size: ${item.size}, Color: ${item.color}`,
        currency: "usd",
        quantity: BigInt(item.quantity),
        priceInCents: BigInt(Math.round(item.price * 100)),
      }));
      const sessionUrl = await createCheckout.mutateAsync({
        items: shoppingItems,
        successUrl,
        cancelUrl,
      });
      clearCart();
      window.location.href = sessionUrl;
    } catch {
      toast.error("Failed to create order. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container max-w-4xl mx-auto px-4 py-32 text-center">
          <p className="font-display text-3xl mb-4">Your bag is empty</p>
          <Button asChild size="lg">
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
            Checkout
          </h1>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-10">
        {/* Mobile collapsible summary */}
        <div
          className="lg:hidden mb-6 bg-card border border-border"
          data-ocid="checkout-summary-mobile"
        >
          <button
            type="button"
            onClick={() => setSummaryOpen((v) => !v)}
            className="w-full flex items-center justify-between p-4 text-sm font-medium"
            data-ocid="summary-toggle"
          >
            <span className="flex items-center gap-2">
              {summaryOpen ? (
                <ChevronUp className="size-4" />
              ) : (
                <ChevronDown className="size-4" />
              )}
              {summaryOpen ? "Hide" : "Show"} order summary
            </span>
            <span className="font-semibold">${grandTotal.toFixed(2)}</span>
          </button>
          {summaryOpen && (
            <div className="border-t border-border p-4 space-y-4">
              <OrderSummaryContent
                items={items}
                total={total}
                shippingCost={shippingCost}
                shippingLabel={selectedShipping.priceLabel(total)}
                tax={tax}
                grandTotal={grandTotal}
              />
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 space-y-8"
            noValidate
            data-ocid="checkout-form"
          >
            {/* Saved addresses */}
            {isLoggedIn && savedAddresses && savedAddresses.length > 0 && (
              <section>
                <h2 className="font-display text-xl text-foreground mb-4">
                  Saved Addresses
                </h2>
                <div className="space-y-2">
                  {savedAddresses.map((addr, i) => (
                    <button
                      key={`${addr.street}-${i}`}
                      type="button"
                      onClick={() => handleSelectAddress(i)}
                      className="w-full text-left p-4 border border-border hover:border-accent bg-background transition-smooth text-sm"
                      data-ocid="saved-address-btn"
                    >
                      <p className="font-semibold text-foreground">
                        {addr.fullName}
                      </p>
                      <p className="text-muted-foreground mt-0.5">
                        {addr.street}, {addr.city}, {addr.state}{" "}
                        {addr.postalCode}, {addr.country}
                      </p>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Shipping information */}
            <section>
              <h2 className="font-display text-xl text-foreground mb-5">
                Shipping Information
              </h2>
              <div className="space-y-4">
                {!isLoggedIn && (
                  <div className="space-y-1.5">
                    <Label htmlFor="email">
                      Email Address{" "}
                      <span className="text-destructive" aria-hidden>
                        *
                      </span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) =>
                        handleFieldChange("email", e.target.value)
                      }
                      aria-describedby={errors.email ? "email-err" : undefined}
                      aria-invalid={!!errors.email}
                      data-ocid="checkout-email"
                    />
                    {errors.email && (
                      <p
                        id="email-err"
                        className="text-destructive text-xs mt-1"
                        data-field-error
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="fullName">
                    Full Name{" "}
                    <span className="text-destructive" aria-hidden>
                      *
                    </span>
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="Jane Doe"
                    value={form.fullName}
                    onChange={(e) =>
                      handleFieldChange("fullName", e.target.value)
                    }
                    aria-describedby={errors.fullName ? "name-err" : undefined}
                    aria-invalid={!!errors.fullName}
                    data-ocid="checkout-name"
                  />
                  {errors.fullName && (
                    <p
                      id="name-err"
                      className="text-destructive text-xs"
                      data-field-error
                    >
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="street">
                    Street Address{" "}
                    <span className="text-destructive" aria-hidden>
                      *
                    </span>
                  </Label>
                  <Input
                    id="street"
                    placeholder="123 Main St, Apt 4B"
                    value={form.street}
                    onChange={(e) =>
                      handleFieldChange("street", e.target.value)
                    }
                    aria-describedby={errors.street ? "street-err" : undefined}
                    aria-invalid={!!errors.street}
                    data-ocid="checkout-street"
                  />
                  {errors.street && (
                    <p
                      id="street-err"
                      className="text-destructive text-xs"
                      data-field-error
                    >
                      {errors.street}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="city">
                      City{" "}
                      <span className="text-destructive" aria-hidden>
                        *
                      </span>
                    </Label>
                    <Input
                      id="city"
                      placeholder="New York"
                      value={form.city}
                      onChange={(e) =>
                        handleFieldChange("city", e.target.value)
                      }
                      aria-invalid={!!errors.city}
                      data-ocid="checkout-city"
                    />
                    {errors.city && (
                      <p className="text-destructive text-xs" data-field-error>
                        {errors.city}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="state">
                      State{" "}
                      <span className="text-destructive" aria-hidden>
                        *
                      </span>
                    </Label>
                    <Input
                      id="state"
                      placeholder="NY"
                      value={form.state}
                      onChange={(e) =>
                        handleFieldChange("state", e.target.value)
                      }
                      aria-invalid={!!errors.state}
                      data-ocid="checkout-state"
                    />
                    {errors.state && (
                      <p className="text-destructive text-xs" data-field-error>
                        {errors.state}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="postalCode">
                      Postal Code{" "}
                      <span className="text-destructive" aria-hidden>
                        *
                      </span>
                    </Label>
                    <Input
                      id="postalCode"
                      placeholder="10001"
                      value={form.postalCode}
                      onChange={(e) =>
                        handleFieldChange("postalCode", e.target.value)
                      }
                      aria-invalid={!!errors.postalCode}
                      data-ocid="checkout-postal"
                    />
                    {errors.postalCode && (
                      <p className="text-destructive text-xs" data-field-error>
                        {errors.postalCode}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="country">
                      Country{" "}
                      <span className="text-destructive" aria-hidden>
                        *
                      </span>
                    </Label>
                    <Input
                      id="country"
                      placeholder="US"
                      value={form.country}
                      onChange={(e) =>
                        handleFieldChange("country", e.target.value)
                      }
                      aria-invalid={!!errors.country}
                      data-ocid="checkout-country"
                    />
                    {errors.country && (
                      <p className="text-destructive text-xs" data-field-error>
                        {errors.country}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Shipping method */}
            <section>
              <h2 className="font-display text-xl text-foreground mb-5">
                Shipping Method
              </h2>
              <div className="space-y-3" data-ocid="shipping-method">
                {SHIPPING_OPTIONS.map((option) => {
                  const Icon = option.icon;
                  const selected = shippingMethod === option.id;
                  return (
                    <label
                      key={option.id}
                      className={`flex items-center gap-4 p-4 border cursor-pointer transition-smooth ${
                        selected
                          ? "border-accent bg-accent/5"
                          : "border-border bg-background hover:border-accent/50"
                      }`}
                      data-ocid={`shipping-${option.id}`}
                    >
                      <input
                        type="radio"
                        name="shippingMethod"
                        value={option.id}
                        checked={selected}
                        onChange={() => setShippingMethod(option.id)}
                        className="sr-only"
                      />
                      <div
                        className={`w-4 h-4 border-2 flex-shrink-0 flex items-center justify-center ${
                          selected ? "border-accent" : "border-border"
                        }`}
                      >
                        {selected && <div className="w-2 h-2 bg-accent" />}
                      </div>
                      <Icon
                        className={`size-5 flex-shrink-0 ${selected ? "text-accent" : "text-muted-foreground"}`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground">
                          {option.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                      <Badge
                        className={
                          selected
                            ? "bg-accent text-accent-foreground border-0"
                            : "bg-secondary text-secondary-foreground border-0"
                        }
                      >
                        {option.priceLabel(total)}
                      </Badge>
                    </label>
                  );
                })}
                {shippingMethod === "standard" &&
                  total < SHIPPING_THRESHOLD && (
                    <p className="text-xs text-muted-foreground bg-muted/60 px-3 py-2">
                      Add ${(SHIPPING_THRESHOLD - total).toFixed(2)} more to
                      your order for free standard shipping.
                    </p>
                  )}
              </div>
            </section>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-13 text-base font-semibold"
              disabled={isSubmitting}
              data-ocid="place-order-btn"
            >
              {isSubmitting
                ? "Redirecting to payment…"
                : `Place Order — $${grandTotal.toFixed(2)}`}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              You'll be redirected to Stripe's secure checkout to complete
              payment.
            </p>
          </form>

          {/* Desktop sticky order summary */}
          <div className="hidden lg:block lg:col-span-2">
            <div
              className="bg-card border border-border p-6 sticky top-24"
              data-ocid="checkout-summary"
            >
              <h2 className="font-display text-xl text-foreground mb-5">
                Order Summary
              </h2>
              <OrderSummaryContent
                items={items}
                total={total}
                shippingCost={shippingCost}
                shippingLabel={selectedShipping.priceLabel(total)}
                tax={tax}
                grandTotal={grandTotal}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

function OrderSummaryContent({
  items,
  total,
  shippingCost,
  shippingLabel,
  tax,
  grandTotal,
}: {
  items: CartItem[];
  total: number;
  shippingCost: number;
  shippingLabel: string;
  tax: number;
  grandTotal: number;
}) {
  return (
    <>
      <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
        {items.map((item) => (
          <div
            key={`${item.productId}-${item.size}-${item.color}`}
            className="flex gap-3 text-sm"
          >
            <div className="w-14 h-18 flex-shrink-0 overflow-hidden bg-muted relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-foreground text-background text-xs flex items-center justify-center font-medium">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">
                {item.name}
              </p>
              <p className="text-muted-foreground text-xs mt-0.5">
                {item.size} · {item.color}
              </p>
              <p className="text-accent text-sm font-medium mt-0.5">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Separator className="my-4" />
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span className={shippingCost === 0 ? "text-accent font-medium" : ""}>
            {shippingLabel}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex justify-between font-semibold text-base">
        <span>Total</span>
        <span>${grandTotal.toFixed(2)}</span>
      </div>
    </>
  );
}
