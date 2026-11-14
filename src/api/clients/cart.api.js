import { CartEndpoint } from "../endpoints/cart.endpoint.js";
import { APIExecutor } from "../../utils/logger/api-executor.js";

export class CartAPI {
  constructor(request, token, testInfo) {
    this.api = new APIExecutor(request, testInfo);
    this.token = token;
  }

  get headers() {
    return {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };
  }

  async checkCart() {
    return this.api.execute({
      method: "POST",
      endpoint: CartEndpoint.LIST,
      options: {
        headers: this.headers,
      },
    });
  }

  async createCart(payload) {
    return this.api.execute({
      method: "POST",
      endpoint: CartEndpoint.CREATE,
      payload,
      options: {
        headers: this.headers,
      },
    });
  }

  async updateCart(id, payload) {
    return this.api.execute({
      method: "PUT",
      endpoint: CartEndpoint.UPDATE(id),
      payload,
      options: {
        headers: this.headers,
      },
    });
  }

  async deleteCart(id) {
    return this.api.execute({
      method: "DELETE",
      endpoint: CartEndpoint.DELETE(id),
      options: {
        headers: this.headers,
      },
    });
  }

  async clearCart() {
    return this.api.execute({
      method: "DELETE",
      endpoint: CartEndpoint.CLEAR(),
      options: {
        headers: this.headers,
      },
    });
  }

  // async checkCart() {
  //   return this.request.get(CartEndpoint.LIST);
  // }

  // async createCart(payload) {
  //   return this.request.post(CartEndpoint.CREATE, {
  //     data: payload,
  //   });
  // }

  // async updateCart(id, payload) {
  //   return this.request.put(CartEndpoint.UPDATE(id), {
  //     data: payload,
  //   });
  // }

  // async deleteCart(id) {
  //   return this.request.delete(CartEndpoint.DELETE(id));
  // }

  // async clearCart() {
  //   return this.request.delete(CartEndpoint.CLEAR);
  // }
}
