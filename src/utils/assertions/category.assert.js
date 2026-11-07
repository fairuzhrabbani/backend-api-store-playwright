import { expect } from "@playwright/test";
import * as allure from "allure-js-commons";

export class CategoryAssertions {
  static async assertCreateCategorySuccess(responseBody, expectedMessage, expectedUser) {
    // Business Response Validation
    await allure.step("Verify category success response", async () => {
      expect(responseBody.success, "Category response should indicate success").toBe(true);
      expect(
        responseBody.message,
        `Category response should return the expected success message: ${expectedMessage}`,
      ).toBe(expectedMessage);
    });

    // Response Structure Validation
    await allure.step("Verify category data structure", async () => {
      expect(responseBody.data, "Category data should contain user id").toHaveProperty("id");
      expect(responseBody.data, "Category data should contain user name").toHaveProperty("name");
      expect(responseBody.data, "Category data should contain user description").toHaveProperty(
        "description",
      );
    });

    // User Information Validation
    await allure.step("Verify category information", async () => {
      expect(responseBody.data, "Category data should contain valid information").toMatchObject({
        id: expect.any(Number),
        name: expectedUser.name,
        description: expectedUser.description,
      });
    });
  }

  static async assertCreateCategoryFailed(responseBody, expectedMessage) {
    await allure.step("Verify category failure response", async () => {
      expect(responseBody.success, "Category failure should indicate failure").toBe(false);
      expect(
        responseBody.message,
        `Category failure should return the expected error message ${expectedMessage}`,
      ).toBe(expectedMessage);
    });
  }

  static async assertGetAllCategorySuccess(responseBody) {
    await allure.step("Validate Get All Categories Response Data", async () => {
      expect(responseBody.success, "Category response should indicate success").toBe(true);
      expect(responseBody.data, "Category data should be an array").toBeInstanceOf(Array);
      expect(responseBody.data.length, "Category data should not be empty").toBeGreaterThan(0);

      for (const category of responseBody.data) {
        expect(category.id, "Category ID should be a positive number").toBeGreaterThan(0);
        expect(category.name, "Category name should not be empty").not.toBe("");
        expect(category.description, "Category description should not be empty").not.toBe("");
      }
    });
  }

  static async assertGetOneCategorySuccess(responseBody, expectedUser) {
    await allure.step("Validate Get One Category Success Response Data", async () => {
      expect(responseBody.success, "Category response should indicate success").toBe(true);
      expect(responseBody.data, "Category data should contain id").toHaveProperty("id");
      expect(responseBody.data, "Category data should contain name").toHaveProperty("name");
      expect(responseBody.data, "Category data should contain description").toHaveProperty(
        "description",
      );
    });

    await allure.step("Verify category information", async () => {
      expect(responseBody.data, "Category data should contain valid information").toMatchObject({
        id: expectedUser.id,
        name: expectedUser.name,
        description: expectedUser.description,
      });
    });
  }

  static async assertGetOneCategoryFailed(responseBody, expectedMessage) {
    await allure.step("Verify Get One Category Failure Response Data", async () => {
      expect(responseBody.success, "Category failure should indicate failure").toBe(false);
      expect(
        responseBody.message,
        `Category failure should return the expected error message ${expectedMessage}`,
      ).toBe(expectedMessage);
    });
  }

  static async assertUpdateCategorySuccess(responseBody, expectedMessage, expectedUser) {
    await allure.step("Verify Update Category Success Response Data", async () => {
      expect(responseBody.success, "Update Category response should indicate success").toBe(true);
      expect(
        responseBody.message,
        `Update Category response should return the expected success message: ${expectedMessage}`,
      ).toBe(expectedMessage);
    });
    await allure.step("Verify Update Category data structure", async () => {
      expect(responseBody.success).toBe(true);
      expect(responseBody.data, "Category data should contain id").toHaveProperty("id");
      expect(responseBody.data, "Category data should contain name").toHaveProperty("name");
      expect(responseBody.data, "Category data should contain description").toHaveProperty(
        "description",
      );
    });
    await allure.step("Verify Update Category information", async () => {
      expect(
        responseBody.data,
        "Update Category data should contain valid information",
      ).toMatchObject({
        id: expect.any(Number),
        name: expectedUser.name,
        description: expectedUser.description,
      });
    });
  }

  static async assertUpdateCategoryFailed(responseBody, expectedMessage) {
    await allure.step("Verify Update Category Failure Response Data", async () => {
      expect(responseBody.success, "Update Category failure should indicate failure").toBe(false);
      expect(
        responseBody.message,
        `Update Category failure should return the expected error message ${expectedMessage}`,
      ).toBe(expectedMessage);
    });
  }

  static async assertDeleteCategorySuccess(responseBody, expectedMessage) {
    await allure.step("Verify Delete Category Success Response Data", async () => {
      expect(responseBody.success, "Delete Category response should indicate success").toBe(true);
      expect(
        responseBody.message,
        `Delete Category response should return the expected success message: ${expectedMessage}`,
      ).toBe(expectedMessage);
    });
    await allure.step("Verify Delete Category data structure", async () => {
      expect(responseBody.success).toBe(true);
      expect(responseBody.data, "Category data should contain id").toHaveProperty("id");
      expect(responseBody.data, "Category data should contain name").toHaveProperty("name");
      expect(responseBody.data, "Category data should contain description").toHaveProperty(
        "description",
      );
    });
  }

  static async assertDeleteCategoryFailed(responseBody, expectedMessage) {
    await allure.step("Verify Delete Category Failure Response Data", async () => {
      expect(responseBody.success, "Delete Category failure should indicate failure").toBe(false);
      expect(
        responseBody.message,
        `Delete Category failure should return the expected error message ${expectedMessage}`,
      ).toBe(expectedMessage);
    });
  }
}
