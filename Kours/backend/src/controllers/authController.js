const authModel = require('../models/authModel');

// Synchroniser le compte Supabase avec MySQL
async function syncUser(req, res) {
  try {
    const supabaseUser = req.supabaseUser;

    const supabaseId = supabaseUser.id;
    const email = supabaseUser.email;

    const metadata = supabaseUser.user_metadata || {};

    const nom = typeof metadata.nom === 'string'
      ? metadata.nom.trim()
      : '';

    const prenom = typeof metadata.prenom === 'string'
      ? metadata.prenom.trim()
      : '';

    if (!email || email.length > 150) {
      return res.status(400).json({
        message: 'Adresse email invalide'
      });
    }

    // Vérifier si le compte existe déjà dans MySQL
    let utilisateur = await authModel.findBySupabaseId(supabaseId);

    let nouveauCompte = false;

    if (!utilisateur) {

      // Vérifier les informations d'inscription
      if (!nom || !prenom || nom.length > 100 || prenom.length > 100) {
        return res.status(400).json({
          message: 'Nom ou prénom invalide'
        });
      }

      // Vérifier si l'email est déjà utilisé
      const emailExistant = await authModel.findByEmail(email);

      if (emailExistant && emailExistant.supabase_id !== supabaseId) {
        return res.status(409).json({
          message: 'Cette adresse email est déjà associée à un compte'
        });
      }

      try {
        // Créer le compte dans MySQL
        await authModel.createUser(
          supabaseId,
          nom,
          prenom,
          email
        );

        nouveauCompte = true;

      } catch (error) {
        // Gérer deux requêtes simultanées
        if (error.code !== 'ER_DUP_ENTRY') {
          throw error;
        }
      }

      utilisateur = await authModel.findBySupabaseId(supabaseId);

      if (!utilisateur) {
        return res.status(409).json({
          message: 'Impossible d’associer ce compte'
        });
      }
    }

    // Initialiser les quotas s'ils n'existent pas
    await authModel.createQuota(utilisateur.id_utilisateur);

    // Renvoyer uniquement les informations nécessaires
    return res.status(nouveauCompte ? 201 : 200).json({
      message: nouveauCompte
        ? 'Compte créé avec succès'
        : 'Connexion réussie',

      utilisateur: {
        id_utilisateur: utilisateur.id_utilisateur,
        supabase_id: utilisateur.supabase_id,
        nom: utilisateur.nom,
        prenom: utilisateur.prenom,
        email: utilisateur.email,
        role: utilisateur.role
      }
    });

  } catch (error) {
    console.error('Erreur authController :', error.message);

    return res.status(500).json({
      message: 'Erreur interne du serveur'
    });
  }
}

module.exports = {
  syncUser
};