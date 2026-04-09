module {
  public type Timestamp = Int;
  public type OrderId = Nat;
  public type ProductId = Nat;

  public type Category = {
    #Men;
    #Women;
    #Kids;
    #Accessories;
  };

  public type OrderStatus = {
    #pending;
    #confirmed;
    #shipped;
    #delivered;
  };

  public type ShippingAddress = {
    fullName : Text;
    street : Text;
    city : Text;
    state : Text;
    postalCode : Text;
    country : Text;
  };
};
