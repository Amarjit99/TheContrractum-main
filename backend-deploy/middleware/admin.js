const adminOnly = (req, res, next) => {
  // Super Admin — full access always
  if (req.user && req.user.role === 'super-admin') return next();

  // Admin — must be approved
  if (req.user && req.user.role === 'admin' && req.user.isApproved) {
    const permission = req.user.adminPermissions || 'view';
    const method = req.method;

    // Permission enforcement based on HTTP method
    if (permission === 'view' && method !== 'GET') {
      return res.status(403).json({ message: 'Access denied. You only have view permissions.' });
    }
    if (permission === 'view-delete' && !['GET', 'DELETE'].includes(method)) {
      return res.status(403).json({ message: 'Access denied. You do not have edit permissions.' });
    }
    // 'view-delete-edit' allows all methods
    return next();
  }

  res.status(403).json({ message: 'Access denied. Account pending approval.' });
};

module.exports = { adminOnly };
