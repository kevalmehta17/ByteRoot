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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { motion, useAnimation, easeOut } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: easeOut,
    },
  }),
};

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function HomePage() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleEmergencyConfirm = () => {
    router.push("/emergency");
  };

  const features = [
    {
      icon: Icons.symptomChecker,
      title: "Symptom Checker",
      description:
        "Get preliminary advice based on your symptoms using our AI assistant.",
      href: "/dashboard/symptom-checker",
    },
    {
      icon: Icons.chatbot,
      title: "AI Chatbot",
      description:
        "Get instant answers to your medical questions from our AI assistant.",
      href: "/dashboard/chatbot",
    },
    {
      icon: Icons.tablet,
      title: "Drug Interaction Checker",
      description:
        "Check potential interactions between your medications with our AI tool.",
      href: "/dashboard/drug-interaction-checker",
    },
    {
      icon: Icons.analysis,
      title: "AI Diagnosis",
      description:
        "Upload medical images for AI-powered preliminary analysis and insights.",
      href: "/dashboard/image-diagnosis",
    },
    {
      icon: Icons.translate,
      title: "Report Simplifier",
      description:
        "Understand complex medical reports with AI-driven summaries and translations.",
      href: "/dashboard/report-simplifier",
    },
    {
      icon: Icons.hospitals,
      title: "Hospital Booking",
      description: "Find nearby hospitals and book appointments seamlessly.",
      href: "/dashboard/hospitals",
    },
  ];

  const duplicatedFeatures = [...features, ...features];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="flex flex-col min-h-screen bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]"
    >
      {/* Header */}
      <motion.header
        variants={fadeInUp}
        className="py-6 px-4 sm:px-6 lg:px-8 shadow-lg bg-background/80 backdrop-blur-sm sticky top-0 z-50"
      >
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
      </motion.header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto text-center px-4">
            <motion.h1
              className="font-headline text-3xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 drop-shadow-lg"
              variants={fadeInUp}
              custom={0}
            >
              Your Health, Simplified.
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
              variants={fadeInUp}
              custom={1}
            >
              ByteRoot provides AI-powered health insights, drug interaction
              checks, and easy hospital access, all in one place.
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center items-center gap-4 mb-20"
              variants={fadeInUp}
              custom={2}
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
                      real emergency, please confirm to proceed.
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
            </motion.div>
          </div>
        </section>

        {/* Features Auto-scroll Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.h2
              className="font-headline text-3xl font-semibold text-center text-foreground mb-12 drop-shadow-md"
              variants={fadeInUp}
              custom={0}
            >
              Core Features
            </motion.h2>
            <div
              className="w-full overflow-x-hidden"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.div
                className="flex gap-8 py-4"
                animate={{ x: isHovered ? 0 : [-0, -2112] }}
                transition={{
                  ease: "linear",
                  duration: 30,
                  repeat: Infinity,
                }}
              >
                {duplicatedFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="w-80 flex-shrink-0"
                    variants={fadeInUp}
                    custom={index * 0.1}
                  >
                    <Card className="h-full text-center rounded-2xl transition-all duration-300 ease-in-out bg-card/70 dark:bg-card/60 backdrop-blur-sm border border-white/5 flex flex-col hover:shadow-xl hover:-translate-y-2">
                      <CardHeader className="flex-grow">
                        <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4 transition-transform duration-300">
                          <feature.icon className="h-10 w-10 text-primary" />
                        </div>
                        <CardTitle className="font-headline text-xl">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardContent>
                      <CardFooter className="justify-center pt-2">
                        <Button variant="link" asChild>
                          <Link href={feature.href}>
                            Learn More{" "}
                            <Icons.chevronRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Image + Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeInUp} className="md:w-1/2">
                <Image
                  src="https://img.freepik.com/free-photo/medical-banner-with-stethoscope_23-2149611199.jpg"
                  alt="Medical Banner"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-xl hover:shadow-2xl"
                />
              </motion.div>
              <motion.div variants={fadeInUp} className="md:w-1/2">
                <h2 className="font-headline text-3xl font-semibold text-foreground mb-6 drop-shadow-md">
                  Intelligent Health Assistance
                </h2>
                <p className="text-muted-foreground mb-4">
                  Leverage the power of AI for symptom analysis, medical image
                  insights, and simplified report understanding.
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center">
                    <Icons.diagnosis className="h-5 w-5 mr-3 text-primary" />
                    Symptom-based advice.
                  </li>
                  <li className="flex items-center">
                    <Icons.analysis className="h-5 w-5 mr-3 text-primary" />
                    Preliminary image diagnosis.
                  </li>
                  <li className="flex items-center">
                    <Icons.translate className="h-5 w-5 mr-3 text-primary" />
                    Report simplification and translation.
                  </li>
                </ul>
                <Button asChild className="mt-8 rounded-lg">
                  <Link href="/dashboard/chatbot">
                    <Icons.chatbot className="mr-2 h-5 w-5" />
                    Try AI Chatbot
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <motion.footer
        variants={fadeInUp}
        className="py-10 bg-gray-900 text-gray-200"
      >
        <div className="container mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold text-primary">MediPocket</span>. All
            rights reserved.
          </p>
          <p className="text-sm text-gray-400">
            Your trusted partner in health management.
          </p>
        </div>
      </motion.footer>
    </motion.div>
  );
}
