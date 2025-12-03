'use server';
/**
 * @fileOverview This file defines a Genkit flow for setting and using chatbot personalities.
 *
 * - setChatbotPersonality - A function that allows users to select or create a chatbot personality.
 * - ChatbotPersonalityInput - The input type for the setChatbotPersonality function.
 * - ChatbotPersonalityOutput - The return type for the setChatbotPersonality function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotPersonalityInputSchema = z.object({
  personalityDescription: z
    .string()
    .describe(
      'A description of the desired chatbot personality, including tone and style.'
    ),
  userMessage: z.string().describe('The user message to be responded to.'),
});
export type ChatbotPersonalityInput = z.infer<typeof ChatbotPersonalityInputSchema>;

const ChatbotPersonalityOutputSchema = z.object({
  chatbotResponse: z.string().describe('The chatbot response, tailored to the specified personality.'),
});
export type ChatbotPersonalityOutput = z.infer<typeof ChatbotPersonalityOutputSchema>;

export async function setChatbotPersonality(input: ChatbotPersonalityInput): Promise<ChatbotPersonalityOutput> {
  return chatbotPersonalityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotPersonalityPrompt',
  input: {schema: ChatbotPersonalityInputSchema},
  output: {schema: ChatbotPersonalityOutputSchema},
  prompt: `你是具有以下个性的聊天机器人: {{{personalityDescription}}}。

用适当的语气和风格回应以下用户消息:

用户消息: {{{userMessage}}}`,
});

const chatbotPersonalityFlow = ai.defineFlow(
  {
    name: 'chatbotPersonalityFlow',
    inputSchema: ChatbotPersonalityInputSchema,
    outputSchema: ChatbotPersonalityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
