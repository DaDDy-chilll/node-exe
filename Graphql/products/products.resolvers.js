const productModel = require("./products.model");
module.exports = {
  Query: {
    products: () => {
      return productModel.getALlProducts();
    },
    productByPrice: (_, args) => {
      return productModel.getProductByPrice(args.min, args.max);
    },
    product: (_, args) => {
      return productModel.getProductById(args.id);
    },
  },
  Mutation: {
    addNewProduct: (_, args) => {
      return productModel.addNewProduct(args.id, args.description, args.price);
    },
    addNewProductReview: (_, args) => {
      return productModel.addNewReview(args.id, args.rating, args.comments);
    },
  },
};
