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
import { motion, useAnimation, easeOut, useInView } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const slideInLeft = {
  hidden: { opacity: 0, x: -100, rotate: -5 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 100, rotate: 5 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardHover = {
  rest: { scale: 1, y: 0, rotateY: 0 },
  hover: { 
    scale: 1.05, 
    y: -10, 
    rotateY: 5,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export default function HomePage() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef(null);
  const isImageInView = useInView(imageRef, { once: true });

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
      gradient: "gradient-bg-primary",
    },
    {
      icon: Icons.chatbot,
      title: "AI Chatbot",
      description:
        "Get instant answers to your medical questions from our AI assistant.",
      href: "/dashboard/chatbot",
      gradient: "gradient-bg-secondary",
    },
    {
      icon: Icons.tablet,
      title: "Drug Interaction Checker",
      description:
        "Check potential interactions between your medications with our AI tool.",
      href: "/dashboard/drug-interaction-checker",
      gradient: "gradient-bg-purple",
    },
    {
      icon: Icons.analysis,
      title: "AI Diagnosis",
      description:
        "Upload medical images for AI-powered preliminary analysis and insights.",
      href: "/dashboard/image-diagnosis",
      gradient: "gradient-bg-primary",
    },
    {
      icon: Icons.translate,
      title: "Report Simplifier",
      description:
        "Understand complex medical reports with AI-driven summaries and translations.",
      href: "/dashboard/report-simplifier",
      gradient: "gradient-bg-secondary",
    },
    {
      icon: Icons.hospitals,
      title: "Hospital Booking",
      description: "Find nearby hospitals and book appointments seamlessly.",
      href: "/dashboard/hospitals",
      gradient: "gradient-bg-purple",
    },
  ];

  const duplicatedFeatures = [...features, ...features];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="flex flex-col min-h-screen gradient-radial-hero"
    >
      {/* Enhanced Header */}
      <motion.header
        variants={fadeInUp}
        className="py-6 px-4 sm:px-6 lg:px-8 glassmorphic-strong sticky top-0 z-50 border-b border-white/10"
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link href={"/"} className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Icons.logo className="h-10 w-10 text-gradient" />
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-lg scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
            <span className="font-headline text-3xl font-bold text-gradient">
              ByteRoot
            </span>
          </Link>
          <nav className="space-x-3 md:space-x-6">
            <Button 
              variant="ghost" 
              asChild 
              className="relative overflow-hidden hover:bg-primary/10 transition-all duration-300"
            >
              <Link href={"/dashboard"}>
                <span className="relative z-10">Dashboard</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </Link>
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-gradient text-destructive hover:shadow-glow-strong animate-pulse-glow"
                >
                  <Icons.emergency className="h-5 w-5 mr-2" />
                  Emergency
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="glassmorphic-strong rounded-3xl border-gradient">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-gradient">Confirm Emergency</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will guide you to an Emergency Form. Please confirm if
                    you want to proceed.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleEmergencyConfirm}
                    className="btn-gradient"
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
        {/* Enhanced Hero Section */}
        <section className="py-24 md:py-40 relative overflow-hidden">
          <div className="absolute inset-0 animate-gradient opacity-30" />
          <div className="container mx-auto text-center px-4 relative z-10">
            <motion.h1
              className="font-headline text-4xl sm:text-6xl md:text-7xl font-bold text-gradient mb-8 drop-shadow-2xl"
              variants={fadeInUp}
              custom={0}
            >
              Your Health, Simplified.
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
              variants={fadeInUp}
              custom={1}
            >
              ByteRoot provides{" "}
              <span className="text-gradient-purple font-semibold">AI-powered health insights</span>,{" "}
              drug interaction checks, and easy hospital access, all in one place.
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center items-center gap-6 mb-24"
              variants={fadeInUp}
              custom={2}
            >
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      className="font-semibold text-xl px-12 py-10 btn-gradient shadow-glow-strong rounded-2xl animate-float"
                    >
                      <Icons.emergency className="mr-3 h-7 w-7" />
                      Emergency Alert
                    </Button>
                  </motion.div>
                </AlertDialogTrigger>
                <AlertDialogContent className="glassmorphic-strong rounded-3xl border-gradient">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-gradient">Confirm Emergency</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will guide you to an emergency form. If this is a
                      real emergency, please confirm to proceed.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleEmergencyConfirm}
                      className="btn-gradient"
                    >
                      Proceed to Form
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <motion.div
                whileHover={{ scale: 1.05, rotate: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="font-semibold text-xl px-12 py-10 border-gradient shadow-glow rounded-2xl glassmorphic"
                  asChild
                >
                  <Link href="/dashboard">
                    <Icons.home className="mr-3 h-7 w-7" />
                    Go to Dashboard
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Features Auto-scroll Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 gradient-radial opacity-50" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.h2
              className="font-headline text-4xl font-bold text-center text-gradient mb-16 drop-shadow-lg"
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
                className="flex gap-10 py-6"
                animate={{ x: isHovered ? 0 : [-0, -2400] }}
                transition={{
                  ease: "linear",
                  duration: 35,
                  repeat: Infinity,
                }}
              >
                {duplicatedFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="w-96 flex-shrink-0"
                    variants={cardHover}
                    initial="rest"
                    whileHover="hover"
                  >
                    <Card className="h-full text-center rounded-3xl card-gradient border-gradient card-hover-glow shadow-glow">
                      <CardHeader className="flex-grow relative">
                        <div className={`mx-auto rounded-full p-6 w-fit mb-6 ${feature.gradient} shadow-glow`}>
                          <feature.icon className="h-12 w-12 text-white drop-shadow-lg" />
                        </div>
                        <CardTitle className="font-headline text-2xl text-gradient mb-4">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-lg leading-relaxed">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="justify-center pt-4">
                        <Button 
                          variant="link" 
                          asChild 
                          className="text-lg font-semibold text-gradient hover:scale-105 transition-transform"
                        >
                          <Link href={feature.href}>
                            Learn More{" "}
                            <Icons.chevronRight className="ml-2 h-5 w-5" />
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

        {/* Enhanced Image + Content Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 gradient-bg-secondary opacity-20" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div 
                variants={slideInLeft} 
                className="lg:w-1/2"
                ref={imageRef}
              >
                <motion.div
                  animate={isImageInView ? { 
                    rotate: [0, 2, -2, 0],
                    scale: [1, 1.02, 1]
                  } : {}}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="relative"
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/30 to-accent/30 blur-xl scale-110" />
                  <Image
                    src="https://img.freepik.com/free-photo/medical-banner-with-stethoscope_23-2149611199.jpg"
                    alt="Medical Banner"
                    width={700}
                    height={500}
                    className="rounded-3xl shadow-glow-strong relative z-10 border-gradient"
                  />
                </motion.div>
              </motion.div>
              <motion.div variants={slideInRight} className="lg:w-1/2">
                <h2 className="font-headline text-4xl font-bold text-gradient mb-8 drop-shadow-lg">
                  Intelligent Health Assistance
                </h2>
                <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                  Leverage the power of AI for symptom analysis, medical image
                  insights, and simplified report understanding.
                </p>
                <ul className="space-y-6 text-lg text-muted-foreground mb-10">
                  <motion.li 
                    className="flex items-center"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="p-2 rounded-full gradient-bg-primary mr-4 shadow-glow">
                      <Icons.diagnosis className="h-6 w-6 text-white" />
                    </div>
                    Symptom-based advice with AI precision.
                  </motion.li>
                  <motion.li 
                    className="flex items-center"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="p-2 rounded-full gradient-bg-secondary mr-4 shadow-glow">
                      <Icons.analysis className="h-6 w-6 text-white" />
                    </div>
                    Preliminary image diagnosis technology.
                  </motion.li>
                  <motion.li 
                    className="flex items-center"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="p-2 rounded-full gradient-bg-purple mr-4 shadow-glow">
                      <Icons.translate className="h-6 w-6 text-white" />
                    </div>
                    Report simplification and translation.
                  </motion.li>
                </ul>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    asChild 
                    className="text-lg px-8 py-6 btn-gradient shadow-glow rounded-2xl"
                  >
                    <Link href="/dashboard/chatbot">
                      <Icons.chatbot className="mr-3 h-6 w-6" />
                      Try AI Chatbot
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <motion.footer
        variants={fadeInUp}
        className="py-12 relative overflow-hidden"
      >
        <div className="absolute inset-0 gradient-bg-primary opacity-90" />
        <div className="container mx-auto text-center relative z-10">
          <p className="text-lg text-white/90 mb-2">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-bold text-white">ByteRoot</span>. All
            rights reserved.
          </p>
          <p className="text-white/70">
            Your trusted partner in health management.
          </p>
        </div>
      </motion.footer>
    </motion.div>
  );
}
