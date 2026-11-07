import { AuthEndpoint } from "../endpoints/auth.endpoint.js";
import { APIExecutor } from "../../utils/logger/api-executor.js";

export class AuthAPI {
  constructor(request, testInfo) {
    this.api = new APIExecutor(request, testInfo);
  }

  async login(payload) {
    return this.api.execute({
      method: "POST",
      endpoint: AuthEndpoint.LOGIN,
      payload,
    });
  }

  async register(payload) {
    return this.api.execute({
      method: "POST",
      endpoint: AuthEndpoint.REGISTER,
      payload,
    });
  }
}
