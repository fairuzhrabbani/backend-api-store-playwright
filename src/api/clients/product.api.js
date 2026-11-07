import { ProductEndpoint } from "../endpoints/product.endpoint.js";

export class ProductAPI {
  constructor(request) {
    this.request = request;
  }

  async getAll() {
    return this.request.get(ProductEndpoint.LIST);
  }

  async getById(id) {
    return this.request.get(ProductEndpoint.DETAIL(id));
  }

  async create(payload) {
    return this.request.post(ProductEndpoint.CREATE, {
      data: payload,
    });
  }

  async update(id, payload) {
    return this.request.put(ProductEndpoint.UPDATE(id), {
      data: payload,
    });
  }

  async delete(id) {
    return this.request.delete(ProductEndpoint.DELETE(id));
  }
}
