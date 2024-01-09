import { signOut } from "next-auth/react";
import { DefaultSession, NextAuthOptions, getServerSession } from "next-auth";
import { prisma } from "./db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import Email from "next-auth/providers/email";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
    }
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    callbacks: {
        jwt: async ({ token }) => {
            //finds the user in the database
            const db_user = await prisma.user.findFirst({
                where: {
                    email: token.email,
                },
            });
            //binds the db user id to the token
            if (db_user) {
                token.id = db_user.id;
                // Update user's information in the database
                await prisma.user.update({
                    where: { id: db_user.id },
                    data: { name: token.name ? token.name : token.email?.split("@")[0] },
                });
            }
            return token;
        },
        session: ({ session, token }) => {
            //binds token stuff to session
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name ? token.name : token.email?.split("@")[0];
                session.user.email = token.email;
                session.user.image = token.picture;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET as string,
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        Email({
            server: {
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT),
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        }),
    ],
    pages: {
        signIn: "/auth/signin",
        verifyRequest: "/auth/verify-request",
        error: "/auth/error",
    },
};

export const getAuthSession = () => {
    return getServerSession(authOptions);
};

export const signOutUser = ({ redirect }: { redirect?: string }) => {
    return signOut({ callbackUrl: redirect ? redirect : "/" });
};
