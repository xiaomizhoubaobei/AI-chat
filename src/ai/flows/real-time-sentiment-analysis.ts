// RealtimeSentimentAnalysis
'use server';
/**
 * @fileOverview This file defines a Genkit flow for real-time sentiment analysis of user messages in a chatbot.
 *
 * - analyzeSentiment - Analyzes the sentiment of a given text message and provides a sentiment score and label.
 * - SentimentAnalysisInput - The input type for the analyzeSentiment function, containing the text message to analyze.
 * - SentimentAnalysisOutput - The return type for the analyzeSentiment function, containing the sentiment score and label.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SentimentAnalysisInputSchema = z.object({
  text: z.string().describe('The text message to analyze for sentiment.'),
});
export type SentimentAnalysisInput = z.infer<typeof SentimentAnalysisInputSchema>;

const SentimentAnalysisOutputSchema = z.object({
  sentimentScore: z
    .number()
    .describe(
      'A numerical score indicating the sentiment of the text, ranging from -1 (negative) to 1 (positive).'
    ),
  sentimentLabel: z
    .string()
    .describe('A label indicating the overall sentiment (e.g., positive, negative, neutral).'),
});
export type SentimentAnalysisOutput = z.infer<typeof SentimentAnalysisOutputSchema>;

export async function analyzeSentiment(input: SentimentAnalysisInput): Promise<SentimentAnalysisOutput> {
  return analyzeSentimentFlow(input);
}

const sentimentAnalysisPrompt = ai.definePrompt({
  name: 'sentimentAnalysisPrompt',
  input: {schema: SentimentAnalysisInputSchema},
  output: {schema: SentimentAnalysisOutputSchema},
  prompt: `You are a sentiment analysis expert. Analyze the sentiment of the following text and provide a sentiment score between -1 and 1, and a sentiment label (positive, negative, or neutral).

Text: {{{text}}}

Output:
Sentiment Score: 
Sentiment Label:`, // Ensure LLM returns schema compliant output
});

const analyzeSentimentFlow = ai.defineFlow(
  {
    name: 'analyzeSentimentFlow',
    inputSchema: SentimentAnalysisInputSchema,
    outputSchema: SentimentAnalysisOutputSchema,
  },
  async input => {
    const {output} = await sentimentAnalysisPrompt(input);
    return output!;
  }
);
