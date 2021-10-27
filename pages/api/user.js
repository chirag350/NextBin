import withSession from '../../lib/session'
import { executeQuery } from '../../db'

export default withSession(async (req, res) => {
    if (!req.session || !req.session.get('user')) return res.json({ isLoggedIn: false })
    const user = req.session.get('user')
    const id = user.identity;
    const sqlres = await executeQuery("SELECT * FROM users WHERE identity = ?", [id])
    if (!sqlres || sqlres == false) return res.json({
        isLoggedIn: false,
        message: 'Invalid Auth'
    })
    if (user) {
        return res.json({
            isLoggedIn: true,
            ...user,
        })
    } else {
        return res.json({
            isLoggedIn: false,
        })
    }
})