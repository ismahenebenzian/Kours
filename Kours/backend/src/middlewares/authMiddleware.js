// backend/src/middlewares/authMiddleware.js
function requireAuth(req, res, next) {
  const headerUserId = req.header('x-user-id');
  const userId = headerUserId ? Number(headerUserId) : 1; // 1 par défaut pour tester facilement

  if (Number.isNaN(userId) || userId <= 0) {
    return res.status(401).json({ message: 'Utilisateur invalide' });
  }

  req.user = { id: userId };
  return next();
}

module.exports = requireAuth;