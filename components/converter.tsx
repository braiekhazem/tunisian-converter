"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { convertToArabic } from "@/lib/convert";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/language-context";

export function Converter() {
  const { t, language } = useLanguage();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toFusha, setToFusha] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    setIsLoading(true);
    setError(null);
    setOutput("");

    try {
      const result = await convertToArabic(input, toFusha);
      setOutput(result);
    } catch (err) {
      setError(t.errors.generic);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg" dir={language === "ar" ? "rtl" : "ltr"}>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="latin-input"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              {t.latinInput.label}
            </label>
            <Textarea
              id="latin-input"
              placeholder={t.latinInput.placeholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-24"
              dir="ltr"
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="fusha-mode"
              checked={toFusha}
              onCheckedChange={setToFusha}
            />
            <Label htmlFor="fusha-mode">
              {toFusha ? t.switchLabel.fusha : t.switchLabel.tunisian}
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t.button.converting}
              </>
            ) : (
              t.button.convert
            )}
          </Button>

          {error && (
            <Alert
              variant="destructive"
              className="bg-red-50 text-red-800 border-red-200"
            >
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {output && (
            <div>
              <label
                htmlFor="arabic-output"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                {toFusha ? t.output.fusha : t.output.tunisian}
              </label>
              <div
                id="arabic-output"
                className="p-3 bg-slate-50 border rounded-md min-h-24 text-right text-xl"
                dir="rtl"
              >
                {output}
              </div>
            </div>
          )}

          <div className="text-xs text-slate-500 mt-4">
            <p>{t.examples.title}</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <span className="font-medium">3aslema</span> → عسلامة / السلام
                عليكم ({t.examples.hello})
              </li>
              <li>
                <span className="font-medium">chneya 7alek?</span> → شنية حالك؟
                / كيف حالك؟ ({t.examples.howAreYou})
              </li>
              <li>
                <span className="font-medium">taw nemchi lel dar</span> → توا
                نمشي للدار / سأذهب إلى المنزل الآن ({t.examples.goingHome})
              </li>
            </ul>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
