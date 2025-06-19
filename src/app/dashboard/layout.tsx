import { AppLayout } from "@/components/layout/app-layout";
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AppLayout>
      <div className="dark:bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] dark:from-primary/10 dark:via-background/80 dark:to-background">
        {children}
      </div>
    </AppLayout>
  );
}
