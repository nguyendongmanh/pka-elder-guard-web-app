"use client";

import { useState, useCallback } from "react";
import type { Conversation, ChatMessage } from "@/types/message";
import { InboxPanel } from "./inbox-panel";
import { ConversationPanel } from "./conversation-panel";
import { PatientContextPanel } from "./patient-context-panel";

interface MessagesLayoutProps {
  initialConversations: Conversation[];
}

export function MessagesLayout({ initialConversations }: MessagesLayoutProps) {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeId, setActiveId] = useState(initialConversations[0]?.id ?? "");

  const activeConversation = conversations.find((c) => c.id === activeId) ?? conversations[0];

  const handleSend = useCallback(
    (text: string) => {
      const newMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        senderId: "self",
        senderName: "You",
        senderInitials: "JD",
        content: text,
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        direction: "self",
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeId
            ? { ...c, messages: [...c.messages, newMsg], lastMessage: text }
            : c
        )
      );
    },
    [activeId]
  );

  return (
    <div className="grid grid-cols-[260px_1fr_240px] gap-4 h-full min-h-0">
      <InboxPanel
        conversations={conversations}
        activeId={activeId}
        onSelect={setActiveId}
      />

      {activeConversation && (
        <ConversationPanel
          conversation={activeConversation}
          messages={activeConversation.messages}
          onSend={handleSend}
        />
      )}

      <PatientContextPanel />
    </div>
  );
}
