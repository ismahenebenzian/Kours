// backend/src/models/profileModel.js
const pool = require('../config/db');

async function findProfileById(userId) {
  const [[user]] = await pool.query(
    `SELECT
       id,
       first_name,
       last_name,
       email,
       avatar_url,
       role,
       field_of_study,
       academic_level,
       institution,
       points,
       unlimited_reads_goal,
       created_at
     FROM users
     WHERE id = ?`,
    [userId]
  );

  if (!user) return null;

  const [[stats]] = await pool.query(
    `SELECT
       COUNT(*) AS courses_deposited,
       COALESCE(SUM(likes_count), 0) AS likes_received
     FROM courses
     WHERE author_id = ?`,
    [userId]
  );

  const depositedCount = Number(stats.courses_deposited || 0);
  const goal = Number(user.unlimited_reads_goal || 2);

  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    fullName: `${user.first_name} ${user.last_name}`.trim(),
    email: user.email,
    avatarUrl: user.avatar_url,
    role: user.role,
    fieldOfStudy: user.field_of_study,
    academicLevel: user.academic_level,
    institution: user.institution,
    stats: {
      coursesDeposited: depositedCount,
      likesReceived: Number(stats.likes_received || 0),
      points: Number(user.points || 0),
    },
    unlimitedReads: {
      current: Math.min(depositedCount, goal),
      goal,
      unlocked: depositedCount >= goal,
    },
  };
}

async function updateProfileById(userId, data) {
  await pool.query(
    `UPDATE users
     SET first_name = ?,
         last_name = ?,
         email = ?,
         field_of_study = ?,
         academic_level = ?,
         institution = ?
     WHERE id = ?`,
    [
      data.firstName,
      data.lastName,
      data.email,
      data.fieldOfStudy,
      data.academicLevel,
      data.institution,
      userId,
    ]
  );

  return findProfileById(userId);
}

async function deleteUserById(userId) {
  const [result] = await pool.query(`DELETE FROM users WHERE id = ?`, [userId]);
  return result.affectedRows > 0;
}

module.exports = {
  findProfileById,
  updateProfileById,
  deleteUserById,
};