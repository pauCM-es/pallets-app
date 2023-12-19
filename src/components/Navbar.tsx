'use client'

import React from 'react'
import "@/styles/Navbar.style.scss"
import Button from 'devextreme-react/button'
import Link from 'next/link'

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

      </section>
    </nav>
  )
}

export default Navbar