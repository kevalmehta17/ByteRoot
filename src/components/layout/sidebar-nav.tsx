"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icons, type IconKey } from "@/components/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebar } from "@/components/ui/sidebar";

interface NavItem {
  href: string;
  label: string;
  icon: IconKey;
  disabled?: boolean;
  isEmergency?: boolean;
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: "home" },
  {
    href: "/dashboard/image-diagnosis",
    label: "Image Diagnosis",
    icon: "imageDiagnosis",
  },
  {
    href: "/dashboard/symptom-checker",
    label: "Symptom Checker",
    icon: "symptomChecker",
  },
  {
    href: "/dashboard/report-simplifier",
    label: "Report Simplifier",
    icon: "reportSimplifier",
  },
  {
    href: "/dashboard/drug-interaction-checker",
    label: "Drug Interactions",
    icon: "tablet",
  },
  { href: "/dashboard/hospitals", label: "Hospitals", icon: "hospitals" },
  {
    href: "/dashboard/appointments",
    label: "Appointments",
    icon: "appointments",
  },
  {
    href: "/emergency",
    label: "Emergency SOS",
    icon: "emergency",
    isEmergency: true,
  },
];

export function SidebarNav() {
  // Use usePathname from next/navigation to get the current path
  const pathname = usePathname();
  // useSidebar is a custom hook that provides the current state of the sidebar (expanded/collapsed) and whether it's in mobile view
  const { state: sidebarState, isMobile } = useSidebar() || {
    state: "expanded",
    isMobile: false,
  };

  return (
    <nav className="flex flex-col gap-1 px-2 py-4">
      {navItems.map((item) => {
        const Icon = Icons[item.icon];
        const isActive =
          pathname === item.href ||
          (item.href !== "/dashboard" &&
            item.href !== "/emergency" &&
            pathname.startsWith(item.href));

        const linkContent = (
          <>
            <Icon className="h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out group-hover:scale-110" />
            <span
              className={cn(
                "truncate transition-opacity duration-200",
                sidebarState === "collapsed" && !isMobile
                  ? "opacity-0 w-0"
                  : "opacity-100 w-auto"
              )}
            >
              {item.label}
            </span>
          </>
        );

        const linkClasses = cn(
          // 1. Base styles for every link
          "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out", // Added group for icon hover
          // 2. If it's an emergency item (like "SOS"), apply danger styling
          item.isEmergency
            ? "bg-destructive/10 text-destructive hover:bg-destructive/20 dark:hover:bg-destructive/30 hover:shadow-md"
            : // 3. Else if it's the currently active page, highlight it
            isActive
            ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
            : // 4. Else, use default sidebar styling
              "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-sm",
          // 5. If item is disabled, make it dim and unclickable
          item.disabled && "cursor-not-allowed opacity-50"
        );

        if (sidebarState === "collapsed" && !isMobile) {
          return (
            <Tooltip key={item.href} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={item.disabled ? "#" : item.href}
                  className={linkClasses}
                  aria-disabled={item.disabled}
                  tabIndex={item.disabled ? -1 : undefined}
                >
                  {linkContent}
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-popover text-popover-foreground border"
              >
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.disabled ? "#" : item.href}
            className={linkClasses}
            aria-disabled={item.disabled}
            tabIndex={item.disabled ? -1 : undefined}
          >
            {linkContent}
          </Link>
        );
      })}
    </nav>
  );
}
