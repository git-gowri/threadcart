import type { Category, OrderStatus } from "./backend";

export type { Category, OrderStatus };

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

export interface CheckoutFormData {
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  email?: string;
  saveAddress?: boolean;
}

export interface LocalProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  sizes: string[];
  colors: string[];
  imageRefs: string[];
  careInstructions: string;
  createdAt: number;
  updatedAt: number;
}

export interface LocalOrderItem {
  productId: string;
  size: string;
  color: string;
  quantity: number;
  priceAtPurchase: number;
}

export interface LocalOrder {
  id: string;
  status: OrderStatus;
  items: LocalOrderItem[];
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  totalAmount: number;
  createdAt: number;
  updatedAt: number;
  guestEmail?: string;
  stripeSessionId?: string;
}

export interface LocalProductFilter {
  category?: Category;
  searchTerm?: string;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  color?: string;
}
