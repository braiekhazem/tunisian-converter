"use client";

import { createContext, useContext, useState, useEffect } from "react";

export interface ConversionEntry {
  id: string;
  input: string;
  output: string;
  timestamp: number;
  type: "fusha" | "tunisian";
}

interface HistoryContextType {
  history: ConversionEntry[];
  addEntry: (entry: Omit<ConversionEntry, "id" | "timestamp">) => void;
  clearHistory: () => void;
  deleteEntry: (id: string) => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

const STORAGE_KEY = "conversion-history";

function getStoredHistory(): ConversionEntry[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to parse history from localStorage");
    return [];
  }
}

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [history, setHistory] = useState<ConversionEntry[]>([]);

  // Handle hydration
  useEffect(() => {
    setIsClient(true);
    setHistory(getStoredHistory());
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (isClient) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }
  }, [history, isClient]);

  const addEntry = (entry: Omit<ConversionEntry, "id" | "timestamp">) => {
    const newEntry: ConversionEntry = {
      ...entry,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
    };
    setHistory((prev) => [newEntry, ...prev].slice(0, 10)); // Keep last 10 entries
  };

  const deleteEntry = (id: string) => {
    setHistory((prev) => prev.filter((entry) => entry.id !== id));
  };

  const clearHistory = () => setHistory([]);

  return (
    <HistoryContext.Provider
      value={{ history, addEntry, clearHistory, deleteEntry }}
    >
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error("useHistory must be used within a HistoryProvider");
  }
  return context;
}
