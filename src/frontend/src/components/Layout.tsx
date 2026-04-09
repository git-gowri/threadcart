import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { LogIn, LogOut, Search, ShoppingBag, User } from "lucide-react";
import { useState } from "react";
import { Category } from "../backend";
import { useCart } from "../hooks/useCart";

const CATEGORIES = [
  { label: "Men", value: Category.Men, href: "/shop?category=Men" },
  { label: "Women", value: Category.Women, href: "/shop?category=Women" },
  { label: "Kids", value: Category.Kids, href: "/shop?category=Kids" },
  {
    label: "Accessories",
    value: Category.Accessories,
    href: "/shop?category=Accessories",
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { itemCount } = useCart();
  const { login, clear, loginStatus } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success";
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header
        className="bg-card border-b border-border shadow-subtle sticky top-0 z-50"
        data-ocid="header"
      >
        <div className="container max-w-7xl mx-auto px-4">
          {/* Top bar */}
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <a href="/shop" className="flex-shrink-0" data-ocid="logo-link">
              <span className="font-display text-2xl text-foreground tracking-tight">
                Thread<span className="text-accent">Cart</span>
              </span>
            </a>

            {/* Search */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden md:flex flex-1 max-w-md items-center relative"
              data-ocid="search-form"
            >
              <Input
                type="search"
                placeholder="Search apparel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 bg-background border-border"
                data-ocid="search-input"
              />
              <button
                type="submit"
                className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Search"
              >
                <Search className="size-4" />
              </button>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {isLoggedIn ? (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="hidden sm:inline-flex"
                    data-ocid="account-link"
                  >
                    <a href="/account" aria-label="My Account">
                      <User className="size-5" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => clear()}
                    className="hidden sm:inline-flex text-muted-foreground hover:text-foreground"
                    data-ocid="logout-btn"
                  >
                    <LogOut className="size-4" />
                    <span className="hidden md:inline">Sign Out</span>
                  </Button>
                </>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => login()}
                  className="text-muted-foreground hover:text-foreground"
                  data-ocid="login-btn"
                >
                  <LogIn className="size-4" />
                  <span className="hidden md:inline">Sign In</span>
                </Button>
              )}

              <Button
                variant="ghost"
                size="icon"
                asChild
                className="relative"
                data-ocid="cart-link"
              >
                <a href="/cart" aria-label={`Cart with ${itemCount} items`}>
                  <ShoppingBag className="size-5" />
                  {itemCount > 0 && (
                    <Badge
                      className="absolute -top-1 -right-1 h-5 min-w-5 px-1 text-xs bg-accent text-accent-foreground border-0 flex items-center justify-center"
                      data-ocid="cart-count-badge"
                    >
                      {itemCount}
                    </Badge>
                  )}
                </a>
              </Button>
            </div>
          </div>

          {/* Category Nav */}
          <nav
            className="flex items-center gap-0 border-t border-border -mx-4 px-4 overflow-x-auto"
            aria-label="Product categories"
            data-ocid="category-nav"
          >
            <a
              href="/shop"
              className="py-3 px-4 text-sm font-body text-muted-foreground hover:text-foreground border-b-2 border-transparent hover:border-accent transition-smooth whitespace-nowrap"
            >
              All
            </a>
            {CATEGORIES.map((cat) => (
              <a
                key={cat.value}
                href={cat.href}
                className="py-3 px-4 text-sm font-body text-muted-foreground hover:text-foreground border-b-2 border-transparent hover:border-accent transition-smooth whitespace-nowrap"
                data-ocid={`nav-${cat.label.toLowerCase()}`}
              >
                {cat.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Search */}
      <div className="md:hidden bg-card border-b border-border px-4 py-2">
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center relative"
        >
          <Input
            type="search"
            placeholder="Search apparel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 bg-background border-border"
            data-ocid="search-input-mobile"
          />
          <button
            type="submit"
            className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Search"
          >
            <Search className="size-4" />
          </button>
        </form>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-background" id="main-content">
        {children}
      </main>

      {/* Footer */}
      <footer
        className="bg-card border-t border-border mt-auto"
        data-ocid="footer"
      >
        <div className="container max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <span className="font-display text-xl text-foreground">
                Thread<span className="text-accent">Cart</span>
              </span>
              <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                Premium apparel for every occasion. Curated collections for men,
                women, and kids.
              </p>
            </div>
            <div>
              <h4 className="font-body font-semibold text-foreground text-sm uppercase tracking-wider mb-4">
                Shop
              </h4>
              <ul className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <li key={cat.value}>
                    <a
                      href={cat.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {cat.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-body font-semibold text-foreground text-sm uppercase tracking-wider mb-4">
                Account
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/account"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    My Account
                  </a>
                </li>
                <li>
                  <a
                    href="/account/orders"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Order History
                  </a>
                </li>
                <li>
                  <a
                    href="/cart"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Shopping Cart
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()}.{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.hostname : "",
                )}`}
                className="hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Built with love using caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
