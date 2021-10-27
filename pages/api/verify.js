import withSession from '../../lib/session'
import { executeQuery } from '../../db'

export default withSession(async (req, res) => {
    const { username, token } = req.query;
    if (!username || !token) return res.status(400).send("400 Bad Request");
    const sqltestres = await executeQuery("SELECT * FROM users WHERE username = ? AND identity = ?", [username, token])
    if (sqltestres == false) return res.status(400).send("400 Bad Request");
    const sqlres = await executeQuery("UPDATE users SET is_verified = 1 WHERE username = ? AND identity = ?", [username, token])
    if (sqlres == false) return res.status(500).send("500 Internal Server Error");
    res.redirect("/login")
})