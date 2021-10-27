import withSession from '../../lib/session'
import { executeQuery } from '../../db'
import { hash } from '../../cryptography'
import { makeid } from '../../functions'
import { sendEmail } from '../../mail'
export default withSession(async (req, res) => {
    const { email, username, password } = req.body
    if (!email || !username || !password) return res.status(400).send("400 Bad Request (Missing Data)")
    const testforalreadytaken = await executeQuery("SELECT * FROM users WHERE email = ? OR username = ?", [email, username])
    if (testforalreadytaken != false) return res.status(401).send("An account already exists with that email or username")
    const passhash = hash(password)
    const identity = makeid(30)
    const sqlres = await executeQuery("INSERT INTO users (username, email, password, identity, is_verified) VALUES (?, ?, ?, ?, ?)", [username, email, passhash, identity, 0])
    if (sqlres == false) return res.status(500).send("500 Internal Server Error")
    const mailres = await sendEmail(email, username, identity)
    if (mailres == false) return res.status(500).send("500 Internal Server Error")
    res.redirect(301, "/info?info=emailverify")
})