import { expect } from "@playwright/test";
import * as allure from "allure-js-commons";
import { Roles } from "../../../src/data/constants/roles.js";

export class RegisterAssertions {
  static async assertRegisterSuccess(responseBody, expectedMessage, expectedUser) {
    // Business Response Validation
    await allure.step("Verify Registration Success Response", async () => {
      expect(responseBody.success, "Registration response should indicate success is true").toBe(
        true,
      );
      expect(
        responseBody.message,
        `Registration response should return expected success message is : ${expectedMessage}`,
      ).toBe(expectedMessage);
    });

    // Response Structure Validation
    await allure.step("Verify registration data structure", async () => {
      expect(responseBody.data, "Registration data should exist").toBeDefined();

      const requiredFields = ["id", "name", "email", "role", "created_at", "updated_at"];

      for (const field of requiredFields) {
        expect(
          responseBody.data,
          `Registration data response should contain '${field}' field`,
        ).toHaveProperty(field);
      }

      // expect(responseBody.data, "Registration data should contain user id").toHaveProperty("id");
      // expect(responseBody.data, "Registration data should contain user name").toHaveProperty(
      //   "name",
      // );
      // expect(responseBody.data, "Registration data should contain user role").toHaveProperty(
      //   "role",
      // );
      // expect(
      //   responseBody.data,
      //   "Registration data should contain created_at timestamp",
      // ).toHaveProperty("created_at");
      // expect(
      //   responseBody.data,
      //   "Registration data should contain updated_at timestamp",
      // ).toHaveProperty("updated_at");

      // expect(responseBody.data.role, "Registration data should have the correct user role").toBe(
      //   Roles.USER,
      // );
    });

    // User Information Validation
    await allure.step("Verify Registration User Information", async () => {
      expect(
        responseBody.data,
        "Registration data should contain valid user information",
      ).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        email: expectedUser.email,
        role: Roles.USER,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      });
    });
  }

  static async assertRegisterFailed(responseBody, expectedMessage) {
    await allure.step("Verify Registration Failure Response", async () => {
      expect(responseBody.success, "Registration failure should indicate failure").toBe(false);
      expect(
        responseBody.message,
        `Registration failure should return expected error message is : ${expectedMessage}`,
      ).toBe(expectedMessage);
    });
  }
}
