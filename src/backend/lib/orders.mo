import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import OrderTypes "../types/orders";
import CommonTypes "../types/common";

module {
  public type State = {
    orders : Map.Map<CommonTypes.OrderId, OrderTypes.Order>;
    var nextId : Nat;
  };

  public func initState() : State {
    {
      orders = Map.empty<CommonTypes.OrderId, OrderTypes.Order>();
      var nextId = 1;
    };
  };

  public func createOrder(state : State, input : OrderTypes.OrderInput, caller : Principal) : OrderTypes.Order {
    let now = Time.now();
    let id = state.nextId;
    state.nextId += 1;
    // Compute total amount
    let total = input.items.foldLeft(0, func(acc : Nat, item : OrderTypes.OrderItem) : Nat {
      acc + item.priceAtPurchase * item.quantity;
    });
    // Set userPrincipal if authenticated, otherwise null (guests use guestEmail)
    let userPrincipal : ?Principal = if (caller.isAnonymous()) {
      null;
    } else {
      ?caller;
    };
    let order : OrderTypes.Order = {
      id;
      items = input.items;
      shippingAddress = input.shippingAddress;
      guestEmail = input.guestEmail;
      userPrincipal;
      status = #pending;
      totalAmount = total;
      stripeSessionId = null;
      createdAt = now;
      updatedAt = now;
    };
    state.orders.add(id, order);
    order;
  };

  public func getOrder(state : State, id : CommonTypes.OrderId) : ?OrderTypes.Order {
    state.orders.get(id);
  };

  public func getOrdersByUser(state : State, principal : Principal) : [OrderTypes.Order] {
    state.orders.values().filter(func(o : OrderTypes.Order) : Bool {
      switch (o.userPrincipal) {
        case (?p) { Principal.equal(p, principal) };
        case null { false };
      };
    }).toArray();
  };

  public func getOrdersByGuestEmail(state : State, email : Text) : [OrderTypes.Order] {
    state.orders.values().filter(func(o : OrderTypes.Order) : Bool {
      switch (o.guestEmail) {
        case (?e) { e == email };
        case null { false };
      };
    }).toArray();
  };

  public func updateOrderStatus(state : State, id : CommonTypes.OrderId, status : CommonTypes.OrderStatus) : ?OrderTypes.Order {
    switch (state.orders.get(id)) {
      case null { null };
      case (?existing) {
        let now = Time.now();
        let updated : OrderTypes.Order = { existing with status; updatedAt = now };
        state.orders.add(id, updated);
        ?updated;
      };
    };
  };

  public func attachStripeSession(state : State, id : CommonTypes.OrderId, sessionId : Text) : ?OrderTypes.Order {
    switch (state.orders.get(id)) {
      case null { null };
      case (?existing) {
        let now = Time.now();
        let updated : OrderTypes.Order = { existing with stripeSessionId = ?sessionId; updatedAt = now };
        state.orders.add(id, updated);
        ?updated;
      };
    };
  };
};
