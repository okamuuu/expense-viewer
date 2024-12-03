import "@/styles/globals.css"
import "@radix-ui/themes/styles.css"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { AppProps } from "next/app"
import { Theme } from "@radix-ui/themes"

import { Toaster } from "react-hot-toast"

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Theme>
          <Component {...pageProps} />
        </Theme>
      </QueryClientProvider>
      <Toaster />
    </>
  )
}

export default MyApp
