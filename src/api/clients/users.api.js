import { UsersEndpoint } from "../endpoints/users.endpoint";

export class UsersAPI {
  constructor(request) {
    this.request = request;
  }

  async getAll() {
    return this.request.get(UsersEndpoint.LIST);
  }

  async getById(id) {
    return this.request.get(UsersEndpoint.DETAIL(id));
  }

  async delete(id) {
    return this.request.delete(UsersEndpoint.DELETE(id));
  }
}
