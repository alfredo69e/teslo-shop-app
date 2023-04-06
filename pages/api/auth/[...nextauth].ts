import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { dbUsers } from '@/db';


export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'custom login',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'correo@google.com' },
        password: { label: 'Password', type: 'password', placeholder: 'password' },
      },

      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        return await dbUsers.checkUSerEmailPassword( credentials!.email, credentials!.password );
      }
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),

  ],

  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },

  session: {
    maxAge: 2592000,
    strategy: 'jwt',
    updateAge: 86400
  },

  callbacks: {

    async jwt({ token, account, user }) {

        // console.log( { token, account, user } );
        if( account ) {

          token.accessToken = account.access_token;

          switch ( account.type ) {
            case 'oauth':
              token.user = await dbUsers.oauthToDbUser( user?.email || '',  user?.name || '');
              break;
            case 'credentials':
              token.user = user;
              break;
          }

        }

      return token;
    },

    /**
     * This function sets the access token and user ID in the session object and returns it.
     * @param  - - `session`: an object representing the user's session, which can be used to store
     * data that needs to persist across requests.
     * @returns The `session` object is being returned.
     */
    async session({ session, token, user }) {

      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken;

      // console.log({ session });
      
      session.user = token.user as any;
    
    return session
    }
  }
})
