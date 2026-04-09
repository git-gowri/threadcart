import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import AccountLib "../lib/accounts";
import AccountTypes "../types/accounts";
import CommonTypes "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  accountState : AccountLib.State,
) {
  // Authenticated: get saved addresses
  public query ({ caller }) func getSavedAddresses() : async [CommonTypes.ShippingAddress] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to view saved addresses");
    };
    AccountLib.getSavedAddresses(accountState, caller);
  };

  // Authenticated: save a shipping address
  public shared ({ caller }) func saveAddress(address : CommonTypes.ShippingAddress) : async AccountTypes.UserAccount {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to save an address");
    };
    AccountLib.saveAddress(accountState, caller, address);
  };

  // Authenticated: remove a saved address by index
  public shared ({ caller }) func removeAddress(index : Nat) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to remove an address");
    };
    AccountLib.removeAddress(accountState, caller, index);
  };
};
