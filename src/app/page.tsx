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
import { motion, useAnimation, easeOut, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { FloatingActionButton } from "@/components/ui/floating-action-button";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const slideInFromLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

const slideInFromRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
};

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HomePage() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  const handleEmergencyConfirm = () => {
    router.push("/emergency");
  };

  const handleFloatingAction = () => {
    router.push("/dashboard/chatbot");
  };

  const features = [
    {
      icon: Icons.symptomChecker,
      title: "Symptom Checker",
      description:
        "Get preliminary advice based on your symptoms using our AI assistant.",
      href: "/dashboard/symptom-checker",
      gradient: "from-emerald-400 to-teal-500",
    },
    {
      icon: Icons.chatbot,
      title: "AI Chatbot",
      description:
        "Get instant answers to your medical questions from our AI assistant.",
      href: "/dashboard/chatbot",
      gradient: "from-green-400 to-emerald-500",
    },
    {
      icon: Icons.tablet,
      title: "Drug Interaction Checker",
      description:
        "Check potential interactions between your medications with our AI tool.",
      href: "/dashboard/drug-interaction-checker",
      gradient: "from-teal-400 to-cyan-500",
    },
    {
      icon: Icons.analysis,
      title: "AI Diagnosis",
      description:
        "Upload medical images for AI-powered preliminary analysis and insights.",
      href: "/dashboard/image-diagnosis",
      gradient: "from-emerald-500 to-green-600",
    },
    {
      icon: Icons.translate,
      title: "Report Simplifier",
      description:
        "Understand complex medical reports with AI-driven summaries and translations.",
      href: "/dashboard/report-simplifier",
      gradient: "from-green-500 to-teal-600",
    },
    {
      icon: Icons.hospitals,
      title: "Hospital Booking",
      description: "Find nearby hospitals and book appointments seamlessly.",
      href: "/dashboard/hospitals",
      gradient: "from-teal-500 to-emerald-600",
    },
  ];

  const duplicatedFeatures = [...features, ...features];

  return (
    <div
      ref={ref}
      className="flex flex-col min-h-screen relative overflow-hidden"
    >
      {/* Enhanced Animated Background */}
      <motion.div
        style={{ y: yBg, opacity }}
        className="fixed inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950 dark:via-green-950 dark:to-teal-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(20,184,166,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(16,185,129,0.1)_0deg,transparent_60deg,rgba(20,184,166,0.1)_120deg,transparent_180deg,rgba(5,150,105,0.1)_240deg,transparent_300deg)]" />
      </motion.div>

      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none -z-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-sm"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        className="relative z-10"
      >
        {/* Enhanced Header */}
        <motion.header
          variants={fadeInUp}
          className="py-6 px-4 sm:px-6 lg:px-8 backdrop-blur-md bg-white/10 dark:bg-black/10 border-b border-white/20 sticky top-0 z-50"
        >
          <div className="container mx-auto flex justify-between items-center">
            <Link href={"/"} className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <Icons.logo className="h-8 w-8 text-primary" />
              </motion.div>
              <span className="font-headline text-2xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                ByteRoot
              </span>
            </Link>
            <nav className="space-x-2 md:space-x-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" asChild className="backdrop-blur-sm">
                  <Link href={"/dashboard"}>Dashboard</Link>
                </Button>
              </motion.div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      className="border-destructive text-destructive hover:bg-destructive/10 backdrop-blur-sm"
                    >
                      <Icons.emergency className="h-4 w-4 mr-2" />
                      Emergency
                    </Button>
                  </motion.div>
                </AlertDialogTrigger>
                <AlertDialogContent className="glassmorphic rounded-2xl backdrop-blur-xl">
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
          {/* Enhanced Hero Section */}
          <section className="py-20 md:py-32">
            <div className="container mx-auto text-center px-4">
              <motion.h1
                className="font-headline text-4xl sm:text-6xl md:text-7xl font-bold mb-6"
                variants={fadeInUp}
                custom={0}
              >
                <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent drop-shadow-lg">
                  Your Health,
                </span>
                <br />
                <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 bg-clip-text text-transparent">
                  Simplified.
                </span>
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
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="lg"
                        className="font-semibold text-lg px-10 py-8 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-2xl rounded-xl relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <Icons.emergency className="mr-2 h-6 w-6 relative z-10" />
                        <span className="relative z-10">Emergency Alert</span>
                      </Button>
                    </motion.div>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="glassmorphic rounded-2xl backdrop-blur-xl">
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
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="font-semibold text-lg px-10 py-8 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-xl rounded-xl relative overflow-hidden group"
                    asChild
                  >
                    <Link href="/dashboard">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Icons.home className="mr-2 h-6 w-6 relative z-10" />
                      <span className="relative z-10">Go to Dashboard</span>
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Enhanced Features Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <motion.h2
                className="font-headline text-3xl font-semibold text-center mb-12"
                variants={fadeInUp}
                custom={0}
              >
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Core Features
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
                      onHoverStart={() => setHoveredCard(index)}
                      onHoverEnd={() => setHoveredCard(null)}
                    >
                      <Card className="h-full text-center rounded-2xl transition-all duration-500 ease-out bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/20 flex flex-col hover:shadow-2xl hover:-translate-y-3 hover:bg-white/30 dark:hover:bg-black/30 group relative overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                        <CardHeader className="flex-grow relative z-10">
                          <motion.div
                            className="mx-auto bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900 dark:to-teal-900 rounded-full p-4 w-fit mb-4"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.3 }}
                          >
                            <feature.icon className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
                          </motion.div>
                          <CardTitle className="font-headline text-xl">
                            {feature.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10">
                          <CardDescription>{feature.description}</CardDescription>
                        </CardContent>
                        <CardFooter className="justify-center pt-2 relative z-10">
                          <Button variant="link" asChild className="group-hover:text-emerald-600">
                            <Link href={feature.href}>
                              Learn More{" "}
                              <motion.div
                                className="ml-1"
                                animate={hoveredCard === index ? { x: 5 } : { x: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Icons.chevronRight className="h-4 w-4" />
                              </motion.div>
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
          <section className="py-16">
            <div className="container mx-auto px-4">
              <motion.div
                className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div 
                  variants={slideInFromLeft} 
                  className="md:w-1/2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <Image
                      src="https://img.freepik.com/free-photo/medical-banner-with-stethoscope_23-2149611199.jpg"
                      alt="Medical Banner"
                      width={600}
                      height={400}
                      className="rounded-2xl transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent" />
                  </div>
                </motion.div>
                <motion.div variants={slideInFromRight} className="md:w-1/2">
                  <h2 className="font-headline text-3xl font-semibold mb-6">
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      Intelligent Health Assistance
                    </span>
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Leverage the power of AI for symptom analysis, medical image
                    insights, and simplified report understanding.
                  </p>
                  <motion.ul 
                    className="space-y-3 text-muted-foreground mb-8"
                    variants={container}
                  >
                    {[
                      { icon: Icons.diagnosis, text: "Symptom-based advice." },
                      { icon: Icons.analysis, text: "Preliminary image diagnosis." },
                      { icon: Icons.translate, text: "Report simplification and translation." },
                    ].map((item, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-center"
                        variants={fadeInUp}
                        custom={index}
                      >
                        <div className="h-5 w-5 mr-3 text-emerald-600 dark:text-emerald-400">
                          <item.icon className="h-5 w-5" />
                        </div>
                        {item.text}
                      </motion.li>
                    ))}
                  </motion.ul>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      asChild 
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-lg shadow-lg"
                    >
                      <Link href="/dashboard/chatbot">
                        <Icons.chatbot className="mr-2 h-5 w-5" />
                        Try AI Chatbot
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-16 relative">
            <div className="container mx-auto px-4">
              <motion.div
                className="text-center mb-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <h2 className="font-headline text-3xl font-semibold mb-4">
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Trusted by Thousands
                  </span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  See what our users say about their experience with ByteRoot
                </p>
              </motion.div>

              <motion.div
                className="grid md:grid-cols-3 gap-6"
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  {
                    name: "Dr. Sarah Johnson",
                    role: "Medical Professional",
                    content: "ByteRoot has revolutionized how I provide preliminary assessments. The AI insights are remarkably accurate.",
                    gradient: "from-emerald-400 to-teal-500",
                  },
                  {
                    name: "Michael Chen",
                    role: "Patient",
                    content: "The symptom checker helped me understand my condition better before visiting my doctor. Highly recommended!",
                    gradient: "from-green-400 to-emerald-500",
                  },
                  {
                    name: "Lisa Rodriguez",
                    role: "Caregiver",
                    content: "The drug interaction checker is a lifesaver. It helps me manage my family's medications safely.",
                    gradient: "from-teal-400 to-cyan-500",
                  },
                ].map((testimonial, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    custom={index}
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="h-full bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 relative overflow-hidden group">
                      <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                      <CardContent className="p-6 relative z-10">
                        <motion.div
                          className="flex items-center mb-4"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center text-white font-semibold mr-3">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </motion.div>
                        <p className="text-muted-foreground italic leading-relaxed">
                          "{testimonial.content}"
                        </p>
                        <div className="mt-4 flex text-emerald-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1, duration: 0.3 }}
                              viewport={{ once: true }}
                            >
                              ⭐
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        </main>

        <motion.footer
          variants={fadeInUp}
          className="py-10 bg-gradient-to-r from-gray-900 via-emerald-900 to-teal-900 text-gray-200 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="container mx-auto text-center relative z-10">
            <p>
              &copy; {new Date().getFullYear()}{" "}
              <span className="font-semibold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                ByteRoot
              </span>
              . All rights reserved.
            </p>
            <p className="text-sm text-gray-300">
              Your trusted partner in health management.
            </p>
          </div>
        </motion.footer>
      </motion.div>

      {/* Floating Action Button */}
      <FloatingActionButton
        onClick={handleFloatingAction}
        icon={Icons.chatbot}
        label="AI Assistant"
        variant="primary"
      />
    </div>
  );
}
