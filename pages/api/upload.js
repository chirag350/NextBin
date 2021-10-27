const { encryptString } = require('../../cryptography')
import withSession from '../../lib/session'
const { executeQuery } = require('../../db')
const { makeid } = require('../../functions')

export default withSession(async (req, res) => {
  if (req.method !== "POST") return res.status(400).send("400 Bad Request (must be a POST request)");
  const id = makeid(20);
  const text = req.body.text
  const visibility = req.body.visibility;
  let numofvisibility = 1;
  if (visibility === "public") {
    numofvisibility = 0
  }
  if (!req.session || !req.session.get('user').username) return res.status(403).send("AYO stop tryna upload without logging in")
  const owner = req.session.get('user').username;
  if (!text) return res.status(400).send("400 Bad Request (Missing text)")
  const encrypted = encryptString(text)
  const lol = await executeQuery(`INSERT INTO pastes (id, content, visibility, owner) VALUES (?, ?, ?, ?)`, [id, encrypted, numofvisibility, owner])
  if (lol == false) return res.redirect("/500")
  res.redirect(`/pastes/${id}`)
/*  res.status(200).json({
    "error": false,
    "message": "200 OK",
    "id": id
  })
*/
})
