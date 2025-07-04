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
import dynamic from "next/dynamic";
import { motion, useAnimation, easeOut } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  MessageSquare,
  Microscope,
  ShieldCheck,
  Tablet,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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
// Dynamically import AIAnimation with SSR disabled
const AIAnimation = dynamic(
  () => import("@/components/ai-animation").then((mod) => mod.AIAnimation),
  {
    ssr: false,
    loading: () => (
      <Skeleton className="relative w-full max-w-md aspect-square mx-auto rounded-xl" />
    ),
  }
);
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
    <motion.div className="min-h-screen bg-[#0c0c10] text-white">
      {/* Gradient background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -right-[10%] w-[50%] h-[70%] bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -left-[10%] w-[40%] h-[60%] bg-accent/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[20%] w-[30%] h-[40%] bg-secondary/20 blur-[120px] rounded-full" />
      </div>

      {/* Navbar */}
      <header className="container mx-auto py-6 flex items-center justify-between relative z-10 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <Icons.logo className="h-8 w-8 text-primary transition-transform duration-300 group-hover:rotate-[360deg]" />
          <span className="text-2xl font-bold font-headline bg-gradient-to-r from-[#2EE59D] to-[#14C2F1] bg-clip-text text-transparent">
            ByteRoot
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#2EE59D] to-[#14C2F1] hover:opacity-90 text-black font-semibold"
            asChild
          >
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold shadow-lg hover:shadow-red-700/50 hover:scale-[1.03] transition-transform duration-200"
              >
                <Icons.emergency className="h-5 w-5 mr-2 animate-pulse text-white" />
                Emergency
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="glassmorphic rounded-2xl border border-red-500 shadow-xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-red-600 text-2xl">
                  Confirm Emergency
                </AlertDialogTitle>
                <AlertDialogDescription className="text-white/80">
                  You’re about to enter Emergency Mode. This will guide you to
                  the Emergency Form immediately. Please confirm to proceed.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="hover:bg-white/10 transition">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleEmergencyConfirm}
                  className="bg-gradient-to-r from-red-500 to-red-700 text-white hover:brightness-110"
                >
                  Proceed to Form
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </nav>
        <div className="md:hidden">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
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
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section
          id="about"
          className="container mx-auto py-12 md:py-24 px-4 sm:px-6 relative z-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight font-headline mb-6">
                Check. Connect. Cure.{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2EE59D] to-[#14C2F1]">
                  Seamlessly
                </span>{" "}
                — powered by AI.
              </h1>

              <p className="text-lg sm:text-xl text-white/80 mb-8">
                Your AI health companion — helping you track symptoms, decode
                reports, and book care — all in one place.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#2EE59D] to-[#14C2F1] hover:opacity-90 text-black font-semibold"
                  asChild
                >
                  <Link href="/dashboard">
                    Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <AIAnimation />
            </div>
          </div>
        </section>

        {/* Features Auto-scroll Section */}
        <section className="py-24 bg-gradient-to-b from-[#0c0c10] to-[#0f0f1a]">
          <div className="container mx-auto px-4">
            <motion.h2
              className="font-space-grotesk text-4xl sm:text-5xl font-bold text-center text-white mb-16 drop-shadow-lg"
              variants={fadeInUp}
              custom={0}
            >
              Core{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2EE59D] to-[#14C2F1]">
                Features
              </span>
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
                    <Card className="h-full text-center rounded-2xl transition-all duration-300 ease-in-out bg-card/70 dark:bg-card/60 backdrop-blur-sm border border-white/5 hover:bg-gradient-to-br hover:from-[#2EE59D]/10 hover:to-[#14C2F1]/10 hover:shadow-xl hover:-translate-y-2">
                      <CardHeader className="flex-grow">
                        <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4 transition-transform duration-300">
                          <feature.icon className="h-10 w-10 text-primary" />
                        </div>
                        <CardTitle className="font-headline text-xl text-white">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-muted-foreground">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="justify-center pt-2">
                        <Button
                          variant="link"
                          asChild
                          className="text-primary font-medium"
                        >
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
        {/* Image + Content Section */}
        <section className="relative py-24 bg-gradient-to-b from-[#0c0c10] to-[#0f0f1a] overflow-hidden">
          {/* Soft background blur effects */}
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-primary/20 blur-[100px] rounded-full" />
            <div className="absolute bottom-[5%] right-[10%] w-[30%] h-[30%] bg-accent/20 blur-[100px] rounded-full" />
          </div>

          <div className="container mx-auto px-4">
            <motion.div
              className="flex flex-col md:flex-row items-center gap-12"
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Left: Image with glow */}
              <motion.div
                variants={fadeInUp}
                className="md:w-1/2 relative rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Image
                  src="https://img.freepik.com/free-photo/medical-banner-with-stethoscope_23-2149611199.jpg"
                  alt="Medical Banner"
                  width={600}
                  height={400}
                  className="rounded-2xl"
                />
                {/* Glow effect inside image container */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2EE59D]/10 to-[#14C2F1]/10 blur-[100px] rounded-2xl pointer-events-none" />
              </motion.div>

              {/* Right: Text content */}
              <motion.div variants={fadeInUp} className="md:w-1/2">
                <h2 className="font-space-grotesk text-4xl sm:text-5xl font-bold text-white mb-6 drop-shadow-lg">
                  Smart{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2EE59D] to-[#14C2F1]">
                    Health Companion
                  </span>
                </h2>

                <p className="text-white/80 text-lg sm:text-xl mb-6">
                  Leverage the power of AI for personalized health insights,
                  image-based diagnostics, and simplified report understanding.
                </p>

                <ul className="space-y-4 text-white/70">
                  <li className="flex items-center">
                    <Icons.diagnosis className="h-5 w-5 mr-3 text-primary" />
                    Symptom-based AI insights.
                  </li>
                  <li className="flex items-center">
                    <Icons.analysis className="h-5 w-5 mr-3 text-primary" />
                    Preliminary medical image analysis.
                  </li>
                  <li className="flex items-center">
                    <Icons.translate className="h-5 w-5 mr-3 text-primary" />
                    Simplified reports & translations.
                  </li>
                </ul>

                <Button
                  asChild
                  className="mt-8 rounded-lg bg-gradient-to-r from-[#2EE59D] to-[#14C2F1] text-black font-semibold hover:opacity-90"
                >
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
            <span className="font-semibold bg-gradient-to-r from-[#2EE59D] to-[#14C2F1] bg-clip-text text-transparent">
              ByteRoot
            </span>
            . All rights reserved.
          </p>
          <p className="text-sm text-gray-400">
            Your trusted partner in health management.
          </p>
        </div>
      </motion.footer>
    </motion.div>
  );
}
