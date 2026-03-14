import type { ChatMessage } from "@/types/message";
import { ConversationAvatar } from "./conversation-avatar";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isSelf = message.direction === "self";

  return (
    <div className={cn("flex items-end gap-2", isSelf ? "flex-row-reverse" : "flex-row")}>
      {!isSelf && (
        <ConversationAvatar initials={message.senderInitials} size="sm" />
      )}

      <div className={cn("flex flex-col gap-1 max-w-[72%]", isSelf ? "items-end" : "items-start")}>
        {!isSelf && (
          <span className="text-xs font-semibold text-[#64748B] px-1">{message.senderName}</span>
        )}

        <div
          className={cn(
            "px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
            isSelf
              ? "bg-[#0D9488] text-white rounded-br-sm"
              : "bg-[#F1F5F9] text-[#0F172A] rounded-bl-sm"
          )}
        >
          {message.content}
        </div>

        <div className="flex items-center gap-2 px-1">
          <span className="text-[10px] text-[#94A3B8]">{message.timestamp}</span>
          {message.reactions && (
            <span className="text-xs bg-white border border-[#E2E8F0] rounded-full px-1.5 py-0.5 text-[#64748B]">
              {message.reactions}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
