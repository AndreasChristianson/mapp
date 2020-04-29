import Head from 'next/head'
import { NextPage } from 'next'
import Layout from '../components/Layout'

interface props {
  userAgent: string
}

const Index: NextPage<props> = ({ userAgent }) => (
  <>
    <Head>
      <title>MAPP</title>
    </Head>
    <p>{'Hello World'}</p>
    <p>{userAgent}</p>
    <Layout />
  </>
)

Index.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent
  return { userAgent }
}

export default Index
