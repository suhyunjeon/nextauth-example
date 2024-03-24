import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/router';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter(); // useRouter 훅 사용

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            redirect: false,
            username,
            password,
        });

        if (!result.error) {
            console.log("로그인 성공!");
            router.push('/protected');
        } else {
            console.log("로그인 실패:", result.error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Password
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit">Log In</button>
        </form>
    );
}
