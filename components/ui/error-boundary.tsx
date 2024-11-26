"use client";

import { useEffect } from "react";
import { Button } from "./button";

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-4">
      <h2 className="text-xl font-semibold mb-2">Oops! Something went wrong</h2>
      <p className="text-gray-600 mb-4 text-center">
        Don&apos;t worry Farhana, I&apos;ll get this fixed! Try refreshing the
        page.
      </p>
      <Button onClick={reset} variant="outline">
        Try again
      </Button>
    </div>
  );
}
