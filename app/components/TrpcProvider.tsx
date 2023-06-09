"use client"

import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {httpBatchLink} from "@trpc/client"
import {useState} from "react"
import { getBaseUrl, trpc } from "../utils/trpc"
import superjson from 'superjson'

export const TrpcProvider: React.FC<{children: React.ReactNode}> = p => {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          url: getBaseUrl() + "/api/trpc",
        }),
      ]
    })
  )
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {p.children}
      </QueryClientProvider>
    </trpc.Provider>
  )
}