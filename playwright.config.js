import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";
import path from "node:path";

const environment = process.env.TEST_ENV || "sit";

dotenv.config({
  path: path.resolve(`config/environments/.${environment}.env`),
});

export default defineConfig({
  testDir: "./tests",

  testMatch: "**/*.spec.js",

  fullyParallel: true,

  forbidOnly: Boolean(process.env.CI),

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 2 : undefined,

  timeout: 30000,

  expect: {
    timeout: 5000,
  },

  reporter: [
    ["list"],

    [
      "html",
      {
        outputFolder: "playwright-report",
        open: "never",
      },
    ],

    [
      "allure-playwright",
      {
        resultsDir: "allure-results",
        detail: true,
        suiteTitle: false,

        environmentInfo: {
          project: "Backend API Store",
          framework: "Playwright",
          testType: "API Automation",
          environment: environment,
          // nodeVersion: process.version,
        },

        globalLabels: {
          layer: "API Automation",
          team: "QA Automation",
        },
      },
    ],
  ],

  use: {
    baseURL: process.env.BASE_URL,

    extraHTTPHeaders: {
      Accept: "application/json",
    },

    trace: "retain-on-failure",
  },
});
