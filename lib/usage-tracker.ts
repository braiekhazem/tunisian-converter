import fs from "fs/promises";
import path from "path";
import { ConversionUsage, UsageData } from "@/types/usage";

const USAGE_FILE = path.join(process.cwd(), "data/usage.json");

export class UsageTracker {
  private static cache: Map<string, string> = new Map();

  static async trackUsage(usage: ConversionUsage): Promise<void> {
    try {
      let data: UsageData = {};

      try {
        const fileContent = await fs.readFile(USAGE_FILE, "utf-8");
        data = JSON.parse(fileContent);
      } catch (error) {
        // File doesn't exist or is invalid, use empty object
      }

      if (!data[usage.ip]) {
        data[usage.ip] = [];
      }

      data[usage.ip].push(usage);

      await fs.mkdir(path.dirname(USAGE_FILE), { recursive: true });
      await fs.writeFile(USAGE_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error tracking usage:", error);
    }
  }

  static async getUsageData(): Promise<UsageData> {
    try {
      const fileContent = await fs.readFile(USAGE_FILE, "utf-8");
      return JSON.parse(fileContent);
    } catch (error) {
      return {};
    }
  }

  static getCachedResult(
    input: string,
    type: "fusha" | "tunisian"
  ): string | null {
    const key = `${input}-${type}`;
    return this.cache.get(key) || null;
  }

  static cacheResult(
    input: string,
    output: string,
    type: "fusha" | "tunisian"
  ): void {
    const key = `${input}-${type}`;
    this.cache.set(key, output);

    // Keep cache size reasonable (max 1000 entries)
    if (this.cache.size > 1000) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }
  }
}
