"use client";

import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import type { Personality } from '@/lib/types';

interface Language {
    value: string;
    label: string;
}

interface SettingsContextType {
    personality: Personality;
    setPersonality: Dispatch<SetStateAction<Personality>>;
    customPersonality: string;
    setCustomPersonality: Dispatch<SetStateAction<string>>;
    language: string;
    setLanguage: Dispatch<SetStateAction<string>>;
    showSentiment: boolean;
    setShowSentiment: Dispatch<SetStateAction<boolean>>;
    enableSuggestions: boolean;
    setEnableSuggestions: Dispatch<SetStateAction<boolean>>;
    personalities: Record<Personality, string>;
    languages: Language[];
}

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const personalities: Record<Personality, string> = {
  "友好": "你是一个友好而热情的聊天机器人。你乐于助人，总是努力保持积极。",
  "正式": "你是一个正式而专业的聊天机器人。你精确、有礼貌，并使用正式语言。",
  "幽默": "你是一个机智幽默的聊天机器人。你喜欢开玩笑和使用讽刺，但你仍然乐于助人。",
  "自定义": ""
};

const languages: Language[] = [
  { value: 'zh', label: '中文 (Chinese)' },
  { value: 'en', label: '英语 (English)' },
  { value: 'es', label: '西班牙语 (Spanish)' },
  { value: 'fr', label: '法语 (French)' },
  { value: 'de', label: '德语 (German)' },
  { value: 'ja', label: '日语 (Japanese)' },
];

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    const [personality, setPersonality] = useState<Personality>("友好");
    const [customPersonality, setCustomPersonality] = useState("");
    const [language, setLanguage] = useState("zh");
    const [showSentiment, setShowSentiment] = useState(true);
    const [enableSuggestions, setEnableSuggestions] = useState(true);

    return (
        <SettingsContext.Provider value={{
            personality,
            setPersonality,
            customPersonality,
            setCustomPersonality,
            language,
            setLanguage,
            showSentiment,
            setShowSentiment,
            enableSuggestions,
            setEnableSuggestions,
            personalities,
            languages
        }}>
            {children}
        </SettingsContext.Provider>
    );
};