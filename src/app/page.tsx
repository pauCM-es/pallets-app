'use client'

import { Button } from 'devextreme-react'
import Link from 'next/link'
import { MdPallet } from "react-icons/md"
import "@/styles/Dashboard.style.scss"

export default function Home () {

  return (
    <main className='dashboard'>
      Home page
      <Link href={ "/camara/C01" }>
        <Button
          stylingMode='contained'
          height={ "4rem" }
          className='dashboard__camara-btn'
        >
          <span className="camara-btn__icon">
            <MdPallet />
          </span>
          <span className='camara-btn__text'>CAMARA EXPEDICIONES</span>
        </Button>
      </Link>
    </main>
  )
}
