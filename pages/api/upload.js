const { encryptString } = require('../../cryptography')
const { executeQuery } = require('../../db')
const { makeid } = require('../../functions')

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(400).send("400 Bad Request (must be a POST request)");
  const id = makeid(20);
  const text = req.body.text
  if (!text) return res.status(400).send("400 Bad Request (Missing text)")
  const encrypted = encryptString(text)
  const lol = await executeQuery(`INSERT INTO pastes (id, content) VALUES (?, ?)`, [id, encrypted])
  if (lol == false) return res.redirect("/500")
  res.redirect(`/pastes/${id}`)
/*  res.status(200).json({
    "error": false,
    "message": "200 OK",
    "id": id
  })
*/
}
