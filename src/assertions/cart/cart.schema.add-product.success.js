export const CartSchemaAddProductSuccess =  {
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
        created_at: {
          type: "string",
        },
        updated_at: {
          type: "string",
        },
      },
      required: ["id", "cart_id", "product_id", "quantity", "created_at", "updated_at"],
    },
  },
  required: ["success", "message", "data"],
};
