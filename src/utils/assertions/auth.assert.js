import { expect } from "@playwright/test";
import * as allure from "allure-js-commons";

export class AuthAssertions {
  static async assertLoginSuccess(responseBody, expectedMessage, expectedUser) {
    // Business Response Validation
    await allure.step("Verify Login Success Response", async () => {
      expect(responseBody.success, "Login response should indicate success is true").toBe(true);

      expect(
        responseBody.message,
        `Login response should return expected success message is : ${expectedMessage}`,
      ).toBe(expectedMessage);
    });

    // Response Structure Validation
    await allure.step("Verify Login Response Structure", async () => {
      expect(responseBody.data, "Login data should exist").toBeDefined();

      const requiredFields = ["accessToken", "user"];

      for (const field of requiredFields) {
        expect(
          responseBody.data,
          `Login data response should contain '${field}' field`,
        ).toHaveProperty(field);
      }

      expect(responseBody.data.user, "Login data user should exist").toBeDefined();

      const requiredFieldsUser = ["id", "name", "email"];

      for (const field of requiredFieldsUser) {
        expect(
          responseBody.data.user,
          `Login data for user response should contain '${field}' field`,
        ).toHaveProperty(field);
      }
      // expect(responseBody, "Login response should contain data object").toHaveProperty("data");

      // expect(responseBody.data, "Login data should contain access token").toHaveProperty(
      //   "accessToken",
      // );

      // expect(responseBody.data, "Login data should contain user information").toHaveProperty(
      //   "user",
      // );
    });

    // Access Token Validation
    await allure.step("Verify Generated Access Token", async () => {
      const accessToken = responseBody.data.accessToken;

      expect(accessToken, "Access token should be a non-empty string").toEqual(expect.any(String));

      expect(accessToken.length, "Access token should not be empty").toBeGreaterThan(0);

      expect(
        accessToken.split("."),
        "Access token should follow JWT structure (Header.Payload.Signature)",
      ).toHaveLength(3);
    });

    // User Information Validation
    await allure.step("Verify Authenticated User Information", async () => {
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
    await allure.step("Verify Authenticated Email Matches Login credentials", async () => {
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
