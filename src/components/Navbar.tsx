'use client'

import React from 'react'
import Link from 'next/link'
import { MdArrowBackIosNew } from "react-icons/md"
import { MdArrowForwardIos } from "react-icons/md"

import "@/styles/Navbar.style.scss"
import Button from 'devextreme-react/cjs/button'
import { useAppDispatch, useAppSelector } from '@/libs/store'
import { toggleDrawer } from '@/libs/features/global/globalSlice'

const Navbar = () => {
  const { isSideDrawerOpen } = useAppSelector(state => state.global)

  const dispatch = useAppDispatch()

  const handleToggleDrawer = () => {
    dispatch(toggleDrawer())
    console.log("toggle")

  }

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
          onClick={ handleToggleDrawer }
        >
          <span className={ `${isSideDrawerOpen && "rotate"}` }>
            <MdArrowBackIosNew />
          </span>
        </Button>
      </section>
    </nav>
  )
}

export default Navbar