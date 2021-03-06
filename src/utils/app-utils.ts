/** Return true if app started in development environment */
export function isDevelopmentEnv(): boolean {
  return process.env.NODE_ENV === "development";
}
