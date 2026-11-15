export const CartSchemaClearProductSuccess = {
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
        cartId: {
          type: "number",
        },
      },
      required: ["cartId"],
    },
  },
  required: ["success", "message", "data"],
};
