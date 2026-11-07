import Ajv from "ajv";
import addFormats from "ajv-formats";
import { expect } from "@playwright/test";
import * as allure from "allure-js-commons";

const ajv = new Ajv({
  allErrors: true,
  strict: false,
});

addFormats(ajv);

const schemaCache = new WeakMap();

export const SchemaAssert = async (responseBody, schema, schemaName = "JSON Schema") => {
  await allure.step(`Validate Response Schema: ${schemaName}`, async () => {
    let validate = schemaCache.get(schema);

    if (!validate) {
      validate = ajv.compile(schema);
      schemaCache.set(schema, validate);
    }

    const valid = validate(responseBody);

    if (!valid) {
      const errors = validate.errors ?? [];

      await allure.attachment(
        "AJV Validation Errors",
        JSON.stringify(errors, null, 2),
        "application/json",
      );

      expect(
        valid,
        `Schema validation failed: ${errors
          .map((error) => `${error.instancePath} ${error.message}`)
          .join("; ")}`,
      ).toBe(true);
    }

    expect(valid, `${schemaName} validation passed`).toBe(true);
  });
};
