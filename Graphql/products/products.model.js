const products = [
  {
    id: "redshoe",
    description: "Red Shoe",
    price: 43.12,
    review: [],
  },
  {
    id: "bluejean",
    description: "Blue Jeans",
    price: 55.55,
    review: [],
  },
];

function getALlProducts() {
  return products;
}

function getProductByPrice(min, max) {
  return products.filter((product) => {
    return product.price >= min && product.price <= max;
  });
}

function getProductById(id) {
  return products.find((product) => {
    return product.id === id;
  });
}

function addNewProduct(id, description, price) {
  const newProduct = {
    id,
    description,
    price,
    review: [],
  };
  products.push(newProduct);
  return newProduct;
}

function addNewReview(id, rating, comments) {
  const matchedProduct = getProductById(id);
  if (matchedProduct) {
    const newProductReview = {
      rating,
      comments,
    };
    matchedProduct.review.push(newProductReview);
    return newProductReview;
  }
}

module.exports = {
  getALlProducts,
  getProductByPrice,
  getProductById,
  addNewProduct,
  addNewReview,
};
