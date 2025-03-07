import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/language-context";
import { HistoryProvider } from "@/contexts/history-context";
import { Footer } from "@/components/footer";

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
          <HistoryProvider>
            <div className="min-h-screen flex flex-col">
              <main className="flex-1">{children}</main>
            </div>
          </HistoryProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
