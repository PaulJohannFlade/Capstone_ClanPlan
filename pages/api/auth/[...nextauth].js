import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    process.env.VERCEL_ENV === "preview"
      ? CredentialsProvider({
          name: "credentials",
          credentials: {
            username: {
              label: "Username",
              type: "text",
              placeholder: "username",
            },
            password: { label: "Password", type: "password" },
          },
          async authorize(credentials) {
            if (
              credentials.username === "turtle" &&
              credentials.password === "turtle"
            ) {
              return {
                name: "New Turtle",
                email: "test@example.com",
              };
            } else if (
              credentials.username === "clanplan" &&
              credentials.password === "clanplan"
            ) {
              return {
                name: "New User",
                email: "newUser@clanPlan.com",
              };
            } else {
              return null;
            }
          },
        })
      : GithubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET,
        }),
    // ...add more providers here
  ],
};
export default NextAuth(authOptions);
