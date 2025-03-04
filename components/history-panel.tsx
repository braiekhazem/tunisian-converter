"use client";

import { Button } from "@/components/ui/button";
import { useHistory } from "@/contexts/history-context";
import { useLanguage } from "@/contexts/language-context";
import { ChevronDown, ChevronUp, Trash2, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export function HistoryPanel() {
  const { history, clearHistory, deleteEntry } = useHistory();
  const { t, language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  if (history.length === 0) {
    return (
      <div className="text-center text-sm text-slate-500 mt-6">
        {t.history.empty}
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-0 h-auto hover:bg-transparent"
        >
          <h2 className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <span className="flex items-center gap-1">
              {t.history.title}
              <Badge variant="secondary" className="ml-2 text-xs">
                {history.length}
              </Badge>
            </span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </h2>
        </Button>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearHistory}
            className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            title={t.history.clearAll}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-3">
          {history.map((entry) => (
            <div
              key={entry.id}
              className="p-3 bg-slate-50 rounded-md text-sm space-y-2 relative group"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteEntry(entry.id)}
                className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                title={t.history.deleteEntry}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="text-slate-600 pr-6">{entry.input}</div>
              <div className="text-right text-lg" dir="rtl">
                {entry.output}
              </div>
              <div className="text-xs text-slate-400 flex justify-between items-center">
                <span>
                  {new Date(entry.timestamp).toLocaleString(
                    language === "ar" ? "ar-TN" : "en-US",
                    {
                      hour: "numeric",
                      minute: "numeric",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  )}
                </span>
                <span>
                  {entry.type === "fusha"
                    ? t.switchLabel.fusha
                    : t.switchLabel.tunisian}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
