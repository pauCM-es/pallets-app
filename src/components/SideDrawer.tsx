'use client'

import { useEffect, useState } from "react"
import { Drawer } from "devextreme-react"
import { useAppSelector } from "@/libs/store"
import SideDrawerContent from "./SideDrawerContent"

import '@/styles/SideDrawer.style.scss'


export const SideDrawer = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { isSideDrawerOpen } = useAppSelector(state => state.global)

  useEffect(() => {
    console.log(isSideDrawerOpen)

  }, [isSideDrawerOpen])

  const drawerContent = () => {
    return (
      <SideDrawerContent />
    )
  }

  return (
    <Drawer
      opened={ isSideDrawerOpen }
      openedStateMode={ "overlap" }
      position={ "right" }
      revealMode={ "slide" }
      // component={ drawerContent }
      render={ drawerContent }
      closeOnOutsideClick={ true }
      className="side-drawer"
    >
      { children }
    </Drawer >
  )
}