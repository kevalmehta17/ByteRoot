"use client";
// AppProvider is
import type * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark" // Changed from "system" to "dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
