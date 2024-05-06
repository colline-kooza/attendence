import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcrypt';
import db from '@/prisma/db';
import { LoginProps, User } from '@/types/types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authOptions:NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as any,
    secret: process.env.NEXTAUTH_SECRET || '', 
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'kooza@gmail.com' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials: any) {
                try {
                    const existingUser = await db.student.findFirst({
                        where: { email: credentials.email },
                    });

                    if (!existingUser) {
                        throw { error: 'No user found', status: 401 };
                    }

                    if (!existingUser.password) {
                        throw { error: 'User password is null', status: 401 };
                    }

                    const passwordMatch = await compare(
                        credentials.password,
                        existingUser.password
                    );

                    if (!passwordMatch) {
                        throw { error: 'Password Incorrect', status: 401 };
                    }

                    const user: User = {
                        id: existingUser.id,
                        name: existingUser.name,
                        email: existingUser.email,
                        role: existingUser.role,
                        image: existingUser.image || '',
                        emailVerified: existingUser.emailVerified,
                    };

                    return user;
                } catch (error) {
                    console.error('Authentication error:', error);
                    throw { error: 'Something went wrong', status: 401 };
                }
            },
        }),
    ],
    callbacks: {
        async session({ session, token }:any) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.role = token.role;
                session.user.image = token.image || '';
                session.user.emailVerified = token.emailVerified;
            }
            // console.log(token)
            return session;
        },
        async jwt({ token, user }:any) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
                token.image = user.image || '';
                token.emailVerified = user.emailVerified;
            }
            return token;
        },
    },
};

export default authOptions;
