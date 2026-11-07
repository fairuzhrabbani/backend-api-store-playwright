import { CategoryEndpoint } from "../endpoints/category.endpoint.js";

export class CategoryAPI {
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
    return this.request.get(CategoryEndpoint.LIST, {
      headers: this.headers,
    });
  }

  async getById(id) {
    return this.request.get(CategoryEndpoint.DETAIL(id), {
      headers: this.headers,
    });
  }

  async create(payload) {
    return this.request.post(CategoryEndpoint.CREATE, {
      headers: this.headers,
      data: payload,
    });
  }

  async update(id, payload) {
    return this.request.put(CategoryEndpoint.UPDATE(id), {
      headers: this.headers,
      data: payload,
    });
  }

  async delete(id) {
    return this.request.delete(CategoryEndpoint.DELETE(id), {
      headers: this.headers,
    });
  }
}
