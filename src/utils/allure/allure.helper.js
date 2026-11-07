import * as allure from "allure-js-commons";

export class AllureHelper {
  /**
   * Apply reusable Allure metadata.
   */
  static async metadata({
    id,
    epic,
    feature,
    story,
    severity = "normal",
    owner = "QA Automation Team",
    tags = [],
    description,
    links = [],
  }) {
    if (epic) await allure.epic(epic);
    if (feature) await allure.feature(feature);
    if (story) await allure.story(story);

    if (severity) await allure.severity(severity);
    if (owner) await allure.owner(owner);

    if (id) await allure.label("ALLURE_ID", id);
    if (description) await allure.description(description);

    for (const tag of tags) {
      await allure.tag(tag);
    }

    for (const link of links) {
      await allure.link(link.url, link.name, link.type);
    }
  }

  /**
   * Reusable Allure step.
   */
  static async step(name, callback) {
    return allure.step(name, callback);
  }

  /**
   * Add custom parameters to Allure report.
   */
  static async parameter(name, value) {
    await allure.parameter(name, String(value));
  }

  /**
   * Attach JSON data to Allure report.
   */
  static async attachJSON(name, data) {
    await allure.attachment(name, JSON.stringify(data, null, 2), "application/json");
  }

  static async attachText(name, data) {
    await allure.attachment(name, String(data), "text/plain");
  }

  static async attachRequest(payload) {
    await this.attachJSON("Request Payload", payload);
  }

  static async attachResponseHeaders(responseHeaders) {
    await this.attachJSON("Response Headers", responseHeaders);
  }

  static async attachResponseHTTPStatusCode(httpStatusCode) {
    await this.attachJSON("Response HTTP Status Code", { status: httpStatusCode });
  }

  static async attachResponseBody(responseBody) {
    await this.attachJSON("Response Body", responseBody);
  }

  static async attachDatabase(data) {
    await this.attachJSON("Database Result", data);
  }

  /**
   * Add Jira issue link.
   */
  static async jira(issueId, baseUrl) {
    await allure.link(`${baseUrl}/browse/${issueId}`, issueId, "issue");
  }

  static async databaseStep(name, callback) {
    return allure.step(`Database: ${name}`, callback);
  }

  static async attachDatabaseResult(name, data) {
    await allure.attachment(name, JSON.stringify(data, null, 2), "application/json");
  }
}
