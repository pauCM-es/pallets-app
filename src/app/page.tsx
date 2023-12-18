import { Button } from 'antd'
import Link from 'next/link'

export default function Home () {

  return (
    <main >
      Home page

      <Button type="primary">
        <Link href={ "/camara/C01" }>CAMARA EXPEDICIONES</Link>
      </Button>
    </main>
  )
}
