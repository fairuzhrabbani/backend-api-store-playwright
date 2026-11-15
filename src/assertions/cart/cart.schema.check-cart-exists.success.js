export const CartSchemaCheckCartExistsSuccess = {
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
        userId: {
          type: "number",
        },
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                type: "number",
              },
              cart_id: {
                type: "number",
              },
              product_id: {
                type: "number",
              },
              product_name: {
                type: "string",
              },
              price: {
                type: "string",
              },
              quantity: {
                type: "number",
              },
              subtotal: {
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
              "cart_id",
              "product_id",
              "product_name",
              "price",
              "quantity",
              "subtotal",
              "created_at",
              "updated_at",
            ],
          },
        },
        summary: {
          type: "object",
          properties: {
            totalItems: {
              type: "number",
            },
            totalPrice: {
              type: "number",
            },
          },
          required: ["totalItems", "totalPrice"],
        },
        createdAt: {
          type: "string",
        },
        updatedAt: {
          type: "string",
        },
      },
      required: ["id", "userId", "items", "summary", "createdAt", "updatedAt"],
    },
  },
  required: ["success", "message", "data"],
};
