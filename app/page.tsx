"use client";

import { Converter } from "@/components/converter";
import { Footer } from "@/components/footer";
import { LanguageSwitch } from "@/components/language-switch";
import { useLanguage } from "@/contexts/language-context";

export default function Home() {
  const { t, language } = useLanguage();

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-slate-100"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-md w-full">
        <div
          className={`flex ${
            language === "ar" ? "justify-start" : "justify-end"
          } mb-4`}
        >
          <LanguageSwitch />
        </div>
        <h1 className="text-3xl font-bold text-center mb-2 text-slate-800">
          {t.title}
        </h1>
        <p className="text-center text-slate-600 mb-6">{t.description}</p>
        <Converter />

        <Footer />
      </div>
    </main>
  );
}
