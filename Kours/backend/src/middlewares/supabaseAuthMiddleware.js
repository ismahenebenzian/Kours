const supabase = require('../config/supabase');

async function supabaseAuthMiddleware(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    // Vérifier la présence du token
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Token d’authentification manquant'
      });
    }

    // Récupérer le token
    const token = authorization.substring(7).trim();

    // Vérifier le token auprès de Supabase
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({
        message: 'Token invalide ou expiré'
      });
    }

    // Enregistrer l'utilisateur authentifié dans la requête
    req.supabaseUser = data.user;

    // Continuer vers le contrôleur
    return next();

  } catch (error) {
    console.error('Erreur authentification Supabase :', error.message);

    return res.status(500).json({
      message: 'Erreur interne du serveur'
    });
  }
}

module.exports = supabaseAuthMiddleware;