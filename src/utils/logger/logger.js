import pino from "pino";
import fs from "node:fs";
import path from "node:path";

const logDirectory = path.resolve("logs");

fs.mkdirSync(logDirectory, { recursive: true });

const logger = pino({
  level: "info",
  timestamp: pino.stdTimeFunctions.isoTime,
  base: {
    service: "backend-api-store-automation",
    environment: process.env.TEST_ENV || "sit",
  },
  transport: {
    targets: [
      {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      },
      {
        target: "pino-pretty",
        options: {
          destination: path.join(logDirectory, "test.log"),
          colorize: false,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
          mkdir: true,
        },
      },
    ],
  },
});

export { logger };
