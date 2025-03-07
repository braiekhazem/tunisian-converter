import { UsageTracker } from "./usage-tracker";
import { basicAuthMiddleware } from "./auth-middleware";

export async function getProtectedUsageData(
  username: string,
  password: string
) {
  if (!basicAuthMiddleware(username, password)) {
    throw new Error("Unauthorized");
  }

  return await UsageTracker.getUsageData();
}
