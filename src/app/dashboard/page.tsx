"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons, type IconKey } from "@/components/icons";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import React from "react";

const quickActions = [
  {
    label: "Book Appointment",
    href: "/dashboard/hospitals",
    icon: Icons.appointments,
  },
  {
    label: "Drug Interactions",
    href: "/dashboard/drug-interaction-checker",
    icon: Icons.tablet,
  },
  {
    label: "Check Symptoms",
    href: "/dashboard/symptom-checker",
    icon: Icons.symptomChecker,
  },
  {
    label: "Simplify Report",
    href: "/dashboard/report-simplifier",
    icon: Icons.reportSimplifier,
  },
];

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: IconKey;
  read?: boolean;
  isNew?: boolean; // Added for new pulse animation
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Appointment Reminder",
    description: "Your appointment with Dr. Smith is tomorrow at 10:00 AM.",
    time: "1h ago",
    icon: "appointments",
    read: false,
    isNew: true,
  },
  {
    id: "3",
    title: "Medication Refill",
    description: "Your prescription for Atorvastatin is due for a refill.",
    time: "1d ago",
    icon: "pills",
    read: false,
    isNew: true,
  },
  {
    id: "4",
    title: "Health Tip",
    description:
      "Remember to stay hydrated! Drink at least 8 glasses of water today.",
    time: "2d ago",
    icon: "heartPulse",
    read: true,
  },
];

export default function DashboardPage() {
  const userName = "Alex Johnson";

  return (
    <div className="space-y-8">
      {" "}
      {/* Increased gap for cards */}
      <h1 className="font-headline text-3xl md:text-4xl font-semibold text-foreground drop-shadow-md">
        Welcome back, {userName}!
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action) => {
          const IconComponent = action.icon;
          return (
            <Card
              key={action.label}
              className="hover:shadow-xl transition-shadow duration-300 rounded-2xl animate-subtle-slide-up"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">
                  {action.label}
                </CardTitle>
                <IconComponent className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Button size="sm" asChild className="w-full mt-2">
                  <Link href={action.href}>Go</Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        {" "}
        {/* Increased gap */}
        <Card
          className="lg:col-span-2 rounded-2xl animate-subtle-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <CardHeader>
            <CardTitle className="font-headline text-2xl">
              Recent Activity & Notifications
            </CardTitle>
            <CardDescription>
              Stay updated with your latest health activities and alerts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-3">
              {mockNotifications.length > 0 ? (
                <div className="space-y-4">
                  {mockNotifications.map((notification, index) => {
                    const IconComponent =
                      Icons[notification.icon] || Icons.notifications;
                    return (
                      <React.Fragment key={notification.id}>
                        <div className="flex items-start space-x-4 p-3 hover:bg-muted/50 rounded-lg">
                          <div
                            className={`mt-1 p-2 rounded-full ${
                              notification.read ? "bg-muted" : "bg-primary/10"
                            }`}
                          >
                            <IconComponent
                              className={`h-5 w-5 ${
                                notification.read
                                  ? "text-muted-foreground"
                                  : "text-primary"
                              }`}
                            />
                          </div>
                          <div className="flex-1">
                            <p
                              className={`font-medium ${
                                notification.read
                                  ? "text-muted-foreground"
                                  : "text-foreground"
                              }`}
                            >
                              {notification.title}
                            </p>
                            <p
                              className={`text-sm ${
                                notification.read
                                  ? "text-muted-foreground/80"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {notification.description}
                            </p>
                            <p className="text-xs text-muted-foreground/70 mt-1">
                              {notification.time}
                            </p>
                          </div>
                          {notification.isNew && !notification.read && (
                            <Badge
                              variant="default"
                              className="h-fit animate-pulse-badge"
                            >
                              New
                            </Badge>
                          )}
                        </div>
                        {index < mockNotifications.length - 1 && <Separator />}
                      </React.Fragment>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-10">
                  <Icons.notifications className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-4 text-muted-foreground">
                    No new notifications.
                  </p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
        <Card
          className="rounded-2xl glassmorphic animate-subtle-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          {" "}
          {/* Glassmorphism applied here */}
          <CardHeader>
            <CardTitle className="font-headline text-2xl">
              Your Health Snapshot
            </CardTitle>
            <CardDescription>
              A quick overview of your health status.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-card/80 dark:bg-card/70 rounded-lg shadow-sm">
              <div>
                <p className="text-sm text-muted-foreground">
                  Next Appointment
                </p>
                <p className="font-semibold text-foreground">
                  Dr. Smith - Tomorrow, 10 AM
                </p>
              </div>
              <Icons.appointments className="h-6 w-6 text-primary" />
            </div>
            <div className="flex items-center justify-between p-3 bg-card/80 dark:bg-card/70 rounded-lg shadow-sm">
              <div>
                <p className="text-sm text-muted-foreground">
                  Active Prescriptions
                </p>
                <p className="font-semibold text-foreground">2 medications</p>
              </div>
              <Icons.pills className="h-6 w-6 text-primary" />
            </div>
            <div className="text-center mt-6">
              <Image
                src="https://img.freepik.com/free-vector/3d-medical-icon-with-doctor-nurse_107791-16582.jpg"
                alt="3D Medical Illustration"
                width={300}
                height={200}
                className="rounded-lg mx-auto shadow-md"
              />
              <p className="text-xs text-muted-foreground mt-2"></p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
