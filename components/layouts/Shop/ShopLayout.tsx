import React, { FC, ReactNode } from 'react';
import Head from 'next/head';
import { DrawerMenu, NavBar } from './../../';

interface Props {
    title: string,
    pageDescription: string,
    imageUrl?: string,
    children: ReactNode
}

export const ShopLayout: FC<Props> = ({ title, pageDescription, imageUrl, children }) => {
  return (
    <>
        <Head>
            <title>{ title }</title>
            <meta name='description' content={ pageDescription } />

            <meta name='og:title' content={ title } />
            <meta name='og:description' content={ pageDescription } />
            {
                imageUrl && (
                    <meta name='og:image' content={ imageUrl } />
                )
            }
        </Head>

        <nav>
            <NavBar/>
        </nav>

        <DrawerMenu />

        <main style={{ margin: '80px auto', maxWidth: '1440px', padding: '0px 30px' }}>
            { children }
        </main>
    </>
  )
}
