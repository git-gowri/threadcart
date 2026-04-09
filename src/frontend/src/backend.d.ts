import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ProductInput {
    imageRefs: Array<string>;
    name: string;
    description: string;
    sizes: Array<string>;
    category: Category;
    colors: Array<string>;
    price: bigint;
    careInstructions: string;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ShippingAddress {
    street: string;
    country: string;
    city: string;
    postalCode: string;
    fullName: string;
    state: string;
}
export interface OrderItem {
    color: string;
    size: string;
    productId: ProductId;
    quantity: bigint;
    priceAtPurchase: bigint;
}
export interface OrderInput {
    guestEmail?: string;
    shippingAddress: ShippingAddress;
    items: Array<OrderItem>;
}
export interface UserAccount {
    principal: Principal;
    savedAddresses: Array<ShippingAddress>;
    updatedAt: Timestamp;
}
export interface Order {
    id: OrderId;
    status: OrderStatus;
    createdAt: Timestamp;
    guestEmail?: string;
    updatedAt: Timestamp;
    userPrincipal?: Principal;
    totalAmount: bigint;
    shippingAddress: ShippingAddress;
    items: Array<OrderItem>;
    stripeSessionId?: string;
}
export interface ProductFilter {
    color?: string;
    size?: string;
    maxPrice?: bigint;
    searchTerm?: string;
    category?: Category;
    minPrice?: bigint;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export type ProductId = bigint;
export interface Product {
    id: ProductId;
    imageRefs: Array<string>;
    name: string;
    createdAt: Timestamp;
    description: string;
    sizes: Array<string>;
    updatedAt: Timestamp;
    category: Category;
    colors: Array<string>;
    price: bigint;
    careInstructions: string;
}
export type OrderId = bigint;
export enum Category {
    Men = "Men",
    Accessories = "Accessories",
    Kids = "Kids",
    Women = "Women"
}
export enum OrderStatus {
    shipped = "shipped",
    pending = "pending",
    delivered = "delivered",
    confirmed = "confirmed"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(input: ProductInput): Promise<Product>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    attachStripeSession(id: OrderId, sessionId: string): Promise<Order | null>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createOrder(input: OrderInput): Promise<Order>;
    deleteProduct(id: ProductId): Promise<boolean>;
    filterProducts(filter: ProductFilter): Promise<Array<Product>>;
    getCallerUserRole(): Promise<UserRole>;
    getMyOrders(): Promise<Array<Order>>;
    getOrder(id: OrderId): Promise<Order | null>;
    getOrdersByGuestEmail(email: string): Promise<Array<Order>>;
    getProduct(id: ProductId): Promise<Product | null>;
    getSavedAddresses(): Promise<Array<ShippingAddress>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    listProducts(): Promise<Array<Product>>;
    removeAddress(index: bigint): Promise<boolean>;
    saveAddress(address: ShippingAddress): Promise<UserAccount>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateOrderStatus(id: OrderId, status: OrderStatus): Promise<Order | null>;
    updateProduct(id: ProductId, input: ProductInput): Promise<Product | null>;
}
