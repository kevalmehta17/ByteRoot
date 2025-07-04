"use client";

import { useState, type FormEvent, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";
import { getChatbotResponse } from "@/ai/flows/chatbot";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    if (scrollAreaRef.current) {
      // Shadcn/ui scrollarea doesn't expose a ref to the viewport, so we query for it
      const viewport = scrollAreaRef.current.querySelector(
        "div[data-radix-scroll-area-viewport]"
      );
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const result = await getChatbotResponse({ message: input });
      const assistantMessage: Message = {
        role: "assistant",
        content: result.response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Error in chatbot:", err);
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred.";
      toast({
        title: "Chatbot Error",
        description: errorMessage,
        variant: "destructive",
      });
      // Remove the user's message if the AI fails to respond, so they can try again.
      setMessages((prev) => prev.filter((msg) => msg !== userMessage));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <header className="mb-6">
        <h1 className="font-headline text-3xl font-semibold text-foreground drop-shadow-sm">
          ByteRoot AI Chat
        </h1>
        <p className="text-muted-foreground">
          Your personal AI health assistant. Ask me anything about general
          health topics.
        </p>
      </header>

      <Card className="flex-1 flex flex-col shadow-lg">
        <CardContent className="flex-1 p-0 flex flex-col">
          <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
            <div className="space-y-6">
              {messages.length === 0 && !isLoading && (
                <div className="text-center py-10">
                  <Icons.chatbot className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-4 text-muted-foreground">
                    No messages yet. Start the conversation!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    e.g., "What are common signs of dehydration?"
                  </p>
                </div>
              )}

              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-start gap-4 w-full",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === "assistant" && (
                    <Avatar className="h-9 w-9 border flex-shrink-0">
                      <div className="bg-primary/10 flex items-center justify-center h-full w-full">
                        <Icons.logo className="h-5 w-5 text-primary" />
                      </div>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "max-w-xl rounded-2xl p-3 text-sm md:text-base whitespace-pre-wrap shadow-sm",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-muted rounded-bl-none"
                    )}
                  >
                    {message.content}
                  </div>
                  {message.role === "user" && (
                    <Avatar className="h-9 w-9 border flex-shrink-0">
                      <AvatarFallback>
                        <Icons.user className="h-5 w-5 text-muted-foreground" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-start gap-4 justify-start">
                  <Avatar className="h-9 w-9 border flex-shrink-0">
                    <div className="bg-primary/10 flex items-center justify-center h-full w-full">
                      <Icons.logo className="h-5 w-5 text-primary" />
                    </div>
                  </Avatar>
                  <div className="max-w-md rounded-2xl p-3 bg-muted rounded-bl-none flex items-center space-x-2 text-sm md:text-base shadow-sm">
                    <Icons.loader className="h-5 w-5 animate-spin" />
                    <span>Thinking...</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t bg-background/80">
            <form onSubmit={handleSubmit} className="flex items-center gap-4">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1 resize-none"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e as any);
                  }
                }}
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                size="icon"
              >
                <Icons.send className="h-5 w-5" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
            <p className="text-xs text-center text-muted-foreground mt-2">
              ByteRoot Chatbot is for informational purposes and does not
              provide medical advice.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
