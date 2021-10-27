import mysql from 'serverless-mysql'

export const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DBNAME,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
  },
})
async function init() {
  await db.query(`CREATE TABLE IF NOT EXISTS pastes(id VARCHAR(255), content TEXT, visibility VARCHAR(255), owner VARCHAR(255));`)
  await db.query(`CREATE TABLE IF NOT EXISTS users(username VARCHAR(255), email VARCHAR(255), password VARCHAR(255), identity VARCHAR(255), is_verified INTEGER)`)
}
init()
export async function executeQuery(q, values) {
  try {
    const results = await db.query(q, values)
    await db.end()
    return results
  } catch (e) {
    console.log(e.message)
    return false;
  }
}