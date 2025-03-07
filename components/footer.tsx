"use client";

import { Github, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/language-context";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full py-6 mt-8">
      <div className="container flex flex-col items-center justify-center gap-4 md:gap-2">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="gap-2" asChild>
            <a
              href="https://github.com/braiekhazem/tunisian-converter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
              GitHub
            </a>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            asChild
          >
            <a
              href="https://buymeacoffee.com/hazembraiek"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Heart className="h-5 w-5" />
              {t.footer.support}
            </a>
          </Button>
        </div>
        <p className="text-sm text-slate-500 text-center">
          {t.footer.madeWith}{" "}
          <a
            href="https://github.com/braiekhazem"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline"
          >
            Hazem Braiek
          </a>
        </p>
      </div>
    </footer>
  );
}
