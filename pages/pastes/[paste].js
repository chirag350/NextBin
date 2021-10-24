import Head from 'next/head';
const { decryptString } = require('../../cryptography')
const { executeQuery, escape } = require('../../db')
import extra from '../../styles/Extra.module.css'
import Script from 'next/script'
import sanitizer from 'sanitizer';

export default function Home({ decrypted }) {
  return (
    <html class="mainctn">
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <Script src="https://kit.fontawesome.com/5007b5f4b7.js" crossOrigin="anonymous" />
        <title>NextBin</title>
        <meta property="og:site_name" content="NextBin" />
        <meta property="og:title" content="NextBin" />
        <meta property="og:description"
          content="A cool bin, which is easy to use and focuses on simplicity." />
        <meta property="og:color" content="#1F85DE" />
        <script src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js"></script>
      </Head>
      <header>
        <nav>
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
          </ul>
        </nav>
      </header>


      <body>
        <br /><br /><br /><br /><br />
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


export async function getServerSideProps(context) {
  const paste = sanitizer.sanitize(context.params.paste);
  const resp = await executeQuery("SELECT * FROM pastes WHERE id = ?", [paste])
  if (!resp || resp == false) return {
    redirect: {
      destination: '/404',
      permanent: false,
    },
  }
  let enct = resp[0].content;
  let decrypted = decryptString(enct);
  return {
    props: { decrypted },
  }
}
