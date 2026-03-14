"use client";

import type { Conversation } from "@/types/message";
import { ConversationAvatar } from "./conversation-avatar";
import { cn } from "@/lib/utils";

interface InboxItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

export function InboxItem({ conversation, isActive, onClick }: InboxItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-start gap-3 px-3 py-3 rounded-xl text-left transition-colors",
        isActive
          ? "bg-[#CCFBF1]"
          : "hover:bg-[#F8FAFC]"
      )}
      aria-selected={isActive}
    >
      <ConversationAvatar initials={conversation.participantInitials} size="md" />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className={cn("text-sm truncate", conversation.unread ? "font-bold text-[#0F172A]" : "font-medium text-[#0F172A]")}>
            {conversation.participantName}
          </span>
          <span className="text-xs text-[#94A3B8] shrink-0">{conversation.timestamp}</span>
        </div>

        <div className="flex items-center justify-between gap-2 mt-0.5">
          <p className="text-xs text-[#64748B] truncate">{conversation.lastMessage}</p>
          {conversation.unread && (
            <span className="shrink-0 text-[10px] font-semibold bg-[#0D9488] text-white px-1.5 py-0.5 rounded-full">
              Unread
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
