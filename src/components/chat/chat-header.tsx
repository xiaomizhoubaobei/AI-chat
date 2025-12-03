import Link from "next/link";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { Personality } from "@/lib/types";

interface ChatHeaderProps {
  personality: Personality;
}

export function ChatHeader({ personality }: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 border-b h-14">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="md:hidden" />
        <div>
          <h1 className="text-xl font-bold font-headline">AI 聊天机器人 Plus</h1>
          <p className="text-sm text-muted-foreground">
            使用个性: <span className="font-semibold">{personality}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
         <Link href="/settings" passHref>
           <Button variant="ghost" size="icon" aria-label="设置">
              <Settings className="w-5 h-5" />
           </Button>
         </Link>
         <SidebarTrigger className="hidden md:flex" />
      </div>
    </header>
  );
}