/* =====================================================================
   Leaderboard — disusun dari USER NYATA yang sudah login/register
   (bukan data filler). XP & streak diambil dari gamifikasi akun.
   ===================================================================== */

export function buildLeaderboard(users, currentUsername) {
  return (users || [])
    .map((u) => ({
      key: u.username,
      name: u.name || u.username,
      username: u.username,
      prog: u.class || '',
      xp: u.gamification?.xp ?? 0,
      streak: u.gamification?.streak ?? 0,
      avatar: u.avatar,
      avatarUrl: u.avatarUrl || '',
      you: u.username === currentUsername,
    }))
    .sort((a, b) => b.xp - a.xp || a.name.localeCompare(b.name))
    .map((r, i) => ({ ...r, rank: i + 1 }))
}
