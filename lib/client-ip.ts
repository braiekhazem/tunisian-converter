let cachedClientIp: string | null = null;

export async function getClientIp(): Promise<string> {
  if (cachedClientIp) {
    return cachedClientIp;
  }

  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    cachedClientIp = data.ip;
    return data.ip;
  } catch (error) {
    console.error("Error fetching client IP:", error);
    return "unknown";
  }
}
