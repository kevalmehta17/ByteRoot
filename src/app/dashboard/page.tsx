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
import { motion } from "framer-motion";

const quickActions = [
  {
    label: "Book Appointment",
    href: "/dashboard/hospitals",
    icon: Icons.appointments,
    gradient: "gradient-bg-primary",
    description: "Schedule visits with healthcare providers",
  },
  {
    label: "Drug Interactions",
    href: "/dashboard/drug-interaction-checker",
    icon: Icons.tablet,
    gradient: "gradient-bg-secondary",
    description: "Check medication compatibility",
  },
  {
    label: "Check Symptoms",
    href: "/dashboard/symptom-checker",
    icon: Icons.symptomChecker,
    gradient: "gradient-bg-purple",
    description: "AI-powered symptom analysis",
  },
  {
    label: "Simplify Report",
    href: "/dashboard/report-simplifier",
    icon: Icons.reportSimplifier,
    gradient: "gradient-bg-primary",
    description: "Understand medical documents",
  },
];

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: IconKey;
  read?: boolean;
  isNew?: boolean;
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

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function DashboardPage() {
  const userName = "Alex Johnson";

  return (
    <motion.div 
      className="space-y-10 min-h-screen gradient-radial p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        variants={cardVariants}
        custom={0}
        className="text-center"
      >
        <h1 className="font-headline text-4xl md:text-6xl font-bold text-gradient mb-4 drop-shadow-lg">
          Welcome back, {userName}!
        </h1>
        <p className="text-xl text-muted-foreground">
          Your health dashboard is ready to help you today.
        </p>
      </motion.div>

      <motion.div 
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
      >
        {quickActions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <motion.div
              key={action.label}
              variants={cardVariants}
              custom={index + 1}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="h-full card-gradient border-gradient shadow-glow rounded-3xl overflow-hidden group">
                <CardHeader className="text-center relative">
                  <div className={`mx-auto rounded-full p-4 w-fit mb-4 ${action.gradient} shadow-glow group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white drop-shadow-lg" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gradient">
                    {action.label}
                  </CardTitle>
                  <CardDescription className="text-sm opacity-80">
                    {action.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button 
                    size="sm" 
                    asChild 
                    className="w-full btn-gradient shadow-glow rounded-xl"
                  >
                    <Link href={action.href}>
                      <span>Get Started</span>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid gap-10 lg:grid-cols-3">
        <motion.div
          variants={cardVariants}
          custom={5}
          className="lg:col-span-2"
        >
          <Card className="card-gradient border-gradient shadow-glow-strong rounded-3xl">
            <CardHeader>
              <CardTitle className="font-headline text-3xl text-gradient flex items-center gap-3">
                <div className="p-2 gradient-bg-primary rounded-full">
                  <Icons.notifications className="h-6 w-6 text-white" />
                </div>
                Recent Activity & Notifications
              </CardTitle>
              <CardDescription className="text-lg">
                Stay updated with your latest health activities and alerts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                {mockNotifications.length > 0 ? (
                  <div className="space-y-6">
                    {mockNotifications.map((notification, index) => {
                      const IconComponent =
                        Icons[notification.icon] || Icons.notifications;
                      return (
                        <React.Fragment key={notification.id}>
                          <motion.div 
                            className="flex items-start space-x-4 p-4 hover:bg-primary/5 rounded-2xl transition-all duration-300 border border-transparent hover:border-primary/20"
                            whileHover={{ x: 10 }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div
                              className={`mt-1 p-3 rounded-full ${
                                notification.read ? "bg-muted/50" : "gradient-bg-secondary shadow-glow"
                              }`}
                            >
                              <IconComponent
                                className={`h-6 w-6 ${
                                  notification.read
                                    ? "text-muted-foreground"
                                    : "text-white"
                                }`}
                              />
                            </div>
                            <div className="flex-1">
                              <p
                                className={`font-semibold text-lg ${
                                  notification.read
                                    ? "text-muted-foreground"
                                    : "text-gradient"
                                }`}
                              >
                                {notification.title}
                              </p>
                              <p
                                className={`text-base leading-relaxed ${
                                  notification.read
                                    ? "text-muted-foreground/80"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {notification.description}
                              </p>
                              <p className="text-sm text-muted-foreground/70 mt-2">
                                {notification.time}
                              </p>
                            </div>
                            {notification.isNew && !notification.read && (
                              <Badge
                                variant="default"
                                className="h-fit btn-gradient animate-pulse-glow text-white"
                              >
                                New
                              </Badge>
                            )}
                          </motion.div>
                          {index < mockNotifications.length - 1 && (
                            <Separator className="opacity-30" />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="gradient-bg-primary p-6 rounded-full w-fit mx-auto mb-6 shadow-glow">
                      <Icons.notifications className="h-16 w-16 text-white" />
                    </div>
                    <p className="text-xl text-muted-foreground">
                      No new notifications.
                    </p>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={cardVariants}
          custom={6}
        >
          <Card className="glassmorphic-strong border-gradient shadow-glow-strong rounded-3xl overflow-hidden">
            <CardHeader>
              <CardTitle className="font-headline text-3xl text-gradient flex items-center gap-3">
                <div className="p-2 gradient-bg-purple rounded-full">
                  <Icons.heartPulse className="h-6 w-6 text-white" />
                </div>
                Health Snapshot
              </CardTitle>
              <CardDescription className="text-lg">
                A quick overview of your health status.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <motion.div 
                className="flex items-center justify-between p-4 card-gradient rounded-2xl shadow-glow"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Next Appointment
                  </p>
                  <p className="font-bold text-lg text-gradient">
                    Dr. Smith - Tomorrow, 10 AM
                  </p>
                </div>
                <div className="gradient-bg-primary p-3 rounded-full shadow-glow">
                  <Icons.appointments className="h-7 w-7 text-white" />
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center justify-between p-4 card-gradient rounded-2xl shadow-glow"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Active Prescriptions
                  </p>
                  <p className="font-bold text-lg text-gradient">
                    2 medications
                  </p>
                </div>
                <div className="gradient-bg-secondary p-3 rounded-full shadow-glow">
                  <Icons.pills className="h-7 w-7 text-white" />
                </div>
              </motion.div>

              <motion.div 
                className="text-center mt-8"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative group">
                  <div className="absolute inset-0 gradient-bg-primary opacity-20 rounded-2xl blur-lg scale-110" />
                  <Image
                    src="https://img.freepik.com/free-vector/3d-medical-icon-with-doctor-nurse_107791-16582.jpg"
                    alt="3D Medical Illustration"
                    width={350}
                    height={250}
                    className="rounded-2xl mx-auto shadow-glow-strong relative z-10 border-gradient"
                  />
                </div>
                <motion.div
                  className="mt-6"
                  whileHover={{ scale: 1.05 }}
                >
                  <Button 
                    asChild 
                    className="btn-gradient shadow-glow rounded-xl px-8 py-3"
                  >
                    <Link href="/dashboard/chatbot">
                      <Icons.chatbot className="mr-2 h-5 w-5" />
                      Ask AI Assistant
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Stats Section */}
      <motion.div
        variants={cardVariants}
        custom={7}
        className="mt-12"
      >
        <Card className="card-gradient border-gradient shadow-glow-strong rounded-3xl overflow-hidden">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl text-gradient mb-4">
              Health Analytics
            </CardTitle>
            <CardDescription className="text-lg">
              Your health journey at a glance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { label: "Health Score", value: "85%", icon: Icons.heartPulse, gradient: "gradient-bg-primary" },
                { label: "Checkups This Year", value: "4", icon: Icons.appointments, gradient: "gradient-bg-secondary" },
                { label: "Symptoms Tracked", value: "12", icon: Icons.symptomChecker, gradient: "gradient-bg-purple" },
                { label: "Reports Analyzed", value: "7", icon: Icons.analysis, gradient: "gradient-bg-primary" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-6 glassmorphic rounded-2xl shadow-glow"
                  whileHover={{ scale: 1.05, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`mx-auto w-fit p-4 rounded-full ${stat.gradient} shadow-glow mb-4`}>
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-3xl font-bold text-gradient mb-2">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
