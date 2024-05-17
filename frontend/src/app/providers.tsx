'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function Providers({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient()

    return (
        <ChakraProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </ChakraProvider>
    )
}