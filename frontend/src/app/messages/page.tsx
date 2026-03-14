import { AppShell } from "@/components/layout/app-shell";
import { MessagesLayout } from "@/components/messages/messages-layout";
import { MOCK_CONVERSATIONS } from "@/lib/mock-messages";

export default function MessagesPage() {
  return (
    <AppShell>
      <div className="flex flex-col h-full gap-4 min-h-0">
        <h1 className="text-xl font-bold text-[#0F172A] shrink-0">Messages</h1>
        <div className="flex-1 min-h-0">
          <MessagesLayout initialConversations={MOCK_CONVERSATIONS} />
        </div>
      </div>
    </AppShell>
  );
}
