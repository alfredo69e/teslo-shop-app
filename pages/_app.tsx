import '@/styles/globals.css';
import 'animate.css';
import { CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr';
import { lightTheme } from './../themes';
import { UIProvider, CartProvider } from './../context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <SWRConfig value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}>
        <UIProvider>
          <ThemeProvider theme={ lightTheme }>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </SWRConfig>
    </CartProvider>
    )
    
}
