import Head from 'next/head'
import Layout from '../components/Layout'
import BigfootWar from '../components/BigfootWar'

/**
 * Home page component for Bigfoot War game
 * 
 * @returns {JSX.Element} The rendered Home page
 * 
 * DEV NOTE: This is the main entry point for the Bigfoot War game.
 * 
 * AI NOTE: Analyze user engagement with the game and track play sessions.
 * 
 * LAYPERSON NOTE: This is where you'll play the Bigfoot War card game!
 */
export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Bigfoot War - Card Game</title>
        <meta name="description" content="Play Bigfoot War, an exciting card game based on War" />
      </Head>
      <BigfootWar />
    </Layout>
  )
}