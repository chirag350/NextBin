import Head from 'next/head'
import extra from '../styles/Extra.module.css'
import withSession from '../lib/session'
export default function Home({ rand, username }) {
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
          <form method="POST" action="/api/upload">
            <textarea class="paste-box" id="text" name="text" placeholder={rand}></textarea>
            <br /><br />
            <label for="smth-select">Choose visibility of the paste: </label>

            <select name="visibility" id="smth-select" required>
              <option value="public">Public</option>
              <option value="unlisted">Unlisted</option>
            </select>
            <a href="/">
              <button class={extra.coolbutton} type="submit">Submit</button>
            </a>
          </form>
        </div>
      </body>
    </div>
  )
}

export const getServerSideProps = withSession(async function ({ req, res }) {
  const arryofit = ["Paste your cool text here", "Dark mode is lovely", "Did you know that space is completely silent?", "What came first? The color orange or the name orange?", "Did you know that NextBin is completely open source on GitHub?"];
  const rand = arryofit[Math.floor(Math.random() * arryofit.length)];
  const user = req.session.get('user')
  if (!user) return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  }
  const username = req.session.get('user').username;
  return {
    props: { rand, username }
  }
})