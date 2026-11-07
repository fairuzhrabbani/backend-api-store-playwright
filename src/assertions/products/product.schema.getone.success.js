export const ProductSchemaGetOneSuccess = {
  type: "object",
  properties: {
    success: {
      type: "boolean",
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
        category_name: {
          type: "string",
        },
        created_at: {
          type: "string",
        },
        updated_at: {
          type: "string",
        },
      },
      required: [
        "id",
        "name",
        "description",
        "price",
        "stock",
        "category_id",
        "category_name",
        "created_at",
        "updated_at",
      ],
    },
  },
  required: ["success", "data"],
};
