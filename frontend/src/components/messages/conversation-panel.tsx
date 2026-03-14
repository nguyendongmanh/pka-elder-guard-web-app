"use client";

import { useEffect, useRef } from "react";
import type { Conversation, ChatMessage } from "@/types/message";
import { ConversationAvatar } from "./conversation-avatar";
import { MessageBubble } from "./message-bubble";
import { MessageInput } from "./message-input";
import { Phone, Video, MoreHorizontal } from "lucide-react";

interface ConversationPanelProps {
  conversation: Conversation;
  messages: ChatMessage[];
  onSend: (text: string) => void;
}

export function ConversationPanel({ conversation, messages, onSend }: ConversationPanelProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#E2E8F0] shrink-0">
        <div className="flex items-center gap-3">
          <ConversationAvatar initials={conversation.participantInitials} size="md" />
          <div>
            <p className="text-sm font-bold text-[#0F172A]">{conversation.participantName}</p>
            <p className="text-xs text-[#64748B]">{conversation.participantRole}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 rounded-lg text-[#64748B] hover:bg-[#F0FDFA] hover:text-[#0D9488] transition-colors" aria-label="Voice call">
            <Phone size={16} />
          </button>
          <button className="p-2 rounded-lg text-[#64748B] hover:bg-[#F0FDFA] hover:text-[#0D9488] transition-colors" aria-label="Video call">
            <Video size={16} />
          </button>
          <button className="p-2 rounded-lg text-[#64748B] hover:bg-[#F0FDFA] transition-colors" aria-label="More options">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-[#94A3B8]">No messages yet. Start the conversation.</p>
          </div>
        ) : (
          messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <MessageInput onSend={onSend} />
    </div>
  );
}
