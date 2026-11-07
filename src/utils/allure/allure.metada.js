import { AllureEpic, AllureFeature, AllureSeverity, AllureTags } from "./allure.constants.js";

export const AllureMetadata = {
  AUTH: {
    epic: AllureEpic.BACKEND_API,
    feature: AllureFeature.AUTHENTICATION,
    owner: "QA Automation Team",
  },

  PRODUCTS: {
    epic: AllureEpic.BACKEND_API,
    feature: AllureFeature.PRODUCTS,
    owner: "QA Automation Team",
  },

  CATEGORIES: {
    epic: AllureEpic.BACKEND_API,
    feature: AllureFeature.CATEGORIES,
    owner: "QA Automation Team",
  },

  USERS: {
    epic: AllureEpic.BACKEND_API,
    feature: AllureFeature.USERS,
    owner: "QA Automation Team",
  },

  AUTHORIZATION: {
    epic: AllureEpic.BACKEND_API,
    feature: AllureFeature.AUTHORIZATION,
    owner: "QA Automation Team",
  },
};

export const AllurePresets = {
  ADMIN_POSITIVE: {
    severity: AllureSeverity.CRITICAL,
    tags: [AllureTags.API, AllureTags.POSITIVE, AllureTags.ADMIN],
  },

  USER_POSITIVE: {
    severity: AllureSeverity.CRITICAL,
    tags: [AllureTags.API, AllureTags.POSITIVE, AllureTags.USER],
  },

  NEGATIVE: {
    severity: AllureSeverity.NORMAL,
    tags: [AllureTags.API, AllureTags.NEGATIVE],
  },

  SECURITY: {
    severity: AllureSeverity.CRITICAL,
    tags: [AllureTags.API, AllureTags.SECURITY, AllureTags.AUTHORIZATION],
  },

  SMOKE: {
    severity: AllureSeverity.BLOCKER,
    tags: [AllureTags.API, AllureTags.SMOKE],
  },
};
