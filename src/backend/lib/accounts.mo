import Map "mo:core/Map";
import Time "mo:core/Time";
import AccountTypes "../types/accounts";
import CommonTypes "../types/common";

module {
  public type State = {
    accounts : Map.Map<Principal, AccountTypes.UserAccount>;
  };

  public func initState() : State {
    {
      accounts = Map.empty<Principal, AccountTypes.UserAccount>();
    };
  };

  public func getAccount(state : State, principal : Principal) : ?AccountTypes.UserAccount {
    state.accounts.get(principal);
  };

  public func getSavedAddresses(state : State, principal : Principal) : [CommonTypes.ShippingAddress] {
    switch (state.accounts.get(principal)) {
      case null { [] };
      case (?account) { account.savedAddresses };
    };
  };

  public func saveAddress(state : State, principal : Principal, address : CommonTypes.ShippingAddress) : AccountTypes.UserAccount {
    let now = Time.now();
    let current = switch (state.accounts.get(principal)) {
      case null {
        {
          principal;
          savedAddresses = [];
          updatedAt = now;
        };
      };
      case (?existing) { existing };
    };
    let newAddresses = current.savedAddresses.concat([address]);
    let updated : AccountTypes.UserAccount = {
      current with
      savedAddresses = newAddresses;
      updatedAt = now;
    };
    state.accounts.add(principal, updated);
    updated;
  };

  public func removeAddress(state : State, principal : Principal, index : Nat) : Bool {
    switch (state.accounts.get(principal)) {
      case null { false };
      case (?existing) {
        let addrs = existing.savedAddresses;
        if (index >= addrs.size()) {
          false;
        } else {
          let now = Time.now();
          // Use enumerate to filter by index, then extract value
          let filtered : [CommonTypes.ShippingAddress] = addrs.enumerate()
            .filter(func(pair : (Nat, CommonTypes.ShippingAddress)) : Bool { pair.0 != index })
            .map<(Nat, CommonTypes.ShippingAddress), CommonTypes.ShippingAddress>(func(pair : (Nat, CommonTypes.ShippingAddress)) : CommonTypes.ShippingAddress { pair.1 })
            .toArray();
          let updated : AccountTypes.UserAccount = {
            existing with
            savedAddresses = filtered;
            updatedAt = now;
          };
          state.accounts.add(principal, updated);
          true;
        };
      };
    };
  };
};
