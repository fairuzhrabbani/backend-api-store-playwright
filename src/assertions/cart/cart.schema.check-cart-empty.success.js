export const CartSchemaCheckCartEmptytSuccess = {
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
          items: {},
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