import { ProductEndpoint } from "../endpoints/product.endpoint.js";

export class ProductAPI {
  constructor(request, token) {
    this.request = request;
    this.token = token;
  }

  get headers() {
    return {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };
  }

  async getAll() {
    return this.request.get(ProductEndpoint.LIST, {
      headers: this.headers,
    });
  }

  async getById(id) {
    return this.request.get(ProductEndpoint.DETAIL(id), {
      headers: this.headers,
    });
  }

  async create(payload) {
    return this.request.post(ProductEndpoint.CREATE, {
      headers: this.headers,
      data: payload,
    });
  }

  async update(id, payload) {
    return this.request.put(ProductEndpoint.UPDATE(id), {
      headers: this.headers,
      data: payload,
    });
  }

  async delete(id) {
    return this.request.delete(ProductEndpoint.DELETE(id), {
      headers: this.headers,
    });
  }
}
