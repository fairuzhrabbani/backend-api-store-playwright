export const ProductSchemaDeleteSuccess = {
  type: "object",
  properties: {
    success: {
      type: "boolean",
    },
    message: {
      type: "string",
    },
    data: {
      type: "object",
      properties: {
        id: {
          type: "number",
        },
        name: {
          type: "string",
        },
        description: {
          type: "string",
        },
        price: {
          type: "string",
        },
        stock: {
          type: "number",
        },
        category_id: {
          type: "number",
        },
      },
      required: ["id", "name", "description", "price", "stock", "category_id"],
    },
  },
  required: ["success", "message", "data"],
};
