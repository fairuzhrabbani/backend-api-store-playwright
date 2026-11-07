import { logger } from "./logger.js";

export class APILogger {
  static sensitiveKeys = new Set([
    "password",
    "token",
    "accesstoken",
    "refreshtoken",
    "authorization",
    "cookie",
    "set-cookie",
    "clientsecret",
    "secret",
  ]);

  static maskSensitiveData(data) {
    if (Array.isArray(data)) {
      return data.map((item) => this.maskSensitiveData(item));
    }

    if (data && typeof data === "object") {
      return Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          key,
          this.sensitiveKeys.has(key.toLowerCase()) ? "[REDACTED]" : this.maskSensitiveData(value),
        ]),
      );
    }

    return data;
  }

  static logExchange({ testCase, request, response, error }) {
    const logData = {
      apiRequest: this.maskSensitiveData(request),
      apiResponse: response ? this.maskSensitiveData(response) : undefined,
      error: error
        ? {
            message: error.message,
          }
        : undefined,
    };

    logger.info(logData, `API EXCHANGE: ${testCase}`);
  }

  static logTestResult({ testCase, status, duration }) {
    const logData = {
      testCase,
      status,
      duration: `${duration} ms`,
    };

    if (status === "passed") {
      logger.info(logData, "TEST PASSED");
    } else if (status === "failed" || status === "timedOut") {
      logger.error(logData, "TEST FAILED");
    } else {
      logger.warn(logData, "TEST RESULT");
    }
  }
}
