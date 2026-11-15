export const MessagesCartAssertion = {
  addProductCart: {
    success: {
      expectedMessage: "Product added to cart successfully",
      expectedHTTPStatus: 201,
    },
    notFound: {
      expectedMessage: "Product not found",
      expectedHTTPStatus: 404,
    },
  },

  clearProductCart: {
    success: {
      expectedMessage: "Cart cleared successfully",
      expectedHTTPStatus: 200,
    },
    notFound: {
      expectedMessage: "Cart not found",
      expectedHTTPStatus: 404,
    },
  },

  updateProductCart: {
    success: {
      expectedMessage: "Cart item updated successfully",
      expectedHTTPStatus: 200,
    },
    notFoundProduct: {
      expectedMessage: "Product not found",
      expectedHTTPStatus: 404,
    },
    notFoundCartItem: {
      expectedMessage: "Cart item not found",
      expectedHTTPStatus: 404,
    },
    notFoundCart: {
      expectedMessage: "Cart not found",
      expectedHTTPStatus: 404,
    },
  },

  deleteProductCart: {
    success: {
      expectedMessage: "Product removed from cart successfully",
      expectedHTTPStatus: 200,
    },
    notFound: {
      expectedMessage: "Cart not found",
      expectedHTTPStatus: 404,
    },
  },

  checkProductCart: {
    success: {
      expectedMessage: "Cart fetched successfully",
      expectedHTTPStatus: 200,
    }
  },
};
