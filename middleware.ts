import { jwt } from '@/utils';
import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'

export async function middleware( req: NextRequest, ev: NextFetchEvent ) {

    if ( req.nextUrl.pathname.startsWith('/checkout' )) {

        const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET! });

        // console.log('session ', session);
        
        // const token = req.cookies.get('token')?.value;
        if( !session ) {
          const reqPageName = req.nextUrl.pathname;
          const url = req.nextUrl.clone();
          url.pathname = `/auth/login`;
          url.search = `p=${ reqPageName }`;
          
          return NextResponse.redirect( url );
        } 

        return NextResponse.next();
    }

    
}


export const config = {
    matcher: ['/checkout/address', '/checkout/summary' ],
  }



