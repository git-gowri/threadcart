import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ProductLib "../lib/products";
import ProductTypes "../types/products";
import CommonTypes "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  productState : ProductLib.State,
) {
  // Public: list all products
  public query func listProducts() : async [ProductTypes.Product] {
    ProductLib.listProducts(productState);
  };

  // Public: get a single product by id
  public query func getProduct(id : CommonTypes.ProductId) : async ?ProductTypes.Product {
    ProductLib.getProduct(productState, id);
  };

  // Public: filter/search products
  public query func filterProducts(filter : ProductTypes.ProductFilter) : async [ProductTypes.Product] {
    ProductLib.filterProducts(productState, filter);
  };

  // Admin: add a new product
  public shared ({ caller }) func addProduct(input : ProductTypes.ProductInput) : async ProductTypes.Product {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    ProductLib.addProduct(productState, input);
  };

  // Admin: update an existing product
  public shared ({ caller }) func updateProduct(id : CommonTypes.ProductId, input : ProductTypes.ProductInput) : async ?ProductTypes.Product {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    ProductLib.updateProduct(productState, id, input);
  };

  // Admin: delete a product
  public shared ({ caller }) func deleteProduct(id : CommonTypes.ProductId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    ProductLib.deleteProduct(productState, id);
  };
};
