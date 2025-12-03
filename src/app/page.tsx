"use client";

import React, { useState, useRef, useEffect, useContext } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Message } from "@/lib/types";
import { askAI } from "@/app/actions";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatMessages } from "@/components/chat/chat-messages";
import { SuggestedReplies } from "@/components/chat/suggested-replies";
import { ChatInput } from "@/components/chat/chat-input";
import { nanoid } from "nanoid";
import { SettingsContext, SettingsProvider } from "@/context/settings-context";

function ChatPage() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedReplies, setSuggestedReplies] = useState<string[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("ChatPage must be used within a SettingsProvider");
  }
  const {
    personality,
    customPersonality,
    language,
    showSentiment,
    enableSuggestions,
    personalities,
  } = context;

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (isLoading || !text.trim()) return;

    setIsLoading(true);
    setSuggestedReplies([]);

    const userMessage: Message = { id: nanoid(), text, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const personalityDescription =
        personality === "自定义"
          ? customPersonality
          : personalities[personality];

      const res = await askAI({
        messages: [...messages, userMessage],
        personalityDescription,
        language,
      });

      if (res.error) {
        throw new Error(res.error);
      }
      
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === userMessage.id ? { ...msg, sentiment: res.sentiment } : msg
        )
      );

      const botMessage: Message = {
        id: nanoid(),
        text: res.botText,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
      if (enableSuggestions) {
        setSuggestedReplies(res.suggestions);
      }
    } catch (error) {
      console.error("Error asking AI:", error);
      toast({
        variant: "destructive",
        title: "哦不！出错了。",
        description: (error as Error).message || "您的请求有问题。",
      });
      const botMessage: Message = {
        id: nanoid(),
        text: "抱歉，我连接不上。请稍后再试。",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendSuggestedReply = (reply: string) => {
    handleSendMessage(reply);
    setSuggestedReplies([]);
  };

  return (
    <SidebarProvider>
      <SidebarInset className="flex flex-col h-screen max-h-screen bg-background p-0 md:p-0">
        <ChatHeader personality={personality} />
        <ChatMessages 
          messages={messages} 
          isLoading={isLoading} 
          scrollAreaRef={scrollAreaRef}
          showSentiment={showSentiment}
        />
        <div className="p-4 pt-2 border-t mt-auto bg-background/95 backdrop-blur-sm">
          {suggestedReplies.length > 0 && (
            <SuggestedReplies
              replies={suggestedReplies}
              onSelect={handleSendSuggestedReply}
            />
          )}
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function Home() {
  return (
    <SettingsProvider>
      <ChatPage />
    </SettingsProvider>
  )
}