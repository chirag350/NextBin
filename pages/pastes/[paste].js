import Head from 'next/head';
const { decryptString } = require('../../cryptography')
const { executeQuery } = require('../../db')
import withSession from '../../lib/session'
import extra from '../../styles/Extra.module.css'
import sanitizer from 'sanitizer';

export default function Home({ decrypted, username, authorname }) {
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
              <a href="/listpastes">Pastes</a>
            </li>
            <li class="rightbutton">
              {username}
            </li>
          </ul>
        </nav>
      </header>


      <body>
        <br /><br /><br /><br /><br />
        <p>By {authorname}</p>
        <div class={extra.pastetext}>
          <pre>
            <code class="prettyprint">
              {decrypted}
            </code>
          </pre>
        </div>
      </body>
    </html>
  )
}


export const getServerSideProps = withSession(async function ({ req, res, params }) {
  const paste = sanitizer.sanitize(params.paste);
  const resp = await executeQuery("SELECT * FROM pastes WHERE id = ?", [paste])
  if (!resp || resp == false) return {
    redirect: {
      destination: '/404',
      permanent: false,
    },
  }
  let enct = resp[0].content;
  let decrypted = decryptString(enct);
  let username = "Not Logged In"
  let authorname = resp[0].owner;
  if (req.session && req.session.get('user')) {
    username = req.session.get('user').username;
  }
  return {
    props: { decrypted, username, authorname },
  }
})
