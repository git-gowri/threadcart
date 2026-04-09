import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { LogIn, MapPin, Package, Plus, Trash2, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Layout } from "../components/Layout";
import {
  useRemoveAddress,
  useSaveAddress,
  useSavedAddresses,
} from "../hooks/useAccount";

interface AddressForm {
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

const EMPTY_FORM: AddressForm = {
  fullName: "",
  street: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
};

function truncatePrincipal(principal: string): string {
  if (principal.length <= 16) return principal;
  return `${principal.slice(0, 8)}…${principal.slice(-8)}`;
}

export default function AccountPage() {
  const { login, loginStatus, identity } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success";
  const { data: addresses, isLoading } = useSavedAddresses();
  const removeAddress = useRemoveAddress();
  const saveAddress = useSaveAddress();
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState<AddressForm>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const principal = identity?.getPrincipal().toText() ?? "";

  const handleRemoveAddress = async (index: number) => {
    try {
      await removeAddress.mutateAsync(BigInt(index));
      toast.success("Address removed");
    } catch {
      toast.error("Failed to remove address");
    }
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.fullName ||
      !form.street ||
      !form.city ||
      !form.state ||
      !form.postalCode ||
      !form.country
    ) {
      toast.error("Please fill in all fields");
      return;
    }
    setSaving(true);
    try {
      await saveAddress.mutateAsync(form);
      toast.success("Address saved");
      setForm(EMPTY_FORM);
      setShowAddForm(false);
    } catch {
      toast.error("Failed to save address");
    } finally {
      setSaving(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <Layout>
        <div
          className="container max-w-md mx-auto px-4 py-24 text-center"
          data-ocid="account-login-prompt"
        >
          <div className="border border-border bg-card p-12">
            <User className="size-16 text-muted-foreground mx-auto mb-6 opacity-30" />
            <h1 className="font-display text-3xl text-foreground mb-3">
              My Account
            </h1>
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
              Sign in to view your orders, saved addresses, and account details.
            </p>
            <Button
              onClick={() => login()}
              className="w-full"
              data-ocid="account-login-btn"
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
          <div className="flex items-center gap-3">
            <div className="size-10 bg-primary flex items-center justify-center flex-shrink-0">
              <User className="size-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-2xl text-foreground leading-none">
                My Account
              </h1>
              {principal && (
                <Badge
                  variant="outline"
                  className="mt-1.5 font-mono text-xs text-muted-foreground border-border"
                  data-ocid="principal-badge"
                >
                  {truncatePrincipal(principal)}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className="container max-w-3xl mx-auto px-4 py-8 space-y-6"
        data-ocid="account-page"
      >
        {/* Navigation cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="/account/orders"
            className="group bg-card border border-border p-6 hover:border-accent transition-smooth flex items-center gap-4"
            data-ocid="nav-card-orders"
          >
            <div className="size-12 bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10 transition-smooth">
              <Package className="size-6 text-muted-foreground group-hover:text-accent transition-smooth" />
            </div>
            <div>
              <p className="font-display text-lg text-foreground">
                Order History
              </p>
              <p className="text-sm text-muted-foreground">
                Track and view past orders
              </p>
            </div>
          </a>

          <a
            href="/shop"
            className="group bg-card border border-border p-6 hover:border-accent transition-smooth flex items-center gap-4"
            data-ocid="nav-card-shop"
          >
            <div className="size-12 bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10 transition-smooth">
              <MapPin className="size-6 text-muted-foreground group-hover:text-accent transition-smooth" />
            </div>
            <div>
              <p className="font-display text-lg text-foreground">
                Browse Shop
              </p>
              <p className="text-sm text-muted-foreground">
                Explore our collections
              </p>
            </div>
          </a>
        </div>

        {/* Saved addresses */}
        <div
          className="bg-card border border-border"
          data-ocid="saved-addresses-section"
        >
          <div className="p-6 flex items-center justify-between">
            <h2 className="font-display text-xl flex items-center gap-2">
              <MapPin className="size-5" />
              Saved Addresses
            </h2>
            {!showAddForm && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowAddForm(true)}
                data-ocid="add-address-btn"
              >
                <Plus className="size-4" />
                Add New
              </Button>
            )}
          </div>

          <Separator />

          {/* Address list */}
          <div className="p-6 space-y-4">
            {isLoading && (
              <div className="space-y-3">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            )}

            {!isLoading &&
              addresses &&
              addresses.length === 0 &&
              !showAddForm && (
                <p
                  className="text-sm text-muted-foreground py-2"
                  data-ocid="no-addresses"
                >
                  No saved addresses yet. Add one below or addresses will be
                  saved automatically at checkout.
                </p>
              )}

            {!isLoading && addresses && addresses.length > 0 && (
              <div className="space-y-3" data-ocid="addresses-list">
                {addresses.map((addr, i) => (
                  <div
                    key={`${addr.street}-${i}`}
                    className="flex items-start justify-between p-4 border border-border bg-background"
                    data-ocid="address-item"
                  >
                    <div>
                      <p className="font-medium text-sm text-foreground">
                        {addr.fullName}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {addr.street}
                        <br />
                        {addr.city}, {addr.state} {addr.postalCode}
                        <br />
                        {addr.country}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveAddress(i)}
                      disabled={removeAddress.isPending}
                      className="text-muted-foreground hover:text-destructive transition-colors p-2 disabled:opacity-50 flex-shrink-0"
                      aria-label="Remove address"
                      data-ocid="remove-address-btn"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add address form */}
            {showAddForm && (
              <form
                onSubmit={handleAddAddress}
                className="border border-border bg-background p-5 space-y-4"
                data-ocid="add-address-form"
              >
                <p className="font-display text-base text-foreground">
                  New Address
                </p>
                <div className="space-y-3">
                  <div>
                    <Label
                      htmlFor="addr-fullname"
                      className="text-xs uppercase tracking-wider text-muted-foreground"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="addr-fullname"
                      value={form.fullName}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, fullName: e.target.value }))
                      }
                      placeholder="Jane Smith"
                      className="mt-1"
                      data-ocid="addr-fullname"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="addr-street"
                      className="text-xs uppercase tracking-wider text-muted-foreground"
                    >
                      Street Address
                    </Label>
                    <Input
                      id="addr-street"
                      value={form.street}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, street: e.target.value }))
                      }
                      placeholder="123 Main Street"
                      className="mt-1"
                      data-ocid="addr-street"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label
                        htmlFor="addr-city"
                        className="text-xs uppercase tracking-wider text-muted-foreground"
                      >
                        City
                      </Label>
                      <Input
                        id="addr-city"
                        value={form.city}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, city: e.target.value }))
                        }
                        placeholder="New York"
                        className="mt-1"
                        data-ocid="addr-city"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="addr-state"
                        className="text-xs uppercase tracking-wider text-muted-foreground"
                      >
                        State
                      </Label>
                      <Input
                        id="addr-state"
                        value={form.state}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, state: e.target.value }))
                        }
                        placeholder="NY"
                        className="mt-1"
                        data-ocid="addr-state"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label
                        htmlFor="addr-zip"
                        className="text-xs uppercase tracking-wider text-muted-foreground"
                      >
                        ZIP / Postal Code
                      </Label>
                      <Input
                        id="addr-zip"
                        value={form.postalCode}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, postalCode: e.target.value }))
                        }
                        placeholder="10001"
                        className="mt-1"
                        data-ocid="addr-zip"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="addr-country"
                        className="text-xs uppercase tracking-wider text-muted-foreground"
                      >
                        Country
                      </Label>
                      <Input
                        id="addr-country"
                        value={form.country}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, country: e.target.value }))
                        }
                        placeholder="United States"
                        className="mt-1"
                        data-ocid="addr-country"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 pt-1">
                  <Button
                    type="submit"
                    disabled={saving}
                    className="flex-1"
                    data-ocid="save-address-btn"
                  >
                    {saving ? "Saving…" : "Save Address"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowAddForm(false);
                      setForm(EMPTY_FORM);
                    }}
                    className="flex-1"
                    data-ocid="cancel-address-btn"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
