import { config } from 'dotenv';
config();

import '@/ai/flows/suggested-replies.ts';
import '@/ai/flows/real-time-sentiment-analysis.ts';
import '@/ai/flows/translate-messages.ts';
import '@/ai/flows/chatbot-personality.ts';