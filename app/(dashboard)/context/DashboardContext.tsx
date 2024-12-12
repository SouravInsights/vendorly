/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useAuth } from "@clerk/nextjs";

interface DashboardContextType {
  stats: any;
  isLoading: boolean;
  refreshData: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const { getToken } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStats = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = await getToken();
      const timestamp = new Date().getTime();

      const response = await fetch(`/api/stats?t=${timestamp}`, {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized access");
        }
        throw new Error("Failed to fetch stats");
      }

      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
      // You might want to handle different types of errors differently
      if ((error as Error).message === "Unauthorized access") {
        // Handle auth error specifically
        setStats(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, [getToken]);

  // Initial fetch
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const refreshData = useCallback(async () => {
    await fetchStats();
  }, [fetchStats]);

  return (
    <DashboardContext.Provider value={{ stats, isLoading, refreshData }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error(
      "useDashboardContext must be used within a DashboardProvider"
    );
  }
  return context;
}
