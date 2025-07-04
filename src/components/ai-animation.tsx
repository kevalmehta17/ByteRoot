"use client";

import { useEffect, useRef, useState } from "react";
import { Icons } from "./icons";

export function AIAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [userTyping, setUserTyping] = useState(false);
  const [aiTyping, setAiTyping] = useState(false);
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const userMessage = "How do I check for drug interactions?";
  const aiResponse = `You can check drug interactions easily:

1. 💊 Go to 'Drug Interactions'
    Select the feature from the
    dashboard sidebar.

2. ⌨️ Enter Medicine Names
    Input 2-3 drug names you
    want to check.

3. 🔬 Get AI Analysis
    Our AI will provide a detailed
    report on potential interactions.

Disclaimer: Always consult a doctor.`;

  // This handles the entire animation lifecycle.
  useEffect(() => {
    if (!mounted) {
      return;
    }

    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    const runStep = (step: number) => {
      if (step === 0) {
        timeoutId = setTimeout(() => setCurrentStep(1), 1000);
      } else if (step === 1) {
        setUserTyping(true);
        let i = 0;
        intervalId = setInterval(() => {
          if (i <= userMessage.length) {
            setUserText(userMessage.substring(0, i));
            i++;
          } else {
            clearInterval(intervalId);
            setUserTyping(false);
            timeoutId = setTimeout(() => setCurrentStep(2), 500);
          }
        }, 70);
      } else if (step === 2) {
        setAiTyping(true);
        timeoutId = setTimeout(() => setCurrentStep(3), 1500);
      } else if (step === 3) {
        setAiTyping(false);
        let i = 0;
        intervalId = setInterval(() => {
          if (i <= aiResponse.length) {
            setAiText(aiResponse.substring(0, i));
            i++;
          } else {
            clearInterval(intervalId);
            timeoutId = setTimeout(() => setCurrentStep(4), 3000);
          }
        }, 20);
      } else if (step === 4) {
        timeoutId = setTimeout(() => {
          setUserText("");
          setAiText("");
          setCurrentStep(0);
        }, 1000);
      }
    };

    runStep(currentStep);

    // This is the cleanup function. It will clear any running timers
    // when the component unmounts or when the effect re-runs.
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [currentStep, mounted, userMessage, aiResponse]);

  // This handles the canvas background animation.
  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Particle class
    class Particle {
      x: number;
      y: number;
      radius: number;
      color: string;
      velocity: { x: number; y: number };
      alpha: number;

      constructor(x: number, y: number, radius: number, color: string) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = {
          x: (Math.random() - 0.5) * 1,
          y: (Math.random() - 0.5) * 1,
        };
        this.alpha = Math.random() * 0.8 + 0.2;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }

      update() {
        if (!canvas) return;

        const dpr = window.devicePixelRatio || 1;
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // Bounce off edges
        if (
          this.x + this.radius > canvas.width / dpr ||
          this.x - this.radius < 0
        ) {
          this.velocity.x = -this.velocity.x;
        }

        if (
          this.y + this.radius > canvas.height / dpr ||
          this.y - this.radius < 0
        ) {
          this.velocity.y = -this.velocity.y;
        }

        this.draw();
      }
    }

    // Animation parameters
    const particles: Particle[] = [];
    const particleCount = 50;
    const colors = ["#25a27f", "#34d399", "#669b7c"];
    const maxRadius = 3;

    // Create particles
    if (canvas) {
      const dpr = window.devicePixelRatio || 1;
      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * maxRadius + 1;
        const x = Math.random() * (canvas.width / dpr - radius * 2) + radius;
        const y = Math.random() * (canvas.height / dpr - radius * 2) + radius;
        const color = colors[Math.floor(Math.random() * colors.length)];

        particles.push(new Particle(x, y, radius, color));
      }
    }

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      particles.forEach((particle) => {
        particle.update();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted]);

  return (
    <div className="relative w-full max-w-md aspect-square mx-auto">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full rounded-xl"
      />

      <div className="relative z-10 w-full h-full flex flex-col p-2 sm:p-4">
        <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-3 sm:p-4 h-full flex flex-col">
          {/* Chat header */}
          <div className="flex items-center gap-2 pb-2 sm:pb-3 border-b border-white/10">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-muted-foreground text-xs sm:text-sm font-medium">
              ByteRoot AI Assistant
            </span>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto py-2 sm:py-4 space-y-3 sm:space-y-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
            {userText && (
              <div className="flex justify-end">
                <div className="bg-primary/20 border border-primary/30 rounded-lg rounded-tr-none p-2 sm:p-3 max-w-[85%] break-words">
                  <p className="text-xs sm:text-sm text-foreground">
                    {userText}
                  </p>
                </div>
              </div>
            )}

            {(aiText || aiTyping) && (
              <div className="flex justify-start">
                <div className="bg-accent/10 border border-accent/30 rounded-lg rounded-tl-none p-2 sm:p-3 max-w-[85%] break-words">
                  {aiTyping ? (
                    <div className="flex gap-1 items-center h-5 sm:h-6">
                      <div className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-primary animate-pulse"></div>
                      <div className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-accent animate-pulse delay-100"></div>
                      <div className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-secondary animate-pulse delay-200"></div>
                    </div>
                  ) : (
                    <pre className="text-xs sm:text-sm text-foreground font-sans whitespace-pre-wrap overflow-x-auto">
                      {aiText}
                    </pre>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Chat input */}
          <div className="border-t border-white/10 pt-2 sm:pt-3">
            <div className="flex items-center gap-2 bg-black/30 border border-white/10 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2">
              <input
                type="text"
                disabled
                placeholder={userTyping ? "Typing..." : "Ask a question..."}
                className="bg-transparent text-xs sm:text-sm text-muted-foreground flex-1 outline-none placeholder:text-white/50"
              />
              <button className="text-primary rounded-md p-1 hover:bg-white/5">
                <Icons.send className="sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
