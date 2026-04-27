const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'super-admin') return next();
  if (req.user && req.user.role === 'admin' && req.user.isApproved) return next();
  res.status(403).json({ message: 'Access denied. Account pending approval.' });
};

module.exports = { adminOnly };
