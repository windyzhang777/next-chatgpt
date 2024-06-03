import React, {
  Dispatch,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

type PromptFormProps = {
  fetchOpenAI: (a: string) => void;
  isFetching: boolean;
};

export const PromptForm = ({
  fetchOpenAI,
  isFetching,
}: PromptFormProps) => {
  const [prompt, setPrompt] = useState("");
  return (
    <form
      className="mt-2 flex gap-1 items-center"
      onSubmit={(e) => {
        e.preventDefault();
        // validation
        if (!prompt) return;
        fetchOpenAI(prompt);
        setPrompt("");
      }}
    >
      <input
        className="grow p-1 border rounded-sm"
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask a question..."
      />
      <input
        className="p-1 w-20 text-center border rounded-sm bg-black text-white cursor-pointer disabled:opacity-25 disabled:text-gray-200"
        type="submit"
        value="Send"
        disabled={isFetching}
      />
    </form>
  );
};
