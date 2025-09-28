const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || '999999';

function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    const payload = jwt.verify(token, secret);
    req.user = payload; // {id, Fullname, Email, role}
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

function requireAdmin(req, res, next) {
  requireAuth(req, res, () => {
    if (!req.user || req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
    next();
  });
}

module.exports = { requireAuth, requireAdmin };
