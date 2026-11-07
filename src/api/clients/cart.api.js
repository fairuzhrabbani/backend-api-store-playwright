import { CartEndpoint } from "../endpoints/cart.endpoint.js";

export class CartAPI {
  constructor(request) {
    this.request = request;
  }

  async getAll() {
    return this.request.get(CartEndpoint.LIST);
  }

  async create(payload) {
    return this.request.post(CartEndpoint.CREATE, {
      data: payload,
    });
  }

  async update(id, payload) {
    return this.request.put(CartEndpoint.UPDATE(id), {
      data: payload,
    });
  }

  async delete(id) {
    return this.request.delete(CartEndpoint.DELETE(id));
  }

  async clear() {
    return this.request.delete(CartEndpoint.CLEAR);
  }
}
