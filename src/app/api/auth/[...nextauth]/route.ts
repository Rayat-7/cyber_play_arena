import NextAuth from "next-auth";
import { authOptions } from "../auth.config";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };








// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";

// const prisma = new PrismaClient();

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null;

//         const user = await prisma.admin.findUnique({
//           where: {
//             email: credentials.email,
//           },
//         });

//         if (user && bcrypt.compareSync(credentials.password, user.password)) {
//           return {
//             id: user.id.toString(), // Convert ID to string
//             email: user.email,
//             name: null, // Optional, you can return `name` or other properties if needed
//           };
//         }

//         return null;
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/auth/login",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user = {
//           ...(session.user || {}),
//           id: token.id as string,
//           email: token.email as string,
//         };
//       }
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
