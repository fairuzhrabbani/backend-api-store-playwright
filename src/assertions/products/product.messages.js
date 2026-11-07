export const MessagesProductAssertion = {
  createProduct: {
    success: {
      expectedMessage: "Product created successfully",
      expectedHTTPStatus: 201,
    },

    emptyFields: {
      expectedMessage: "Name, price, stock and categoryId are required",
      expectedHTTPStatus: 400,
    },
  },
  updateProduct: {
    success: {
      expectedMessage: "Product updated successfully",
      expectedHTTPStatus: 200,
    },

    emptyFields: {
      expectedMessage: "Name, price, stock and categoryId are required",
      expectedHTTPStatus: 400,
    },

    invalidFormatType: {
      expectedMessage: "Product ID must be a positive integer",
      expectedHTTPStatus: 400,
    },

    notFound: {
      expectedMessage: "Product not found",
      expectedHTTPStatus: 404,
    },
  },
  deleteProduct: {
    success: {
      expectedMessage: "Product deleted successfully",
      expectedHTTPStatus: 200,
    },

    invalidFormatType: {
      expectedMessage: "Product ID must be a positive integer",
      expectedHTTPStatus: 400,
    },

    notFound: {
      expectedMessage: "Product not found",
      expectedHTTPStatus: 404,
    },
  },
  getOneProduct: {
    invalidFormatType: {
      expectedMessage: "Product ID must be a positive integer",
      expectedHTTPStatus: 400,
    },
    notFound: {
      expectedMessage: "Product not found",
      expectedHTTPStatus: 404,
    },
  },
};
