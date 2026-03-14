"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { retry: 3, staleTime: 30000 } },
      })
  );
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
