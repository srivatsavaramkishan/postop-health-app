const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    const role = req.headers['x-user-role'];

    if (req.method === 'GET') {
      return next();
    }

    if (!allowedRoles.includes(role)) {
      return res.status(401).json({ message: 'Unauthorized Access' });
    }

    next();
  };
};

module.exports = roleMiddleware;
