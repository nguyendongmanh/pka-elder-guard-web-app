export type MessageSender = "self" | "other";

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderInitials: string;
  content: string;
  timestamp: string;
  direction: MessageSender;
  reactions?: string;
}

export interface Conversation {
  id: string;
  participantName: string;
  participantInitials: string;
  participantRole: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  unreadCount?: number;
  messages: ChatMessage[];
}
