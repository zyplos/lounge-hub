import NextAuth, { NextAuthOptions, User, Session, Account } from "next-auth";
import { JWT } from "next-auth/jwt";
import DiscordProvider, { DiscordProfile } from "next-auth/providers/discord";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

// TODO: Create next-auth.d.ts to augment Session and User types
// declare module "next-auth" {
//   interface Session {
//     user: {
//       id?: string | null; // Or string, depending on your sub type
//       banner?: string | null;
//     } & DefaultSession["user"];
//   }
//   interface User {
//     banner?: string | null;
//   }
// }
// declare module "next-auth/jwt" {
//   interface JWT {
//     banner?: string | null;
//   }
// }


export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      authorization: { params: { scope: "identify" } },
    }),
  ],
  // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
  // https://next-auth.js.org/configuration/databases
  //
  // Notes:
  // * You must install an appropriate node_module for your database
  // * The Email provider requires a database (OAuth providers do not)
  //database: process.env.DATABASE_URL,

  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `jwt: true` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    // secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
    secret: process.env.NEXTAUTH_SECRET,
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    // signIn: '/auth/signin',  // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) { return true },
    // async redirect({ url, baseUrl }) { return baseUrl },
    async session({ session, token, user }: { session: Session; token: JWT; user: User }) {
      // User `any` for now, will be fixed by next-auth.d.ts
      (session.user as any).id = token.sub;
      (session.user as any).banner = token.banner;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }: { token: JWT; user?: User | null; account?: Account | null; profile?: DiscordProfile | null; isNewUser?: boolean }) {
      // wrapped in if since profile only exists when the user logs in, not subsequent jwt reads
      if (profile) {
        // The profile object from DiscordProvider might not have a banner directly,
        // or it might be named differently or need to be fetched.
        // For now, assuming profile has id and banner.
        // Ensure profile.banner is checked correctly.
        // DiscordProfile type has `banner` as `string | null | undefined`
        if (profile.banner) {
          const format = profile.banner.startsWith("a_") ? "gif" : "png";
          token.banner = `https://cdn.discordapp.com/banners/${profile.id}/${profile.banner}.${format}`;
        } else {
          // If profile.banner is null or undefined, set token.banner to null or handle as needed
          token.banner = null;
        }
      }
      return token;
    },
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // You can set the theme to 'light', 'dark' or use 'auto' to default to the
  // whatever prefers-color-scheme is set to in the browser. Default is 'auto'
  theme: {
    colorScheme: "dark", // "auto" | "dark" | "light"
    brandColor: "#ff3e3e", // Hex color code
    // logo: "" // Absolute URL to image
  },

  // Enable debug messages in the console if you are having problems
  debug: false,
};

export default NextAuth(authOptions);
