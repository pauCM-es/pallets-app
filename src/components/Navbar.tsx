'use client'

import React from 'react'
import Link from 'next/link'
import { IoSettings } from "react-icons/io5"

import "@/styles/Navbar.style.scss"
import Button from 'devextreme-react/cjs/button'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <section className='navbar__left'>
        <Link href="/">
          <Button
            icon="home"
            type='default'
            width={ "3rem" }
            height={ "2rem" }
            style={ { "borderRadius": "3px" } }

          />
        </Link>
      </section>
      <section className="navbar__right">

        <Button
          type='default'
          height={ "2rem" }
          style={ { "borderRadius": "3px" } }

        >
          <IoSettings />
        </Button>
      </section>
    </nav>
  )
}

export default Navbar