"use client";

import { useState, type KeyboardEvent } from "react";
import { Paperclip, SendHorizonal } from "lucide-react";

interface MessageInputProps {
  onSend: (text: string) => void;
}

export function MessageInput({ onSend }: MessageInputProps) {
  const [value, setValue] = useState("");

  function handleSend() {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex items-center gap-2 px-4 py-3 border-t border-[#E2E8F0] bg-white">
      <button
        className="p-2 rounded-lg text-[#64748B] hover:bg-[#F0FDFA] hover:text-[#0D9488] transition-colors"
        aria-label="Attach file"
      >
        <Paperclip size={18} />
      </button>

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type message..."
        className="flex-1 text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20"
        aria-label="Message input"
      />

      <button
        onClick={handleSend}
        disabled={!value.trim()}
        className="p-2 rounded-lg bg-[#0D9488] text-white hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Send message"
      >
        <SendHorizonal size={18} />
      </button>
    </div>
  );
}
