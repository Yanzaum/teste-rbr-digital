'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ChakraProvider>
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools buttonPosition='bottom-left' initialIsOpen={false} />
            </QueryClientProvider>
        </ChakraProvider>
    )
}