"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import {
  NotificationItem,
  type NotificationItemProps,
} from "@/components/appointments/notification-item";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const mockUpcomingAppointments: NotificationItemProps[] = [
  {
    id: "appt1",
    title: "Cardiology Check-up with Dr. Smith",
    description:
      "City General Hospital, Room 302. Please arrive 15 minutes early.",
    timeAgo: "Tomorrow at 10:00 AM",
    icon: "appointments",
    isNew: true,
    category: "Appointment",
  },
  {
    id: "appt2",
    title: "Dental Cleaning with Dr. Lee",
    description:
      "Community Health Clinic. Remember to bring your insurance card.",
    timeAgo: "In 3 days at 02:30 PM",
    icon: "tooth",
    isNew: false,
    category: "Appointment",
  },
  {
    id: "appt3",
    title: "Follow-up: Orthopedics",
    description: "St. Luke's Medical Center. Discuss X-ray results.",
    timeAgo: "Next week, Mon at 09:00 AM",
    icon: "bone",
    isNew: false,
    category: "Appointment",
  },
];

const mockMedicationReminders: NotificationItemProps[] = [
  {
    id: "med1",
    title: "Take Atorvastatin (20mg)",
    description: "Daily after breakfast. Helps lower cholesterol.",
    timeAgo: "Today at 08:00 AM",
    icon: "pills",
    isNew: true,
    category: "Medication",
  },
  {
    id: "med2",
    title: "Refill Metformin Prescription",
    description:
      "Your current supply runs out in 5 days. Contact pharmacy or doctor.",
    timeAgo: "Due in 5 days",
    icon: "filePlus",
    isNew: false,
    category: "Medication",
  },
];

const mockGeneralNotifications: NotificationItemProps[] = [
  {
    id: "gen2",
    title: "Health Tip: Stay Active",
    description:
      "Aim for at least 30 minutes of moderate exercise most days of the week.",
    timeAgo: "1d ago",
    icon: "heartPulse",
    isNew: false,
    category: "Health Tip",
  },
  {
    id: "gen3",
    title: "New Drug Interaction Info",
    description:
      "Learn about common interactions with over-the-counter pain relievers.",
    timeAgo: "3d ago",
    icon: "tablet",
    isNew: false,
    category: "Health Info",
  },
];

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const renderNotificationsList = (items: NotificationItemProps[]) => {
    if (items.length === 0) {
      return (
        <div className="text-center py-10">
          <Icons.calendarDays className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">
            No items in this category.
          </p>
        </div>
      );
    }
    // This is where we render the list of NotificationItem components
    return (
      <ScrollArea className="h-[calc(100vh-20rem)]">
        <div className="space-y-4 p-1">
          {items.map((item) => (
            <NotificationItem key={item.id} {...item} />
          ))}
        </div>
      </ScrollArea>
    );
  };

  // This is main return which renders the page layout
  // It includes the header, tabs, and the content for each tab
  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="font-headline text-3xl font-semibold text-foreground drop-shadow-sm">
          Appointments & Reminders
        </h1>
        <Button asChild>
          <Link href="/dashboard/hospitals">
            <Icons.add className="mr-2 h-4 w-4" /> Book New Appointment
          </Link>
        </Button>
      </header>

      {/* shadcn component which will render one tab at a time */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
          <TabsTrigger value="upcoming">
            <Icons.appointments className="mr-2 h-4 w-4" /> Upcoming
            Appointments
          </TabsTrigger>
          <TabsTrigger value="medications">
            <Icons.pills className="mr-2 h-4 w-4" /> Medication Reminders
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Icons.notifications className="mr-2 h-4 w-4" /> General
            Notifications
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-6">
          {renderNotificationsList(mockUpcomingAppointments)}
        </TabsContent>
        <TabsContent value="medications" className="mt-6">
          {renderNotificationsList(mockMedicationReminders)}
        </TabsContent>
        <TabsContent value="notifications" className="mt-6">
          {renderNotificationsList(mockGeneralNotifications)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
