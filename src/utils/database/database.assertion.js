import { expect } from "@playwright/test";
import * as allure from "allure-js-commons";

export class DatabaseAssertions {
  static async assertRecordExists(record) {
    await allure.step("Verify database record existence", async () => {
      expect(record, "Database record should exist").not.toBeNull();
    });
  }

  static async assertRecordNotExists(record) {
    await allure.step("Verify database record non-existence", async () => {
      expect(record, "Database record should not exist").toBeNull();
    });
  }

  static async assertFieldValue(record, field, expectedValue) {
    await allure.step("Verify database record field value", async () => {
      expect(
        record[field],
        `Database record field '${field}' should have the expected value '${expectedValue}'`,
      ).toBe(expectedValue);
    });
  }

  static async expectNumber(record, field, expectedValue) {
    expect(
      Number(record[field]),
      `Database record field '${field}' should have the expected value '${expectedValue}'`,
    ).toBe(expectedValue);
  }

  static async assertRecordCount(records, expectedCount) {
    await allure.step("Verify database records count", async () => {
      expect(records, "Database records count should match the expected count").toHaveLength(
        expectedCount,
      );
    });
  }

  static async assertFieldNotEmpty(record, field) {
    await allure.step("Verify database record field is not empty", async () => {
      expect(record[field], `Database record field '${field}' should not be empty`).toBeTruthy();
    });
  }
}
