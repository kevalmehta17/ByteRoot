"use client";
import { Icons } from "@/components/icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const handleEmergencyConfirm = () => {
    // Redirect to the Emergency Form
    router.push("/emergency");
  };

  const features = [
    {
      icon: Icons.tablet,
      title: "Drug Interaction Checker",
      description:
        "Check potential interactions between your medications with our AI tool.",
      href: "/dashboard/drug-interaction-checker",
      aiHint: "pills interaction",
    },
    {
      icon: Icons.analysis,
      title: "AI Diagnosis",
      description:
        "Upload medical images for AI-powered preliminary analysis and insights.",
      href: "/dashboard/image-diagnosis",
      aiHint: "ai analysis",
    },
    {
      icon: Icons.translate,
      title: "Report Simplifier",
      description:
        "Understand complex medical reports with AI-driven summaries and translations.",
      href: "/dashboard/report-simplifier",
      aiHint: "report summary",
    },
    {
      icon: Icons.hospitals,
      title: "Hospital Booking",
      description: "Find nearby hospitals and book appointments seamlessly.",
      href: "/dashboard/hospitals",
      aiHint: "hospital building",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]">
      <header className="py-6 px-4 sm:px-6 lg:px-8 shadow-lg bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link href={"/"} className="flex items-center gap-2 group">
            <Icons.logo className="h-8 w-8 text-primary transition-transform duration-300 group-hover:rotate-[360deg] group-hover:scale-110" />
            <span className="font-headline text-2xl font-semibold text-primary">
              ByteRoot
            </span>
          </Link>
          <nav className="space-x-2 md:space-x-4">
            <Button variant="ghost" asChild>
              <Link href={"/dashboard"}>Dashboard</Link>
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-destructive text-destructive hover:bg-destructive/10"
                >
                  <Icons.emergency className="h-4 w-4 mr-2" />
                  Emergency
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="glassmorphic rounded-2xl">
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Emergency</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will guide you to an Emergency Form. Please confirm if
                    you want to proceed.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleEmergencyConfirm}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    Proceed to Form
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 md:py-32">
          <div className="container mx-auto text-center px-4">
            <h1 className="font-headline text-3xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 animate-subtle-slide-up drop-shadow-lg">
              Your Health, Simplified.
            </h1>
            <div className="px-4 sm:px-6 md:px-8">
              <p
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-subtle-slide-up"
                style={{ animationDelay: "0.2s" }}
              >
                ByteRoot provides AI-powered health insights, drug interaction
                checks, and easy hospital access, all in one place.
              </p>
            </div>
            <div
              className="flex  sm:flex-grow justify-center items-center gap-4 mb-20 animate-subtle-slide-up"
              style={{ animationDelay: "0.4s" }}
            >
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="lg"
                    className="font-semibold text-lg px-10 py-8 bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-xl animate-pulse-strong rounded-xl"
                  >
                    <Icons.emergency className="mr-2 h-6 w-6" />
                    Emergency Alert
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="glassmorphic rounded-2xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Emergency</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will guide you to an emergency form. If this is a
                      real emergency, please confirm to proceed. If not, you can
                      return to the dashboard.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleEmergencyConfirm}
                      className="bg-destructive hover:bg-destructive/90"
                    >
                      Proceed to Form
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button
                size="lg"
                variant="outline"
                className="font-semibold text-lg px-10 py-8 shadow-lg rounded-xl"
                asChild
              >
                <Link href="/dashboard">
                  <Icons.home className="mr-2 h-6 w-6" />
                  Go to Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-headline text-3xl font-semibold text-center text-foreground mb-12 drop-shadow-md">
              Core Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="text-center rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out animate-subtle-slide-up hover:-translate-y-2 bg-card/70 dark:bg-card/60 backdrop-blur-sm border border-white/5"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4 transition-transform duration-300 group-hover:scale-110">
                      <feature.icon className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-xl">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                    <Button variant="link" asChild className="mt-4">
                      <Link href={feature.href}>
                        Learn More{" "}
                        <Icons.chevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div
                className="md:w-1/2 animate-subtle-slide-up"
                style={{ animationDelay: "0.8s" }}
              >
                <Image
                  src="https://img.freepik.com/free-photo/medical-banner-with-stethoscope_23-2149611199.jpg"
                  alt="Medical Banner"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-xl"
                />
              </div>

              <div className="md:w-1/2">
                <h2
                  className="font-headline text-3xl font-semibold text-foreground mb-6 animate-subtle-slide-up drop-shadow-md"
                  style={{ animationDelay: "0.9s" }}
                >
                  Intelligent Health Assistance
                </h2>
                <p
                  className="text-muted-foreground mb-4 animate-subtle-slide-up"
                  style={{ animationDelay: "1.0s" }}
                >
                  Leverage the power of AI for symptom analysis, medical image
                  insights, and simplified report understanding. MediPocket
                  brings cutting-edge technology to your fingertips for
                  proactive health management.
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li
                    className="flex items-center animate-subtle-slide-up"
                    style={{ animationDelay: "1.1s" }}
                  >
                    <Icons.diagnosis className="h-5 w-5 mr-3 text-primary" />
                    Symptom-based advice.
                  </li>
                  <li
                    className="flex items-center animate-subtle-slide-up"
                    style={{ animationDelay: "1.2s" }}
                  >
                    <Icons.analysis className="h-5 w-5 mr-3 text-primary" />
                    Preliminary image diagnosis.
                  </li>
                  <li
                    className="flex items-center animate-subtle-slide-up"
                    style={{ animationDelay: "1.3s" }}
                  >
                    <Icons.translate className="h-5 w-5 mr-3 text-primary" />
                    Report simplification and translation.
                  </li>
                </ul>
                <Button
                  asChild
                  className="mt-8 animate-subtle-slide-up rounded-lg"
                  style={{ animationDelay: "1.4s" }}
                >
                  <Link href="/dashboard/symptom-checker">
                    Check Symptoms Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-10 bg-foreground text-background">
        <div className="container mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} ByteRoot. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground/80">
            Your trusted partner in health management.
          </p>
        </div>
      </footer>
    </div>
  );
}
