"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";

interface GradientCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  gradient?: string;
  className?: string;
  children?: React.ReactNode;
  href?: string;
}

export function GradientCard({
  title,
  description,
  icon,
  gradient = "from-emerald-500 to-teal-500",
  className,
  children,
  href,
}: GradientCardProps) {
  const CardWrapper = href ? motion.a : motion.div;
  
  return (
    <CardWrapper
      href={href}
      className={cn("block", className)}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white/20 to-white/5 dark:from-black/20 dark:to-black/5 backdrop-blur-xl hover:shadow-2xl transition-all duration-500 group">
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
        
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-400/10 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-400/10 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
        
        <CardHeader className="relative z-10">
          {icon && (
            <motion.div
              className="mb-4 p-3 w-fit rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/50 dark:to-teal-900/50"
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {icon}
            </motion.div>
          )}
          <CardTitle className="text-xl font-semibold bg-gradient-to-r from-emerald-700 to-teal-700 dark:from-emerald-300 dark:to-teal-300 bg-clip-text text-transparent">
            {title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="relative z-10">
          <CardDescription className="text-base leading-relaxed mb-4">
            {description}
          </CardDescription>
          {children}
        </CardContent>
        
        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </Card>
    </CardWrapper>
  );
}