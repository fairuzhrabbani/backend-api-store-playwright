import { expect } from "@playwright/test";
import * as allure from "allure-js-commons";

export class ProductAssertions {
  static async assertCreateProductSuccess(responseBody, expectedMessage, expectedProduct) {
    // Business Response Validation
    await allure.step("Verify Product Success Response", async () => {
      expect(responseBody.success, "Product response should indicate success is true").toBe(true);

      expect(
        responseBody.message,
        `Product response should return expected success message is : ${expectedMessage}`,
      ).toBe(expectedMessage);
    });

    // Response Structure Validation
    await allure.step("Verify Product Response Structure", async () => {
      expect(responseBody.data, "Product data should exist").toBeDefined();

      const requiredFields = [
        "id",
        "name",
        "description",
        "price",
        "stock",
        "category_id",
        "created_at",
        "updated_at",
      ];

      for (const field of requiredFields) {
        expect(
          responseBody.data,
          `Product response should contain '${field}' field`,
        ).toHaveProperty(field);
      }
    });

    // Product Information Validation
    await allure.step("Verify Product Information", async () => {
      const actualProduct = responseBody.data;

      expect(actualProduct.id, "Product ID should be a number").toEqual(expect.any(Number));

      expect(actualProduct.name, "Product name should match").toBe(expectedProduct.name);

      expect(actualProduct.description, "Product description should match").toBe(
        expectedProduct.description,
      );

      expect(Number(actualProduct.price), "Product price should match expected price").toBe(
        expectedProduct.price,
      );

      expect(actualProduct.stock, "Product stock should match").toBe(expectedProduct.stock);

      expect(actualProduct.category_id, "Product category ID should match").toBe(
        expectedProduct.categoryId,
      );

      expect(actualProduct.created_at, "Product created_at should be a valid date").toEqual(
        expect.any(String),
      );

      expect(actualProduct.updated_at, "Product updated_at should be a valid date").toEqual(
        expect.any(String),
      );
    });
  }

  static async assertCreateProductFailed(responseBody, expectedMessage) {
    await allure.step("Verify Product failure response", async () => {
      expect(responseBody.success, "Product failure should indicate failure").toBe(false);
      expect(
        responseBody.message,
        `Product failure should return the expected error message ${expectedMessage}`,
      ).toBe(expectedMessage);
    });
  }

  static async assertGetAllProductSuccess(responseBody) {
    await allure.step("Validate Get All Categories Response Data", async () => {
      expect(responseBody.success, "Product response should indicate success").toBe(true);
      expect(responseBody.data, "Product data should be an array").toBeInstanceOf(Array);
      expect(responseBody.data.length, "Product data should not be empty").toBeGreaterThan(0);

      for (const Product of responseBody.data) {
        expect(Product.id, "Product ID should be a positive number").toBeGreaterThan(0);
        expect(Product.name, "Product name should not be empty").not.toBe("");
        expect(Product.description, "Product description should not be empty").not.toBe("");
      }
    });
  }

  static async assertGetOneProductSuccess(responseBody, expectedUser) {
    await allure.step("Validate Get One Product Success Response Data", async () => {
      expect(responseBody.success, "Product response should indicate success").toBe(true);
      expect(responseBody.data, "Product data should contain id").toHaveProperty("id");
      expect(responseBody.data, "Product data should contain name").toHaveProperty("name");
      expect(responseBody.data, "Product data should contain description").toHaveProperty(
        "description",
      );
    });

    await allure.step("Verify Product information", async () => {
      expect(responseBody.data, "Product data should contain valid information").toMatchObject({
        id: expectedUser.id,
        name: expectedUser.name,
        description: expectedUser.description,
        price: expectedUser.price,
        stock: expectedUser.stock,
        category_id: expectedUser.category_id,
        category_name: expectedUser.category_name,
        created_at: expectedUser.created_at,
        updated_at: expectedUser.updated_at,
      });
    });
  }

  static async assertGetOneProductFailed(responseBody, expectedMessage) {
    await allure.step("Verify Get One Product Failure Response Data", async () => {
      expect(responseBody.success, "Product failure should indicate failure").toBe(false);
      expect(
        responseBody.message,
        `Product failure should return the expected error message ${expectedMessage}`,
      ).toBe(expectedMessage);
    });
  }

  static async assertUpdateProductSuccess(responseBody, expectedMessage, expectedUser) {
    await allure.step("Verify Update Product Success Response Data", async () => {
      expect(responseBody.success, "Update Product response should indicate success").toBe(true);
      expect(
        responseBody.message,
        `Update Product response should return the expected success message: ${expectedMessage}`,
      ).toBe(expectedMessage);
    });
    await allure.step("Verify Update Product data structure", async () => {
      expect(responseBody.success).toBe(true);
      expect(responseBody.data, "Product data should contain id").toHaveProperty("id");
      expect(responseBody.data, "Product data should contain name").toHaveProperty("name");
      expect(responseBody.data, "Product data should contain description").toHaveProperty(
        "description",
      );
    });
    await allure.step("Verify Update Product information", async () => {
      expect(
        responseBody.data,
        "Update Product data should contain valid information",
      ).toMatchObject({
        id: expect.any(Number),
        name: expectedUser.name,
        description: expectedUser.description,
      });
    });
  }

  static async assertUpdateProductFailed(responseBody, expectedMessage) {
    await allure.step("Verify Update Product Failure Response Data", async () => {
      expect(responseBody.success, "Update Product failure should indicate failure").toBe(false);
      expect(
        responseBody.message,
        `Update Product failure should return the expected error message ${expectedMessage}`,
      ).toBe(expectedMessage);
    });
  }

  static async assertDeleteProductSuccess(responseBody, expectedMessage) {
    await allure.step("Verify Delete Product Success Response Data", async () => {
      expect(responseBody.success, "Delete Product response should indicate success").toBe(true);
      expect(
        responseBody.message,
        `Delete Product response should return the expected success message: ${expectedMessage}`,
      ).toBe(expectedMessage);
    });
    await allure.step("Verify Delete Product data structure", async () => {
      expect(responseBody.success).toBe(true);
      expect(responseBody.data, "Product data should contain id").toHaveProperty("id");
      expect(responseBody.data, "Product data should contain name").toHaveProperty("name");
      expect(responseBody.data, "Product data should contain description").toHaveProperty(
        "description",
      );
    });
  }

  static async assertDeleteProductFailed(responseBody, expectedMessage) {
    await allure.step("Verify Delete Product Failure Response Data", async () => {
      expect(responseBody.success, "Delete Product failure should indicate failure").toBe(false);
      expect(
        responseBody.message,
        `Delete Product failure should return the expected error message ${expectedMessage}`,
      ).toBe(expectedMessage);
    });
  }
}
