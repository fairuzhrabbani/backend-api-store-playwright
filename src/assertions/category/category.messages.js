export const MessagesCategoryAssertion = {
  createCategory: {
    success: {
      expectedMessage: "Category created successfully",
      expectedHTTPStatus: 201,
    },

    emptyFields: {
      expectedMessage: "Name and description are required",
      expectedHTTPStatus: 400,
    },
  },
  updateCategory: {
    success: {
      expectedMessage: "Category updated successfully",
      expectedHTTPStatus: 200,
    },

    emptyFields: {
      expectedMessage: "Name and description are required",
      expectedHTTPStatus: 400,
    },

    invalidFormatType: {
      expectedMessage: "Category ID must be a positive integer",
      expectedHTTPStatus: 400,
    },

    notFound: {
      expectedMessage: "Category not found",
      expectedHTTPStatus: 404,
    },
  },
  deleteCategory: {
    success: {
      expectedMessage: "Category deleted successfully",
      expectedHTTPStatus: 200,
    },

    invalidFormatType: {
      expectedMessage: "Category ID must be a positive integer",
      expectedHTTPStatus: 400,
    },

    notFound: {
      expectedMessage: "Category not found",
      expectedHTTPStatus: 404,
    },
  },
  getOneCategory: {
    invalidFormatType: {
      expectedMessage: "Category ID must be a positive integer",
      expectedHTTPStatus: 400,
    },
    notFound: {
      expectedMessage: "Category not found",
      expectedHTTPStatus: 404,
    },
  },
};
