'use server';

/**
 * @fileOverview A flow for suggesting follow-up replies in a conversation.
 *
 * - suggestReplies - A function that takes conversation history and returns suggested replies.
 * - SuggestRepliesInput - The input type for the suggestReplies function.
 * - SuggestRepliesOutput - The return type for the suggestReplies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRepliesInputSchema = z.object({
  conversationHistory: z
    .string()
    .describe('The history of the conversation between the user and the chatbot.'),
});
export type SuggestRepliesInput = z.infer<typeof SuggestRepliesInputSchema>;

const SuggestRepliesOutputSchema = z.object({
  suggestedReplies: z
    .array(z.string())
    .describe('An array of suggested follow-up replies for the user.'),
});
export type SuggestRepliesOutput = z.infer<typeof SuggestRepliesOutputSchema>;

export async function suggestReplies(input: SuggestRepliesInput): Promise<SuggestRepliesOutput> {
  return suggestRepliesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRepliesPrompt',
  input: {schema: SuggestRepliesInputSchema},
  output: {schema: SuggestRepliesOutputSchema},
  prompt: `Given the following conversation history, suggest three relevant follow-up replies for the user. Return the replies as a JSON array of strings.

Conversation History:
{{{conversationHistory}}}

Format the output as a JSON array of strings.`,
});

const suggestRepliesFlow = ai.defineFlow(
  {
    name: 'suggestRepliesFlow',
    inputSchema: SuggestRepliesInputSchema,
    outputSchema: SuggestRepliesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
