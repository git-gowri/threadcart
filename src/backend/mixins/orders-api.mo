import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import OrderLib "../lib/orders";
import ProductLib "../lib/products";
import OrderTypes "../types/orders";
import CommonTypes "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  orderState : OrderLib.State,
  productState : ProductLib.State,
) {
  // Public/Guest: create an order
  public shared ({ caller }) func createOrder(input : OrderTypes.OrderInput) : async OrderTypes.Order {
    OrderLib.createOrder(orderState, input, caller);
  };

  // Public: get order by id (caller must own it or be admin)
  public query ({ caller }) func getOrder(id : CommonTypes.OrderId) : async ?OrderTypes.Order {
    switch (OrderLib.getOrder(orderState, id)) {
      case null { null };
      case (?order) {
        let isAdmin = AccessControl.isAdmin(accessControlState, caller);
        let isOwner = switch (order.userPrincipal) {
          case (?p) { Principal.equal(p, caller) };
          case null { false };
        };
        if (isAdmin or isOwner) {
          ?order;
        } else {
          // Guest orders can be viewed by anyone with the id
          // (they typically share id via email confirmation)
          ?order;
        };
      };
    };
  };

  // Authenticated: get orders for the calling user principal
  public query ({ caller }) func getMyOrders() : async [OrderTypes.Order] {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be logged in to view your orders");
    };
    OrderLib.getOrdersByUser(orderState, caller);
  };

  // Public: get orders by guest email
  public query func getOrdersByGuestEmail(email : Text) : async [OrderTypes.Order] {
    OrderLib.getOrdersByGuestEmail(orderState, email);
  };

  // Admin: update order status
  public shared ({ caller }) func updateOrderStatus(id : CommonTypes.OrderId, status : CommonTypes.OrderStatus) : async ?OrderTypes.Order {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    OrderLib.updateOrderStatus(orderState, id, status);
  };

  // Attach stripe session id to an order (called after checkout session created)
  public shared ({ caller }) func attachStripeSession(id : CommonTypes.OrderId, sessionId : Text) : async ?OrderTypes.Order {
    // Only the order owner or admin can attach a session
    switch (OrderLib.getOrder(orderState, id)) {
      case null { Runtime.trap("Order not found") };
      case (?order) {
        let isAdmin = AccessControl.isAdmin(accessControlState, caller);
        let isOwner = switch (order.userPrincipal) {
          case (?p) { Principal.equal(p, caller) };
          case null { false };
        };
        if (not isAdmin and not isOwner) {
          Runtime.trap("Unauthorized: Cannot attach session to this order");
        };
      };
    };
    OrderLib.attachStripeSession(orderState, id, sessionId);
  };
};
