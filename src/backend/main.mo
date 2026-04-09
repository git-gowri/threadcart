import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Runtime "mo:core/Runtime";

import ProductLib "lib/products";
import OrderLib "lib/orders";
import AccountLib "lib/accounts";

import ProductsMixin "mixins/products-api";
import OrdersMixin "mixins/orders-api";
import AccountsMixin "mixins/accounts-api";

actor {
  // Authorization state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Domain state
  let productState = ProductLib.initState();
  let orderState = OrderLib.initState();
  let accountState = AccountLib.initState();
  var stripeConfiguration : ?Stripe.StripeConfiguration = null;

  // Domain mixins
  include ProductsMixin(accessControlState, productState);
  include OrdersMixin(accessControlState, orderState, productState);
  include AccountsMixin(accessControlState, accountState);

  // Stripe: admin configuration
  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    stripeConfiguration := ?config;
  };

  // Stripe: check if configured
  public query func isStripeConfigured() : async Bool {
    stripeConfiguration != null;
  };

  // Stripe: create checkout session
  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    let config = switch (stripeConfiguration) {
      case null { Runtime.trap("Stripe is not configured") };
      case (?c) { c };
    };
    await Stripe.createCheckoutSession(config, caller, items, successUrl, cancelUrl, transform);
  };

  // Stripe: check payment session status
  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    let config = switch (stripeConfiguration) {
      case null { Runtime.trap("Stripe is not configured") };
      case (?c) { c };
    };
    await Stripe.getSessionStatus(config, sessionId, transform);
  };

  // Required for HTTP outcall response transformation
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };
};
