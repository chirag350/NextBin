import mysql from 'serverless-mysql'

export const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DBNAME,
    user: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
  },
})

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