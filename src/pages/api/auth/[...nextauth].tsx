import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                // if (credentials.username === "user" && credentials.password === "password") {
                // 사용자 인증이 성공한 경우
                console.log('credentials....');
                console.log(credentials);
                return { id: 1, name: "John Smith", email: "jsmith@example.com" };
                // } else {
                //     // 인증 실패
                //     return null;
                // }
            }
        })
    ],
    session: {
        jwt: true,
    },
    pages: {
        signIn: '/auth/signin', // 로그인 페이지 경로
        error: '/auth/error', // 에러 페이지 경로
    }
});
