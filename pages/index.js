import Head from 'next/head'
import AdminLayout from '../components/Layout/AdminLayout'


export default function Home() {
  return (
    <div >
      <Head>
        <title>ABC Pharm System</title>

      </Head>
      <main>
        <AdminLayout />
      </main>

    </div>
  )
}
