import Link from 'next/link'

export default function Home () {

  return (
    <main >
      Home page
      <Link href={ "/camara/C01" }>CAMARA EXPEDICIONES</Link>
    </main>
  )
}
