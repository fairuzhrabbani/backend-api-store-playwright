export const CartSchemaDeleteProductSuccess = {
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
        cart_id: {
          type: "number",
        },
        product_id: {
          type: "number",
        },
        quantity: {
          type: "number",
        },
      },
      required: ["id", "cart_id", "product_id", "quantity"],
    },
  },
  required: ["success", "message", "data"],
};