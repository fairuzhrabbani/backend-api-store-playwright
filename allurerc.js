import { defineConfig } from "allure";

export default defineConfig({
  name: "Backend API Store - API Automation",
  output: "./allure-report",

  plugins: {
    awesome: {
      options: {
        reportName: "Backend API Store",
        singleFile: true,
        reportLanguage: "en",
      },
    },
  },
});
