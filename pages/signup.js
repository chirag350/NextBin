import Head from 'next/head'
import extra from '../styles/Extra.module.css'
import withSession from '../lib/session'
import HCaptcha from '@hcaptcha/react-hcaptcha';
export default function Home({ siteKey }) {
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
                            <a href="/"> Home </a>
                        </li>
                        <li class="mn-head">
                            <a href="/login">Login</a>
                        </li>
                        <li class="mn-head">
                            <a class={extra.activepg} href="/signup">Sign up</a>
                        </li>
                        <li class="ex-head">
                            <a href="/listpastes">Pastes</a>
                        </li>
                        <li class="rightbutton">
                            Not Logged In
                        </li>
                    </ul>
                </nav>
            </header>

            <body>
                <br /><br /><br /><br />
                <div class={extra.content}>
                    <div class={extra.center}>
                        <div class="signupform">
                            <form method="POST" action="/api/signup">
                                <label for="username">Enter your Username: </label>
                                <input type="text" name="username" class="username" id="username" placeholder="Username" required></input>
                                <br/><br />
                                <label for="email">Enter your Email: </label>
                                <input type="email" name="email" class="email" id="email" placeholder="Email" required></input>
                                <br/><br />
                                <label for="password">Enter your Password: </label>
                                <input type="password" name="password" class="password" id="password" placeholder="Password" minlength="6" maxlength="128" required></input>
                                <br/><br />
                                <button class={extra.coolbutton} type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    )
}

export const getServerSideProps = withSession(async function ({ req, res }) {
    const user = req.session.get('user')
    if (user) return {
        redirect: {
            destination: '/',
            permanent: false,
        },
    }
    const siteKey = process.env.HCAPTCHA_SITE_KEY;
    return {
        props: { siteKey }
    }
})