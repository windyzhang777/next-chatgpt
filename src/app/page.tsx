"use client";

import { PromptForm } from "@/components/PromptForm";
import { useState } from "react";

export enum SYSTEM_TONE {
  Assistant = "You are an assistant.",
  Grumpy = "You are very grumpy. Please answer my questions with sarcasm, grumpiness, and anger.",
}

export interface CONVERSATION {
  q: string;
  a: string;
}

export default function Home() {
  const [isFetching, setIsFetching] = useState(false);
  const [tone, setTone] =
    useState<keyof typeof SYSTEM_TONE>("Assistant");
  const [conversations, setConversations] = useState<
    CONVERSATION[]
  >([]);

  const fetchOpenAI = async (prompt: any) => {
    setIsFetching(true);
    setConversations((prev) => [
      { q: prompt, a: "" },
      ...prev,
    ]);
    const res = await fetch("api/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, tone }),
    });
    const data = await res.json();
    if (data) {
      setIsFetching(false);
      setConversations((prev) => {
        const updated = [...prev];
        updated.splice(0, 1, {
          q: prompt,
          a: data.choices[0].message.content,
        });
        return updated;
      });
    }
  };

  return (
    <main>
      <h2 className="font-bold flex gap-1 items-center">
        <select
          className="w-[6rem]"
          name="tones"
          id="tone-select"
          onChange={(e) =>
            setTone(
              e.target.value as keyof typeof SYSTEM_TONE
            )
          }
          value={tone}
        >
          {Object.keys(SYSTEM_TONE).map((content) => (
            <option value={content}>{content}</option>
          ))}
        </select>
        ChatGPT
      </h2>
      <PromptForm
        fetchOpenAI={fetchOpenAI}
        isFetching={isFetching}
      />
      {isFetching && <>loading...</>}
      {conversations.map((cvst, index) => (
        <div key={index} className="flex flex-col">
          {cvst.a && (
            <pre className="mt-2 p-2 rounded-sm shadow-md leading-4 text-wrap w-max max-w-[100%] font-sans">
              {cvst.a}
            </pre>
          )}
          {cvst.q && (
            <div className="mt-2 p-2 rounded-sm shadow-md bg-green-400 w-max self-end">
              {cvst.q}
            </div>
          )}
        </div>
      ))}
    </main>
  );
}
