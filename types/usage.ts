export interface ConversionUsage {
  timestamp: number;
  ip: string;
  input: string;
  output: string;
  type: "fusha" | "tunisian";
}

export interface UsageData {
  [ip: string]: ConversionUsage[];
}
