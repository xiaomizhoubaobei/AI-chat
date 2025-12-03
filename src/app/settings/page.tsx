"use client";

import { useContext } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SettingsProvider, SettingsContext } from '@/context/settings-context';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import type { Personality } from '@/lib/types';

function SettingsPageContents() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("SettingsPageContents must be used within a SettingsProvider");
  }

  const {
    personality,
    setPersonality,
    customPersonality,
    setCustomPersonality,
    language,
    setLanguage,
    personalities,
    languages,
    showSentiment,
    setShowSentiment,
    enableSuggestions,
    setEnableSuggestions,
  } = context;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Link href="/">
            <Button size="icon" variant="outline" className="h-7 w-7">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">返回</span>
            </Button>
          </Link>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            聊天机器人设置
          </h1>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid w-full max-w-3xl flex-grow gap-6">
            <Card>
              <CardHeader>
                <CardTitle>个性</CardTitle>
                <CardDescription>
                  选择或自定义聊天机器人的说话风格。
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={personality}
                  onValueChange={(value) => setPersonality(value as Personality)}
                  className="grid grid-cols-2 gap-4 md:grid-cols-4"
                >
                  {Object.keys(personalities).map((p) => (
                    <Label
                      key={p}
                      htmlFor={`p-${p}`}
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                    >
                      <RadioGroupItem value={p} id={`p-${p}`} className="sr-only" />
                      {p}
                    </Label>
                  ))}
                </RadioGroup>
                {personality === '自定义' && (
                  <Textarea
                    placeholder="例如：一个乐于助人，但总是很疲惫和讽刺的聊天机器人。"
                    value={customPersonality}
                    onChange={(e) => setCustomPersonality(e.target.value)}
                    className="mt-4"
                  />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>功能</CardTitle>
                <CardDescription>
                  启用或禁用聊天机器人的特定功能。
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <Label htmlFor="sentiment-switch">
                      显示情绪分析
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      在您的消息旁边显示情绪图标。
                    </p>
                  </div>
                  <Switch
                    id="sentiment-switch"
                    checked={showSentiment}
                    onCheckedChange={setShowSentiment}
                  />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <Label htmlFor="suggestions-switch">
                      启用建议回复
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      在聊天输入框上方显示建议回复。
                    </p>
                  </div>
                  <Switch
                    id="suggestions-switch"
                    checked={enableSuggestions}
                    onCheckedChange={setEnableSuggestions}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>语言</CardTitle>
                <CardDescription>
                  选择聊天机器人回复的语言。
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="选择一种语言" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function SettingsPage() {
    return (
        <SettingsProvider>
            <SettingsPageContents />
        </SettingsProvider>
    )
}
