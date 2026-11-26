const db = require('../config/db');

const PUBLIC_USER_FIELDS = `
  id,
  first_name,
  last_name,
  email,
  field_of_study,
  academic_level,
  institution,
  created_at,
  updated_at
`;

async function findUserById(userId) {
  const [rows] = await db.execute(
    `SELECT ${PUBLIC_USER_FIELDS} FROM users WHERE id = ? LIMIT 1`,
    [userId]
  );
  return rows[0] || null;
}

async function findUserByEmailExcludingId(email, userId) {
  const [rows] = await db.execute(
    `SELECT id FROM users WHERE email = ? AND id != ? LIMIT 1`,
    [email, userId]
  );
  return rows[0] || null;
}

async function updateUserById(userId, data) {
  const {
    firstName,
    lastName,
    email,
    fieldOfStudy,
    academicLevel,
    institution,
  } = data;

  const [result] = await db.execute(
    `UPDATE users
     SET first_name = ?,
         last_name = ?,
         email = ?,
         field_of_study = ?,
         academic_level = ?,
         institution = ?,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [
      firstName,
      lastName,
      email,
      fieldOfStudy ?? null,
      academicLevel ?? null,
      institution ?? null,
      userId,
    ]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return findUserById(userId);
}

async function deleteUserById(userId) {
  const [result] = await db.execute(
    `DELETE FROM users WHERE id = ?`,
    [userId]
  );
  return result.affectedRows > 0;
}

module.exports = {
  findUserById,
  findUserByEmailExcludingId,
  updateUserById,
  deleteUserById,
};