import CommonTypes "common";

module {
  public type ProductId = CommonTypes.ProductId;
  public type Category = CommonTypes.Category;
  public type Timestamp = CommonTypes.Timestamp;

  public type Product = {
    id : ProductId;
    name : Text;
    description : Text;
    price : Nat; // price in cents
    category : Category;
    sizes : [Text];
    colors : [Text];
    careInstructions : Text;
    imageRefs : [Text];
    createdAt : Timestamp;
    updatedAt : Timestamp;
  };

  public type ProductInput = {
    name : Text;
    description : Text;
    price : Nat;
    category : Category;
    sizes : [Text];
    colors : [Text];
    careInstructions : Text;
    imageRefs : [Text];
  };

  public type ProductFilter = {
    category : ?Category;
    size : ?Text;
    color : ?Text;
    minPrice : ?Nat;
    maxPrice : ?Nat;
    searchTerm : ?Text;
  };
};
