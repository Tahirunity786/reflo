import jwt from 'jsonwebtoken';
import * as cookie from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'my_super_secret';

export default function handler(req, res) {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.token;

  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.status(200).json({ userId: decoded.userId });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}
