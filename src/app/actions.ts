"use server";

import type { Message, Sentiment } from "@/lib/types";
import { analyzeSentiment } from "@/ai/flows/real-time-sentiment-analysis";
import { setChatbotPersonality } from "@/ai/flows/chatbot-personality";
import { suggestReplies } from "@/ai/flows/suggested-replies";
import { translateMessage } from "@/ai/flows/translate-messages";

interface AskAIParams {
  messages: Message[];
  personalityDescription: string;
  language: string;
}

interface AIResponse {
  botText: string;
  sentiment: Sentiment;
  suggestions: string[];
  error?: string;
}

function formatConversationHistory(messages: Message[]): string {
  return messages
    .map((msg) => `${msg.sender === "user" ? "User" : "Bot"}: ${msg.text}`)
    .join("\n");
}

export async function askAI({
  messages,
  personalityDescription,
  language,
}: AskAIParams): Promise<AIResponse> {
  try {
    const userMessage = messages[messages.length - 1];
    if (userMessage.sender !== "user") {
      throw new Error("Last message must be from the user.");
    }
    const conversationHistory = formatConversationHistory(messages);

    // 1. Analyze sentiment of the user's message
    const sentimentResult = await analyzeSentiment({ text: userMessage.text });
    const sentiment = sentimentResult.sentimentLabel.toLowerCase() as Sentiment;

    // 2. Get bot response with personality and sentiment context
    const finalPersonality = `${personalityDescription} The user's sentiment seems to be ${sentiment}. Respond accordingly.`;

    const botResponseResult = await setChatbotPersonality({
      personalityDescription: finalPersonality,
      userMessage: userMessage.text,
    });
    
    let botText = botResponseResult.chatbotResponse;

    // 3. Translate if necessary
    if (language !== "en") {
      const translationResult = await translateMessage({
        text: botText,
        targetLanguage: language,
      });
      botText = translationResult.translatedText;
    }

    // 4. Suggest replies based on the new conversation state
    const historyForSuggestions = `${conversationHistory}\nBot: ${botText}`;
    const suggestionsResult = await suggestReplies({
      conversationHistory: historyForSuggestions,
    });

    return {
      botText,
      sentiment,
      suggestions: suggestionsResult.suggestedReplies,
    };
  } catch (error) {
    console.error("An error occurred in the AI action:", error);
    return {
      botText: "",
      sentiment: "neutral",
      suggestions: [],
      error: "无法从 AI 获取响应。请重试。",
    };
  }
}
