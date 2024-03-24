import { getSession, useSession } from 'next-auth/react';

export default function Profile() {
    const [session] = useSession();

    if (!session) return <p>접근 권한이 없습니다. 로그인해주세요.</p>;

    return (
        <div>
            <h1>프로필</h1>
            <p>환영합니다, {session.user.email}!</p>
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
}
