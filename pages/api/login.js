import withSession from '../../lib/session'
import { executeQuery } from '../../db'
import { compareHash } from '../../cryptography'
import { validateEmail } from '../../functions'
export default withSession(async (req, res) => {
    const { emailuser, password } = req.body
    if (!emailuser || !password) return res.status(400).send("400 Bad Request (Missing Data)")
    const ismail = validateEmail(emailuser)
    let sqlres = null;
    if (!ismail || ismail == false) {
        sqlres = await executeQuery("SELECT * FROM users WHERE username = ?", [emailuser])
    } else {
        sqlres = await executeQuery("SELECT * FROM users WHERE email = ?", [emailuser])
    }
    if (!sqlres || sqlres == false) return res.status(401).send("401 Unauthorized (Invalid Credentials)")
    const hashpassfromdb = sqlres[0].password
    const ifpasswordmatches = compareHash(password, hashpassfromdb)
    if (!ifpasswordmatches || ifpasswordmatches == false) return res.status(401).send("401 Unauthorized (Invalid Credentials)")
    const ifuserisverified = sqlres[0].is_verified
    if (ifuserisverified == 0) return res.status(401).send("401 Unauthorized (Not Verified), Please check your email to verify.")
    req.session.set('user', {
        username: sqlres[0].username,
        identity: sqlres[0].identity
    })
    await req.session.save()
    res.redirect(301, "/")
  })