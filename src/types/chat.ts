// AI 对话类型定义

export type ChatRole = "user" | "assistant" | "system";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type ChatRequest = {
  messages: ChatMessage[];
};

export type ChatStreamEvent =
  | { delta: string }
  | { done: true }
  | { error: string };
