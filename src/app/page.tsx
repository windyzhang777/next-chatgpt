"use client";

import { PromptForm } from "@/components/PromptForm";
import { useEffect, useState } from "react";

export default function Home() {
  const [choices, setChoices] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchOpenAI = async (prompt: any) => {
    setIsFetching(true);
    const res = await fetch("api/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setChoices(() => {
      setIsFetching(false);
      return data.choices;
    });
  };

  const reply = isFetching ? (
    <>Fetching...</>
  ) : (
    choices.map((choice) => (
      <div
        className="mt-2 p-2 rounded-sm shadow-md"
        key={choice.id}
      >
        {choice.message.content}
      </div>
    ))
  );

  return (
    <main>
      <h2 className="font-bold">Grumpy ChatGPT</h2>
      <PromptForm
        fetchOpenAI={fetchOpenAI}
        isFetching={isFetching}
      />
      {reply}
    </main>
  );
}
