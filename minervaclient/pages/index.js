import Head from 'next/head'
import Header from './components/Header'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Minerva</title>
        <meta name="description" content="Decentralized education platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header class="mp"/>
    </div>
  )
}
