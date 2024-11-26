"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

interface Stats {
  totalMeetings: number;
  totalDesigns: number;
  uniqueLocations: number;
  uniqueVendors: number;
  shortlistedDesigns: number;
  recentAchievements?: Array<{
    id: number;
    title: string;
    description: string;
    date: string;
  }>;
}

interface AppContextType {
  stats: Stats | null;
  isLoading: boolean;
  refreshData: () => Promise<void>;
  error: string | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/stats", {
        // Add cache busting to prevent stale data
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch stats");
      }

      const data = await response.json();

      if (data.success) {
        setStats(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch stats");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching stats:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const refreshData = useCallback(async () => {
    await fetchStats();
  }, [fetchStats]);

  return (
    <AppContext.Provider value={{ stats, isLoading, error, refreshData }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
