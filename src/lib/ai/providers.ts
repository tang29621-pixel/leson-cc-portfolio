// 多家国内大模型适配层 - 都走 OpenAI 兼容协议
import OpenAI from "openai";

export type Provider = "doubao" | "qwen" | "deepseek";

const configMap: Record<Provider, { baseURL: string; defaultModel: string }> = {
  doubao: {
    baseURL: "https://ark.cn-beijing.volces.com/api/v3",
    defaultModel: "doubao-pro-32k",
  },
  qwen: {
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    defaultModel: "qwen-plus",
  },
  deepseek: {
    baseURL: "https://api.deepseek.com/v1",
    defaultModel: "deepseek-chat",
  },
};

export function getProviderConfig(provider: string) {
  const p = (provider || "qwen") as Provider;
  return configMap[p] ?? configMap.qwen;
}

export type ChatCompletionMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export async function streamCompletion(opts: {
  provider: string;
  apiKey: string;
  model?: string;
  baseURL?: string;
  system: string;
  messages: { role: "user" | "assistant"; content: string }[];
}): Promise<ReadableStream<Uint8Array>> {
  const cfg = getProviderConfig(opts.provider);
  const baseURL = opts.baseURL || cfg.baseURL;
  const model = opts.model || cfg.defaultModel;

  const client = new OpenAI({ apiKey: opts.apiKey, baseURL });

  const completion = await client.chat.completions.create({
    model,
    stream: true,
    temperature: 0.7,
    messages: [
      { role: "system", content: opts.system },
      ...opts.messages,
    ],
  });

  const encoder = new TextEncoder();
  return new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of completion) {
          const delta = chunk.choices?.[0]?.delta?.content || "";
          if (delta) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ delta })}\n\n`),
            );
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (err: any) {
        const msg = err?.message || "Unknown error";
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ error: msg })}\n\n`),
        );
        controller.close();
      }
    },
  });
}
