import CommonTypes "common";

module {
  public type ShippingAddress = CommonTypes.ShippingAddress;
  public type Timestamp = CommonTypes.Timestamp;

  public type UserAccount = {
    principal : Principal;
    savedAddresses : [ShippingAddress];
    updatedAt : Timestamp;
  };
};
