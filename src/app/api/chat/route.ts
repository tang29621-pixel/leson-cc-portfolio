import { streamCompletion } from "@/lib/ai/providers";
import { buildSystemPrompt } from "@/lib/ai/prompts";
import type { ChatMessage } from "@/types/chat";

// 注意：不声明 runtime = "edge"。
// EdgeOne Pages 的函数环境与 Vercel Edge Runtime 实现不同，显式声明 edge 可能导致
// 函数执行异常；本路由只用标准 fetch / ReadableStream，Node 运行时（默认）完全兼容。
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const apiKey = process.env.AI_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "AI_API_KEY 未配置。请在 .env.local 设置。" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  let body: { messages: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 形状校验：messages 必须是数组 + 每条是 {role, content} + 长度上限
  if (!Array.isArray(body?.messages)) {
    return new Response(
      JSON.stringify({ error: "messages 必须是数组" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }
  if (body.messages.length > 50) {
    return new Response(
      JSON.stringify({ error: "messages 数量上限 50 条" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }
  const rawMessages = body.messages.filter(
    (m): m is { role: "user" | "assistant"; content: string } =>
      m != null &&
      typeof m === "object" &&
      (m.role === "user" || m.role === "assistant") &&
      typeof m.content === "string" &&
      m.content.length <= 8000,
  );
  const messages: { role: "user" | "assistant"; content: string }[] = [];
  for (const m of rawMessages) {
    messages.push({ role: m.role, content: m.content });
  }

  try {
    const stream = await streamCompletion({
      provider: process.env.AI_PROVIDER || "qwen",
      apiKey,
      model: process.env.AI_MODEL,
      baseURL: process.env.AI_BASE_URL,
      system: buildSystemPrompt(),
      messages,
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        // 不设 Connection 头：hop-by-hop 头在 HTTP/2 下非法，CDN 可能因此拒绝响应
      },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message || "Stream failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
