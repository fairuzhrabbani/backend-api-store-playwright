import { expect } from "@playwright/test";
import * as allure from "allure-js-commons";

export class AuthAssertions {
  static async assertLoginSuccess(responseBody, expectedMessage, expectedUser) {
    // Business Response Validation
    await allure.step("Verify login business response", async () => {
      expect(
        responseBody.success,
        "Login response should indicate successful authentication is true",
      ).toBe(true);

      expect(
        responseBody.message,
        `Login response should return the expected success message: ${expectedMessage}`,
      ).toBe(expectedMessage);
    });

    // Response Structure Validation
    await allure.step("Verify login response structure", async () => {
      expect(responseBody, "Login response should contain data object").toHaveProperty("data");

      expect(responseBody.data, "Login data should contain access token").toHaveProperty(
        "accessToken",
      );

      expect(responseBody.data, "Login data should contain user information").toHaveProperty(
        "user",
      );
    });

    // Access Token Validation
    await allure.step("Verify generated access token", async () => {
      const accessToken = responseBody.data.accessToken;

      expect(accessToken, "Access token should be a non-empty string").toEqual(expect.any(String));

      expect(accessToken.length, "Access token should not be empty").toBeGreaterThan(0);

      expect(
        accessToken.split("."),
        "Access token should follow JWT structure (Header.Payload.Signature)",
      ).toHaveLength(3);
    });

    // User Information Validation
    await allure.step("Verify authenticated user information", async () => {
      expect(
        responseBody.data.user,
        "Authenticated user should contain valid user information",
      ).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        email: expectedUser.email,
      });
    });

    // Email Consistency Validation
    await allure.step("Verify authenticated email matches login credentials", async () => {
      expect(
        responseBody.data.user.email,
        "Returned email should match the email used for login",
      ).toBe(expectedUser.email);
    });
  }

  static async assertLoginFailed(responseBody, expectedMessage) {
    await allure.step("Verify login failure business response", async () => {
      expect(responseBody.success, "Login failure should indicate authentication is false").toBe(
        false,
      );
      expect(
        responseBody.message,
        `Login failure response should return the expected error message: ${expectedMessage}`,
      ).toBe(expectedMessage);
    });

    await allure.step("Verify failed login does not return authentication data", async () => {
      expect(
        responseBody,
        "Login failure response should not contain data property",
      ).not.toHaveProperty("data");
      expect(
        responseBody,
        "Login failure response should not contain access token",
      ).not.toHaveProperty("accessToken");
      expect(
        responseBody,
        "Login failure response should not contain user information",
      ).not.toHaveProperty("user");
    });
  }
}
