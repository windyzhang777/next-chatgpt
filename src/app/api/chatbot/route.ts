import { NextResponse } from "next/server";
import OPENAI from "openai";

export const POST = async (request: Request) => {
  const openai = new OPENAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const { prompt, tone } = await request.json();

  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: tone,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0,
    max_tokens: 1024,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return NextResponse.json(res, { status: 200 });
};
