import { APILogger } from "./api-logger.js";

export class APIExecutor {
  constructor(request, testInfo) {
    this.request = request;
    this.testInfo = testInfo;
  }

  async execute({ method, endpoint, payload, options = {} }) {
    const startedAt = Date.now();

    const requestData = {
      method,
      url: endpoint,
      headers: options.headers,
      body: payload,
    };

    try {
      const response = await this.request.fetch(endpoint, {
        ...options,
        ...(payload !== undefined ? { data: payload } : {}),
        method,
      });

      let responseBody;

      try {
        responseBody = await response.json();
      } catch {
        responseBody = await response.text();
      }

      APILogger.logExchange({
        testCase: this.testInfo.title,
        request: requestData,
        response: {
          url: response.url(),
          status: response.status(),
          statusText: response.statusText(),
          duration: Date.now() - startedAt,
          headers: response.headers(),
          body: responseBody,
        },
      });

      return response;
    } catch (error) {
      APILogger.logExchange({
        testCase: this.testInfo.title,
        request: requestData,
        error,
      });

      throw error;
    }
  }
}
