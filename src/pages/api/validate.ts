export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json({ hasPermission: false });
    } else {
        // 다른 HTTP 메소드에 대해 405 Method Not Allowed 응답
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
