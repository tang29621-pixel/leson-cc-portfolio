"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import type { ChatMessage } from "@/types/chat";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // 组件卸载时取消未结束的请求，避免 React "state update on unmounted" 警告 + 流量浪费
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const send = useCallback(async (input: string) => {
    if (!input.trim() || streaming) return;

    const userMessage: ChatMessage = { role: "user", content: input.trim() };
    const next = [...messages, userMessage];
    setMessages([...next, { role: "assistant", content: "" }]);
    setStreaming(true);
    setError(null);

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
        signal: ctrl.signal,
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "Request failed");
        throw new Error(`HTTP ${res.status}: ${errText}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let buffer = "";
      let acc = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const payload = line.slice(6).trim();
          if (payload === "[DONE]") {
            setStreaming(false);
            return;
          }
          try {
            const json = JSON.parse(payload);
            if (json.error) {
              setError(json.error);
              setStreaming(false);
              return;
            }
            if (json.delta) {
              acc += json.delta;
              const final = acc;
              setMessages((m) => {
                const cur = [...m];
                cur[cur.length - 1] = { role: "assistant", content: final };
                return cur;
              });
            }
          } catch {
            // 忽略解析失败的行
          }
        }
      }
    } catch (err: any) {
      if (err.name === "AbortError") {
        // 用户中止，不报错
      } else {
        setError(err.message || "出错了，请稍后再试");
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }, [messages, streaming]);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    setStreaming(false);
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
  }, []);

  return { messages, streaming, error, send, stop, reset };
}
