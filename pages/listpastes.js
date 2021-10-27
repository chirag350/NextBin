import Head from 'next/head';
const { decryptString } = require('../cryptography')
const { executeQuery } = require('../db')
import withSession from '../lib/session'
import extra from '../styles/Extra.module.css'

export default function Home({ username, arr }) {
    return (
        <html class="mainctn">
            <Head>
                <meta name="viewport" content="width=device-width,initial-scale=1.0" />
                <script src="https://kit.fontawesome.com/5007b5f4b7.js" crossOrigin="anonymous"></script>
                <title>NextBin</title>
                <meta property="og:site_name" content="NextBin" />
                <meta property="og:title" content="NextBin" />
                <meta property="og:description"
                    content="A cool bin, which is easy to use and focuses on simplicity." />
                <meta property="og:color" content="#1F85DE" />
                <script src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js"></script>
            </Head>
            <header>
                <nav class="navbar">
                    <ul>
                        <li class="mn-head">
                            <a href="/"> Home </a>
                        </li>
                        <li class="mn-head">
                            <a href="/login">Login</a>
                        </li>
                        <li class="mn-head">
                            <a href="/signup">Sign up</a>
                        </li>
                        <li class="ex-head">
                            <a class={extra.activepg} href="/listpastes">Pastes</a>
                        </li>
                        <li class="rightbutton">
                            {username}
                        </li>
                    </ul>
                </nav>
            </header>


            <body>
                <br /><br /><br /><br /><br />
                <div class="pasteslist">
                    <ul>
                        {arr.map(function (d, e) {
                            return (<li key={e}><a href={d.url}>{d.id}</a> by {d.owner}</li>)
                        })}
                    </ul>
                </div>
            </body>
        </html>
    )
}


export const getServerSideProps = withSession(async function ({ req, res, params }) {
    const resp = await executeQuery("SELECT * FROM pastes WHERE visibility = ?", [0])
    if (!resp || resp == false) return {
        redirect: {
            destination: '/404',
            permanent: false,
        },
    }
    let arr = null;
    resp.map(e => {
        arr = [{"id": e.id, "owner": e.owner, "url": `/pastes/${e.id}`}]
    })
    let username = "Not Logged In"
    if (req.session && req.session.get('user')) {
        username = req.session.get('user').username;
    }
    return {
        props: { username, arr },
    }
})
