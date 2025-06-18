"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useState, useEffect } from "react";

export function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder or null until the component is mounted
    // to avoid hydration mismatch, as theme is resolved on client.
    return <div className="h-8 w-8" />; // Placeholder with same size as button
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label={
        theme === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
    >
      {theme === "light" ? (
        <Icons.moon className="h-5 w-5" />
      ) : (
        <Icons.sun className="h-5 w-5" />
      )}
    </Button>
  );
}
