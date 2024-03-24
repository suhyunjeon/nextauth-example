import { useSession } from 'next-auth/react';

export default function Page() {
  const [session, loading] = useSession();

  console.log('session...');
  console.log(session);
  if (loading) return <p>Loading...</p>;

  return (
      <div>
        {session ? (
            <p>환영합니다, {session.user.email}!</p>
        ) : (
            <p>접근 권한이 없습니다. 로그인해주세요.</p>
        )}
      </div>
  );
}
