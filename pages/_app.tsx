import '@/styles/globals.css';
import 'animate.css';
import { CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr';
import { lightTheme } from './../themes';
import { UIProvider, CartProvider, AuthProvider } from './../context';
import { SessionProvider } from 'next-auth/react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (

    <SessionProvider session={ session }> 
      <PayPalScriptProvider options={{ 'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT || '' }}> 
        <SWRConfig value={{
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
          }}>
          <AuthProvider>
            <CartProvider>
                <UIProvider>
                  <ThemeProvider theme={ lightTheme }>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <Component {...pageProps} />
                  </ThemeProvider>
                </UIProvider>
            </CartProvider>
          </AuthProvider>
        </SWRConfig>
      </PayPalScriptProvider>
    </SessionProvider>
    )
    
}
