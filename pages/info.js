import Head from 'next/head'
import extra from '../styles/Extra.module.css'
import withSession from '../lib/session'
export default function Home({ username, contentt }) {
    return (
        <div className="mainctn">
            <Head>
                <meta name="viewport" content="width=device-width,initial-scale=1.0" />
                <script src="https://kit.fontawesome.com/5007b5f4b7.js" crossOrigin="anonymous"></script>
                <title>NextBin</title>
                <meta property="og:site_name" content="NextBin" />
                <meta property="og:title" content="NextBin" />
                <meta property="og:description"
                    content="A cool bin, which is easy to use and focuses on simplicity." />
                <meta property="og:color" content="#1F85DE" />
            </Head>
            <header>
                <nav class="navbar">
                    <ul>
                        <li class="mn-head">
                            <a class={extra.activepg} href="/"> Home </a>
                        </li>
                        <li class="mn-head">
                            <a href="/login">Login</a>
                        </li>
                        <li class="mn-head">
                            <a href="/signup">Sign up</a>
                        </li>
                        <li class="ex-head">
                            <a href="/listpastes">Pastes</a>
                        </li>
                        <li class="rightbutton">
                            {username}
                        </li>
                    </ul>
                </nav>
            </header>

            <body>
                <br /><br /><br /><br />
                <div class={extra.content}>
                    <div class={extra.center}>
                        <div class="infoc">
                            <p>{contentt}</p>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    )
}

export const getServerSideProps = withSession(async function ({ req, res, query }) {
    let username = "Not Logged In"
    const user = req.session.get('user')
    if (user) {
        username = req.session.get('user').username;
    }
    let contentt = null;
    if (query.info == "emailverify") {
        contentt = "Please check your email and verify your account."
    }
    return {
        props: { username, contentt }
    }
})