import CommonTypes "common";

module {
  public type OrderId = CommonTypes.OrderId;
  public type ProductId = CommonTypes.ProductId;
  public type OrderStatus = CommonTypes.OrderStatus;
  public type ShippingAddress = CommonTypes.ShippingAddress;
  public type Timestamp = CommonTypes.Timestamp;

  public type OrderItem = {
    productId : ProductId;
    quantity : Nat;
    size : Text;
    color : Text;
    priceAtPurchase : Nat; // price in cents at time of order
  };

  public type Order = {
    id : OrderId;
    items : [OrderItem];
    shippingAddress : ShippingAddress;
    guestEmail : ?Text;
    userPrincipal : ?Principal;
    status : OrderStatus;
    totalAmount : Nat; // in cents
    stripeSessionId : ?Text;
    createdAt : Timestamp;
    updatedAt : Timestamp;
  };

  public type OrderInput = {
    items : [OrderItem];
    shippingAddress : ShippingAddress;
    guestEmail : ?Text;
  };
};
