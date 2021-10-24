const { decryptString } = require('../../../../cryptography')
const { executeQuery } = require('../../../../db')
import sanitizer from 'sanitizer';

export default async function handler(req, res) {
    const { file } = req.query;
    const usefile = sanitizer.sanitize(file)
    const resp = await executeQuery(`SELECT * FROM pastes WHERE id = ?;`, [usefile])
    if (resp == false) return res.status(404).json({ error: true, message: "404 Not Found" })
    let enct = resp[0].content;
    let decrypted = decryptString(enct);
    res.status(200).json({
      "data": decrypted,
      "message": "200 OK"
    });
  }