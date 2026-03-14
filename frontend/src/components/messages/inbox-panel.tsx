import type { Conversation } from "@/types/message";
import { InboxItem } from "./inbox-item";
import { Plus } from "lucide-react";

interface InboxPanelProps {
  conversations: Conversation[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function InboxPanel({ conversations, activeId, onSelect }: InboxPanelProps) {
  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#E2E8F0] shrink-0">
        <h2 className="text-base font-bold text-[#0F172A]">Inbox</h2>
        <button
          className="flex items-center gap-1.5 bg-[#0D9488] hover:bg-teal-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
          aria-label="New message"
        >
          <Plus size={14} />
          New Message
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {conversations.map((conv) => (
          <InboxItem
            key={conv.id}
            conversation={conv}
            isActive={conv.id === activeId}
            onClick={() => onSelect(conv.id)}
          />
        ))}
      </div>
    </div>
  );
}
