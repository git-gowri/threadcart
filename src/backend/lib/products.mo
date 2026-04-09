import Map "mo:core/Map";
import Time "mo:core/Time";
import Text "mo:core/Text";
import ProductTypes "../types/products";
import CommonTypes "../types/common";

module {
  public type State = {
    products : Map.Map<CommonTypes.ProductId, ProductTypes.Product>;
    var nextId : Nat;
  };

  public func initState() : State {
    let state : State = {
      products = Map.empty<CommonTypes.ProductId, ProductTypes.Product>();
      var nextId = 1;
    };
    // Seed sample apparel products
    seedProducts(state);
    state;
  };

  func seedProducts(state : State) {
    let samples : [ProductTypes.ProductInput] = [
      {
        name = "Classic Oxford Shirt";
        description = "A timeless Oxford shirt crafted from premium cotton. Perfect for both casual and semi-formal occasions.";
        price = 5999;
        category = #Men;
        sizes = ["XS", "S", "M", "L", "XL", "XXL"];
        colors = ["White", "Light Blue", "Navy"];
        careInstructions = "Machine wash cold, tumble dry low, iron on medium heat.";
        imageRefs = ["mens-oxford-shirt.jpg"];
      },
      {
        name = "Slim Fit Chinos";
        description = "Modern slim-fit chinos made from stretch cotton blend. Versatile enough for the office or weekend.";
        price = 7499;
        category = #Men;
        sizes = ["28x30", "30x30", "32x30", "32x32", "34x32", "36x32"];
        colors = ["Khaki", "Navy", "Olive", "Black"];
        careInstructions = "Machine wash cold, do not bleach, hang dry.";
        imageRefs = ["mens-chinos.jpg"];
      },
      {
        name = "Floral Wrap Dress";
        description = "Effortlessly elegant wrap dress featuring a vibrant floral print. Lightweight and perfect for any season.";
        price = 8999;
        category = #Women;
        sizes = ["XS", "S", "M", "L", "XL"];
        colors = ["Floral Blue", "Floral Pink", "Floral Green"];
        careInstructions = "Hand wash cold, lay flat to dry, cool iron if needed.";
        imageRefs = ["womens-wrap-dress.jpg"];
      },
      {
        name = "High-Waist Skinny Jeans";
        description = "Flattering high-waist design with a skinny cut. Made from premium denim with just the right amount of stretch.";
        price = 9499;
        category = #Women;
        sizes = ["24", "25", "26", "27", "28", "29", "30", "32"];
        colors = ["Dark Blue", "Light Blue", "Black", "White"];
        careInstructions = "Machine wash cold inside out, do not tumble dry, hang to dry.";
        imageRefs = ["womens-jeans.jpg"];
      },
      {
        name = "Kids Graphic Tee";
        description = "Fun and colorful graphic tee for kids. Made from soft 100% organic cotton for all-day comfort.";
        price = 2499;
        category = #Kids;
        sizes = ["2T", "3T", "4T", "5", "6", "7", "8"];
        colors = ["Red", "Blue", "Yellow", "Green"];
        careInstructions = "Machine wash warm, tumble dry low.";
        imageRefs = ["kids-graphic-tee.jpg"];
      },
      {
        name = "Kids Denim Overalls";
        description = "Adorable and durable denim overalls for active kids. Adjustable straps and reinforced knees.";
        price = 4999;
        category = #Kids;
        sizes = ["2T", "3T", "4T", "5", "6", "7", "8"];
        colors = ["Light Denim", "Dark Denim"];
        careInstructions = "Machine wash cold, tumble dry low.";
        imageRefs = ["kids-overalls.jpg"];
      },
      {
        name = "Leather Tote Bag";
        description = "Spacious genuine leather tote bag with interior pockets. A sophisticated everyday carry for work or leisure.";
        price = 14999;
        category = #Accessories;
        sizes = ["One Size"];
        colors = ["Brown", "Black", "Tan"];
        careInstructions = "Wipe clean with a damp cloth, condition leather regularly.";
        imageRefs = ["leather-tote.jpg"];
      },
      {
        name = "Wool Blend Scarf";
        description = "Luxuriously soft wool blend scarf in classic plaid pattern. Keeps you warm in style during the colder months.";
        price = 3999;
        category = #Accessories;
        sizes = ["One Size"];
        colors = ["Red Plaid", "Blue Plaid", "Grey Plaid"];
        careInstructions = "Dry clean only.";
        imageRefs = ["wool-scarf.jpg"];
      },
      {
        name = "Men's Polo Shirt";
        description = "Classic pique polo shirt with a modern slim fit. A wardrobe essential that transitions from casual to smart casual effortlessly.";
        price = 5499;
        category = #Men;
        sizes = ["S", "M", "L", "XL", "XXL"];
        colors = ["Navy", "White", "Forest Green", "Burgundy"];
        careInstructions = "Machine wash cold, do not bleach, tumble dry low.";
        imageRefs = ["mens-polo.jpg"];
      },
      {
        name = "Women's Linen Blouse";
        description = "Breezy linen blouse with a relaxed silhouette. Perfect for warm weather and effortless layering.";
        price = 6999;
        category = #Women;
        sizes = ["XS", "S", "M", "L", "XL"];
        colors = ["White", "Ivory", "Sage", "Blush"];
        careInstructions = "Machine wash cold gentle cycle, lay flat to dry.";
        imageRefs = ["womens-linen-blouse.jpg"];
      },
    ];

    for (input in samples.vals()) {
      let _ = addProduct(state, input);
    };
  };

  public func addProduct(state : State, input : ProductTypes.ProductInput) : ProductTypes.Product {
    let now = Time.now();
    let id = state.nextId;
    state.nextId += 1;
    let product : ProductTypes.Product = {
      id;
      name = input.name;
      description = input.description;
      price = input.price;
      category = input.category;
      sizes = input.sizes;
      colors = input.colors;
      careInstructions = input.careInstructions;
      imageRefs = input.imageRefs;
      createdAt = now;
      updatedAt = now;
    };
    state.products.add(id, product);
    product;
  };

  public func updateProduct(state : State, id : CommonTypes.ProductId, input : ProductTypes.ProductInput) : ?ProductTypes.Product {
    switch (state.products.get(id)) {
      case null { null };
      case (?existing) {
        let now = Time.now();
        let updated : ProductTypes.Product = {
          existing with
          name = input.name;
          description = input.description;
          price = input.price;
          category = input.category;
          sizes = input.sizes;
          colors = input.colors;
          careInstructions = input.careInstructions;
          imageRefs = input.imageRefs;
          updatedAt = now;
        };
        state.products.add(id, updated);
        ?updated;
      };
    };
  };

  public func deleteProduct(state : State, id : CommonTypes.ProductId) : Bool {
    switch (state.products.get(id)) {
      case null { false };
      case (?_) {
        state.products.remove(id);
        true;
      };
    };
  };

  public func getProduct(state : State, id : CommonTypes.ProductId) : ?ProductTypes.Product {
    state.products.get(id);
  };

  public func listProducts(state : State) : [ProductTypes.Product] {
    state.products.values().toArray();
  };

  public func filterProducts(state : State, filter : ProductTypes.ProductFilter) : [ProductTypes.Product] {
    state.products.values().filter(func(p : ProductTypes.Product) : Bool {
      // Category filter
      let categoryMatch = switch (filter.category) {
        case null { true };
        case (?cat) { p.category == cat };
      };
      // Size filter
      let sizeMatch = switch (filter.size) {
        case null { true };
        case (?sz) { p.sizes.find(func(s : Text) : Bool { s == sz }) != null };
      };
      // Color filter
      let colorMatch = switch (filter.color) {
        case null { true };
        case (?col) { p.colors.find(func(c : Text) : Bool { c == col }) != null };
      };
      // Min price filter
      let minPriceMatch = switch (filter.minPrice) {
        case null { true };
        case (?min) { p.price >= min };
      };
      // Max price filter
      let maxPriceMatch = switch (filter.maxPrice) {
        case null { true };
        case (?max) { p.price <= max };
      };
      // Search term filter (case-insensitive match against name and description)
      let searchMatch = switch (filter.searchTerm) {
        case null { true };
        case (?term) {
          let lower = term.toLower();
          p.name.toLower().contains(#text lower) or p.description.toLower().contains(#text lower);
        };
      };
      categoryMatch and sizeMatch and colorMatch and minPriceMatch and maxPriceMatch and searchMatch;
    }).toArray();
  };
};
