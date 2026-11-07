import { logger } from "./logger.js";

export class TestLogger {
  static start(testInfo) {
    logger.info(
      {
        testTitle: testInfo.title,
        testFile: testInfo.file,
        testId: testInfo.testId,
        retry: testInfo.retry,
        workerIndex: testInfo.workerIndex,
      },
      "TEST STARTED",
    );
  }

  static passed(testInfo) {
    logger.info(
      {
        testTitle: testInfo.title,
        testFile: testInfo.file,
        duration: testInfo.duration,
      },
      "TEST PASSED",
    );
  }

  static failed(testInfo, error) {
    logger.error(
      {
        testTitle: testInfo.title,
        testFile: testInfo.file,
        duration: testInfo.duration,
        error: error?.message,
      },
      "TEST FAILED",
    );
  }
}
