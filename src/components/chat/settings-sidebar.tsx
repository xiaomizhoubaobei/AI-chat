import { useContext } from 'react';
import { SettingsContext } from '@/context/settings-context';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
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
import { Bot, Languages, Settings, Sparkles, MessageSquareHeart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import type { Personality } from '@/lib/types';


export function SettingsSidebar() {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error("SettingsSidebar must be used within a SettingsProvider");
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
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="border-b h-14">
        <div className="flex items-center gap-3">
           <Settings className="w-6 h-6 text-primary" />
           <h2 className="text-lg font-semibold">聊天机器人设置</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='flex items-center gap-2'>
            <Bot className="w-4 h-4" />
            个性
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <p className="text-xs text-muted-foreground mb-4">选择或自定义聊天机器人的说话风格。</p>
            <RadioGroup
              value={personality}
              onValueChange={(value) => setPersonality(value as Personality)}
              className="space-y-3"
            >
              {Object.keys(personalities).map((p) => (
                <div key={p} className="flex items-center space-x-2">
                  <RadioGroupItem value={p} id={`p-${p}`} />
                  <Label htmlFor={`p-${p}`} className="font-normal">{p}</Label>
                </div>
              ))}
            </RadioGroup>
            {personality === '自定义' && (
              <Textarea
                placeholder="例如：一个乐于助人，但总是很疲惫和讽刺的聊天机器人。"
                value={customPersonality}
                onChange={(e) => setCustomPersonality(e.target.value)}
                className="mt-4 bg-secondary"
              />
            )}
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator />

        <SidebarGroup>
          <SidebarGroupLabel className='flex items-center gap-2'>
            <Languages className="w-4 h-4" />
            语言
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <p className="text-xs text-muted-foreground mb-4">选择聊天机器人回复的语言。</p>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full bg-secondary">
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
          </SidebarGroupContent>
        </SidebarGroup>
        
        <Separator />

        <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                功能
            </SidebarGroupLabel>
            <SidebarGroupContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                        <Label htmlFor="sentiment-switch" className="flex items-center gap-2">
                            <MessageSquareHeart className="w-4 h-4" />
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
                         <Label htmlFor="suggestions-switch" className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
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
            </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}