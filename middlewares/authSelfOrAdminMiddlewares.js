export function authorizeSelfOrAdmin(req, res, next) {
  const userIdFromToken = req.user.id;       // extracted from JWT
  const userIdFromParams = req.params.id;    // from URL

  if (userIdFromToken !== userIdFromParams && !isAdmin) {
    return res.status(403).json({ error: "Accès interdit" });
  }

  next();
}