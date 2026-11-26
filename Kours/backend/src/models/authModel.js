const db = require('../config/db').promise();

// Rechercher un utilisateur par son identifiant Supabase
async function findBySupabaseId(supabaseId) {
  const [rows] = await db.execute(
    'SELECT * FROM utilisateurs WHERE supabase_id = ?',
    [supabaseId]
  );

  return rows[0] || null;
}

// Rechercher un utilisateur par son email
async function findByEmail(email) {
  const [rows] = await db.execute(
    'SELECT * FROM utilisateurs WHERE email = ?',
    [email]
  );

  return rows[0] || null;
}

// Créer un utilisateur dans MySQL
async function createUser(supabaseId, nom, prenom, email) {
  const [result] = await db.execute(
    `INSERT INTO utilisateurs
    (supabase_id, nom, prenom, email, role)
    VALUES (?, ?, ?, ?, 'etudiant')`,
    [supabaseId, nom, prenom, email]
  );

  return result.insertId;
}

// Initialiser les quotas de l'utilisateur
async function createQuota(userId) {
  await db.execute(
    `INSERT INTO quotas_utilisateurs
    (id_utilisateur, cours_deposes, points_gagnes, acces_illimite)
    VALUES (?, 0, 0, false)
    ON DUPLICATE KEY UPDATE id_utilisateur = id_utilisateur`,
    [userId]
  );
}

module.exports = {
  findBySupabaseId,
  findByEmail,
  createUser,
  createQuota
};