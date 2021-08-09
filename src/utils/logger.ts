import winston from "winston";
import { isDevelopmentEnv } from ".";

// List of log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Level max to print
function level(): string {
  return isDevelopmentEnv() ? "debug" : "warn";
}

// Colors used in logs
if (isDevelopmentEnv()) {
  winston.addColors({
    error: "red",
    warn: "yellow",
    info: "white",
    http: "magenta",
    debug: "green",
  });
}

// Print format
const format = winston.format.combine(
  winston.format.timestamp({ format: "DD/MM/YYYY HH:mm:ss:ms" }),
  winston.format.colorize({ level: true }),
  winston.format.printf(
    (info) => `${info.timestamp} [${info.level}]: ${info.message}`
  )
);

// Log destination
const transports = isDevelopmentEnv()
  ? new winston.transports.Console()
  : new winston.transports.File({
      filename: "log/debug.log",
      handleExceptions: true,
    });

// Logger
export const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});
