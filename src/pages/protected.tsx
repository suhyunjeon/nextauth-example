import { getSession } from "next-auth/react";

export default function ProtectedPage({ hasAdditionalPermission }) {
    return (
        <div>
            <h1>Protected Page</h1>
            <p>추가 권한이 확인되었습니다.</p>
        </div>
    );
}

async function checkUserPermission(key) {
    const response = await fetch('http://localhost:3000/api/validate', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    console.log('response....');
    console.log(response);

    if (!response.ok) {
        throw new Error('API 호출 실패');
    }

    const data = await response.json();
    return data.hasPermission;
}

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });
    console.log('protected session..');
    console.log(session);

    // 세션이 없다면, 로그인 페이지로 리다이렉트
    if (!session) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        };
    }

    const key = 'ping';
    const hasAdditionalPermission = await checkUserPermission(key);

    if (!hasAdditionalPermission) {
        // 권한이 없는 경우 unauthorized 페이지로 리다이렉트
        return {
            redirect: {
                destination: '/unauthorized',
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
}
