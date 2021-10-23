const { decryptString } = require('../../../cryptography')
const { executeQuery } = require('../../../db')

export default function handler(req, res) {
    console.log(req)
    const { file } = req.query;
    const resp = executeQuery(`SELECT * FROM pastes WHERE id = "${file}";`)
    if (resp == false) return res.redirect("/404");
    let enct = resp[0].content;
    let decrypted = decryptString(enct);
    res.status(200).json({
      "data": decrypted
    });
  }