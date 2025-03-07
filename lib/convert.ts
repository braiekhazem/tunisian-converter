import { getClientIp } from "./client-ip";

export async function convertToArabic(
  latinText: string,
  toFusha: boolean
): Promise<string> {
  try {
    const response = await fetch("/api/convert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        latinText,
        toFusha,
        clientIp: await getClientIp(),
      }),
    });

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to convert text");
      }
      return data.arabicText;
    } else {
      // If it's not JSON, it's likely an HTML error page
      const text = await response.text();
      console.error("Received non-JSON response:", text.slice(0, 200)); // Log the first 200 characters
      throw new Error(
        `Received non-JSON response. Status: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Error converting text:", error);
    throw new Error(
      `Conversion error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
