# AI 聊天机器人 Plus

这是一个使用 Next.js、Genkit 和 ShadCN UI 构建的高级 AI 聊天机器人应用程序。它展示了如何将多种 AI 功能集成到一个连贯且用户友好的界面中。

## 功能

- **可定制的聊天机器人个性**: 用户可以从预设的个性（友好、正式、幽默）中选择，或创建自己的自定义个性。
- **实时情绪分析**: 分析用户消息的情绪（积极、消极、中性）并显示相应的图标。
- **建议回复**: 根据对话上下文，AI 会生成相关的回复建议，以帮助引导对话。
- **消息翻译**: 聊天机器人的回复可以实时翻译成多种语言。
- **专门的设置页面**: 一个独立的页面，用于配置聊天机器人的所有行为和功能。
- **响应式设计**: 应用程序在桌面和移动设备上都能良好运行。

## 技术栈

- **前端**: Next.js (App Router), React, TypeScript
- **UI**: ShadCN UI, Tailwind CSS, Lucide React
- **AI**: Google Genkit
- **核心依赖**: `react-hook-form`, `zod`

## 如何开始

1.  **安装依赖**:
    ```bash
    npm install
    ```

2.  **运行开发服务器**:
    ```bash
    npm run dev
    ```

    在浏览器中打开 [http://localhost:9002](http://localhost:9002) 查看应用。

3.  **运行 Genkit Flows (用于 AI 功能)**:
    在另一个终端中，运行：
    ```bash
    npm run genkit:watch
    ```

## 项目结构

- `src/app/`: Next.js 的 App Router 页面。
  - `page.tsx`: 主聊天界面。
  - `settings/page.tsx`: 设置页面。
  - `actions.ts`: 调用 AI 流程的服务器操作。
- `src/ai/flows/`: 包含所有 Genkit AI 流程。
  - `chatbot-personality.ts`: 处理聊天机器人的个性化回复。
  - `real-time-sentiment-analysis.ts`: 分析文本情绪。
  - `suggested-replies.ts`: 生成建议回复。
  - `translate-messages.ts`: 翻译文本。
- `src/components/`: 可重用的 React 组件。
  - `chat/`: 与聊天功能相关的组件。
  - `ui/`: 从 ShadCN UI 生成的 UI 组件。
- `src/context/`: React 上下文提供程序。
  - `settings-context.tsx`: 管理和提供整个应用的设置。
- `src/lib/`: 工具函数、类型定义和静态数据。