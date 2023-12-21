'use client'

import { useEffect, useState } from "react"
import { Button, Drawer } from "devextreme-react"
import { useAppDispatch, useAppSelector } from "@/libs/store"
import SideDrawerContent from "./SideDrawerContent"
import { IoIosSearch, IoMdAdd, IoMdPricetag } from "react-icons/io"

import '@/styles/SideDrawer.style.scss'
import { setDrawerState, setSidebarOption } from "@/libs/features/global/globalSlice"

const sidebarOptions = [
  {
    option: "new-pallet",
    tooltip: "Add new pallet",
    icon: <IoMdAdd />,
  },
  {
    option: "search",
    tooltip: "Search",
    icon: <IoIosSearch />,
  },
  {
    option: "tag",
    tooltip: "Tag",
    icon: <IoMdPricetag />,
  }
] as const

export type SidebarOptions = typeof sidebarOptions[number]["option"]

export const SideDrawer = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { isSideDrawerOpen, sidebarOptionActive } = useAppSelector(state => state.global)
  const dispatch = useAppDispatch()


  useEffect(() => {
    console.log(sidebarOptionActive)

  }, [sidebarOptionActive])

  const drawerContent = () => {
    return (
      <aside className="side-drawer__panel">
        <nav className="sidebar">
          { sidebarOptions.map(option => (
            <Button
              className={ `sidebar__option ${sidebarOptionActive === option.option ? "sidebar__option--active" : ""}` }
              stylingMode="text"
              onClick={ (e) => {
                dispatch(setSidebarOption(option.option))
                !isSideDrawerOpen && dispatch(setDrawerState(true))
              } }
              activeStateEnabled={ true }
            >

              { option.icon }
            </Button>
          )) }
        </nav>
        <SideDrawerContent />
      </ aside>
    )
  }

  return (
    <Drawer
      opened={ isSideDrawerOpen }
      openedStateMode={ "overlap" }
      position={ "right" }
      revealMode={ "slide" }
      render={ drawerContent }
      // closeOnOutsideClick={ true }
      className="side-drawer"
      minSize={ 47 }
    >
      { children }
    </Drawer >
  )
}