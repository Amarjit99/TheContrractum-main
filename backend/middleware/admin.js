const adminOnly = (req, res, next) => {
  // Super Admin — full access always
  if (req.user && req.user.role === 'super-admin') return next();

  // Admin / Manager / Employee — must be approved
  if (req.user && ['admin', 'manager', 'employee'].includes(req.user.role) && req.user.isApproved) {
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

const checkSubRole = (allowedSubRoles) => {
  return (req, res, next) => {
    // Super Admin — full access always
    if (req.user && req.user.role === 'super-admin') return next();

    // Admin / Manager / Employee — must be approved and match sub-role
    if (req.user && ['admin', 'manager', 'employee'].includes(req.user.role) && req.user.isApproved) {
      const userSubRole = req.user.adminSubRole || '';

      // Check for exact match first
      if (allowedSubRoles.includes(userSubRole)) {
        return next();
      }

      // Check for prefix/substring matches to support backward compatibility with short category names
      const matched = allowedSubRoles.some(allowed => {
        const lowerAllowed = allowed.toLowerCase().trim();
        const lowerUser = userSubRole.toLowerCase().trim();

        if (lowerAllowed === 'hr' && (lowerUser.includes('hr') || lowerUser.startsWith('hr '))) return true;
        if (lowerAllowed === 'finance' && lowerUser.includes('finance')) return true;
        if (lowerAllowed === 'legal' && (lowerUser.includes('legal') || lowerUser.includes('compliance'))) return true;
        if (lowerAllowed === 'manager' && (lowerUser.includes('manager') || req.user.role === 'manager')) return true;
        
        // General fallback
        if (lowerUser.includes(lowerAllowed)) return true;

        return false;
      });

      if (matched) {
        return next();
      }

      return res.status(403).json({ message: `Access denied. Requires one of these roles: ${allowedSubRoles.join(', ')}` });
    }

    res.status(403).json({ message: 'Access denied. Unauthorized or account pending approval.' });
  };
};

module.exports = { adminOnly, checkSubRole };
