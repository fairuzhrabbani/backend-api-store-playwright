export const CartEndpoint = {
  LIST: "/api/cart",
  CREATE: "/api/cart/items",
  UPDATE: (id) => `/api/cart/items/${id}`,
  DELETE: (id) => `/api/cart/items/${id}`,
  CLEAR: "/api/cart",
};
