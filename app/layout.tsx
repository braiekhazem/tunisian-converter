import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/language-context";
import { HistoryProvider } from "@/contexts/history-context";

export const metadata: Metadata = {
  title: "Tunisian Arabic Converter",
  description: "Convert Tunisian Arabic text between Latin and Arabic scripts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <HistoryProvider>{children}</HistoryProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
