import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {SessionProvider} from 'next-auth/react';
import {Hydrate, QueryClient, QueryClientProvider} from 'react-query';
import {useState} from 'react';

function MyApp({Component, pageProps: {session, ...pageProps}}: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default MyApp
