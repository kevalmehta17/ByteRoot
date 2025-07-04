"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Icons } from "../icons";
import { useState } from "react";

interface FloatingActionButtonProps {
  onClick?: () => void;
  className?: string;
  icon?: React.ComponentType<{ className?: string }>;
  label?: string;
  variant?: "primary" | "emergency" | "success";
}

const variants = {
  primary: "from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600",
  emergency: "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
  success: "from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600",
};

export function FloatingActionButton({
  onClick,
  className,
  icon: Icon = Icons.chatbot,
  label = "Quick Action",
  variant = "primary",
}: FloatingActionButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        "fixed bottom-6 right-6 z-50",
        className
      )}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1,
      }}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative"
      >
        <Button
          onClick={onClick}
          size="lg"
          className={cn(
            "h-14 w-14 rounded-full shadow-2xl border-0 bg-gradient-to-r text-white relative overflow-hidden",
            `${variants[variant]}`,
            "hover:shadow-emerald-500/25 hover:shadow-2xl"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <Icon className="h-6 w-6 relative z-10" />
        </Button>
        
        <motion.div
          className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap"
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={
            isHovered
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 10, scale: 0.8 }
          }
          transition={{ duration: 0.2 }}
        >
          {label}
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}