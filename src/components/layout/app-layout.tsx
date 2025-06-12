"use client";

import React from "react";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { SidebarNav } from "./sidebar-nav"; // The navigation links component for the sidebar
import { ThemeToggleButton } from "./theme-toggle-button"; // Button to switch between light/dark mode
import {
  SidebarProvider, // Context provider to manage sidebar state (expanded/collapsed, mobile open/closed)
  Sidebar,
  SidebarHeader,
  SidebarContent, // The main scrollable area for sidebar content (like nav links)
  SidebarFooter,
  SidebarTrigger, // A button (usually a hamburger icon) to toggle the sidebar on mobile
  SidebarInset, // A component that wraps the main content area, adjusting its layout based on the sidebar
} from "@/components/ui/sidebar";

// The AppLayout component receives 'children' which will be the actual page content
export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    // SidebarProvider wraps the entire layout. It manages the state of the sidebar (open, collapsed, mobile view).
    // defaultOpen means the sidebar will be expanded by default on desktop.
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full">
        <Sidebar collapsible="icon" className="border-r">
          {/* SidebarHeader: Contains the logo and app name. */}
          <SidebarHeader className="p-4 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 font-headline text-xl font-semibold text-primary"
            >
              <Icons.logo className="h-7 w-7" />
              {/* The app name span will be hidden when the sidebar is collapsed to icon-only view on desktop */}
              <span className="group-data-[collapsible=icon]:hidden transition-opacity duration-200">
                ByteRoot
              </span>
            </Link>
          </SidebarHeader>

          {/* SidebarContent: This is where the main navigation links go.
              flex-1 makes it take up available vertical space. */}
          <SidebarContent className="flex-1">
            <SidebarNav /> {/* Renders the actual navigation links */}
          </SidebarContent>

          {/* SidebarFooter: A small section at the bottom of the sidebar.
              border-t adds a top border. */}
          <SidebarFooter className="p-4 border-t">
            <p className="text-xs text-muted-foreground text-center group-data-[collapsible=icon]:hidden">
              ByteRoot App
            </p>
          </SidebarFooter>
        </Sidebar>

        {/* SidebarInsert :- This component wraps the main content area when we change the routing with the help of the sidebar. */}

        <SidebarInset className="flex flex-col flex-1">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-6">
            {/* SidebarTrigger: This is typically a hamburger icon button.
                It's shown on mobile (md:hidden) to open/close the sidebar. */}
            <SidebarTrigger className="md:hidden" />

            <div className="flex-1"></div>
            <ThemeToggleButton />
          </header>
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
