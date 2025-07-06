import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/utility/dbConnect";
import { User } from "@/models/UserModel";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            checks: 'none'
        }),
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                username: { label: "Email", type: "email", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    await dbConnect();

                    const { username: email, password } = credentials as { username: string; password: string };

                    if (!email || !password) {
                        throw new Error("Username and password are required");
                    }

                    const user = await User.findOne({ email: email });

                    if (!user) {
                        throw new Error("Invalid userName or password");
                    }

                    const isPasswordValid = await bcrypt.compare(password, user?.password);
                    if (!isPasswordValid) {
                        throw new Error("Invalid userName or password");
                    }

                    return { id: user._id, email: user.email, isVerified: user.isVerified };
                } catch (error) {
                    console.error("Authentication error:", error);
                    if (error instanceof Error) {
                        throw new Error(error.message || "An unexpected error occurred. Please try again later.");
                    } else {
                        throw new Error("An unexpected error occurred. Please try again later.");
                    }
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account, profile }) {
            if (account?.provider === "google") {
                token.email = profile?.email;
                token.name = profile?.name;

                // Save the user to the database if they don't already exist
                await dbConnect();
                const existingUser = await User.findOne({ email: profile?.email });
                if (!existingUser) {
                    const newUser = new User({
                        email: profile?.email,
                        password: "google",
                        provider: account.provider,
                        providerId: account.providerAccountId,
                        isVerified: true,
                    });
                    await newUser.save();
                }
            }
            if (user) {
                token._id = user._id?.toString();
                token.email = user.email;
                token.isVerified = user.isVerified;
            }
            if (token.email) {
                await dbConnect();
                const dbUser = await User.findOne({ email: token.email });
                if (dbUser) {
                    token.isVerified = dbUser.isVerified;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token.id as string;
                session.user.email = token.email as string;
                session.user.isVerified = token.isVerified as boolean;
            }
            return session;
        }
    },
    pages: {
        error: '/login'
    },
    session: {
        strategy: 'jwt',
    },

    secret: process.env.NEXTAUTH_SECRET
} 