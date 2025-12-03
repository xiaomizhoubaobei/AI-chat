export type Sender = "user" | "bot";

export type Sentiment = "positive" | "negative" | "neutral";

export type Message = {
  id: string;
  text: string;
  sender: Sender;
  sentiment?: Sentiment;
};

export type Personality = "友好" | "正式" | "幽默" | "自定义";
