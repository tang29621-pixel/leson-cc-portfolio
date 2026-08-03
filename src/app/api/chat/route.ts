import { streamCompletion } from "@/lib/ai/providers";
import { buildSystemPrompt } from "@/lib/ai/prompts";
import type { ChatMessage } from "@/types/chat";

export const runtime = "edge";
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
        Connection: "keep-alive",
      },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message || "Stream failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
