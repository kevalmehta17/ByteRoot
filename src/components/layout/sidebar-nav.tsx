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
  { href: "/dashboard/chatbot", label: "AI Chatbot", icon: "chatbot" },
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
  {
    href: "/dashboard/symptom-checker",
    label: "Symptom Checker",
    icon: "symptomChecker",
  },
  { href: "/dashboard/hospitals", label: "Hospitals", icon: "hospitals" },
  {
    href: "/dashboard/appointments",
    label: "Appointments",
    icon: "appointments",
  },
  {
    href: "/dashboard/hospital-panel",
    label: "Hospital Panel",
    icon: "records",
  },
  {
    href: "/emergency",
    label: "Emergency SOS",
    icon: "emergency",
    isEmergency: true,
  },
];

export function SidebarNav() {
  const pathname = usePathname();
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
          "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out", // Added group for icon hover
          item.isEmergency
            ? "bg-destructive/10 text-destructive hover:bg-destructive/20 dark:hover:bg-destructive/30 hover:shadow-md"
            : isActive
            ? "bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:opacity-90 shadow-lg"
            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-sm",
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
