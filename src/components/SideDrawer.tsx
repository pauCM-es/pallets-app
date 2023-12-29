'use client'

import { useEffect, useState } from "react"
import { Button, Drawer } from "devextreme-react"
import { useAppDispatch, useAppSelector } from "@/libs/store"
import { NewPalletDrawer } from "./NewPalletDrawer"
import { IoIosSearch, IoMdAdd, IoMdPricetag } from "react-icons/io"

import { setDrawerState, setPalletsData, setSidebarOption } from "@/libs/features/global/globalSlice"
import SearchPalletDrawer from "./SearchPalletDrawer"
import '@/styles/SideDrawer.style.scss'
import { PalletsOnShelf } from "@/types/prisma.types"

const sidebarOptions = [
  {
    option: "new-pallet",
    tooltip: "Add new pallet",
    icon: <IoMdAdd />,
    content: <NewPalletDrawer />
  },
  {
    option: "search",
    tooltip: "Search",
    icon: <IoIosSearch />,
    content: <SearchPalletDrawer />
  },
  {
    option: "tag",
    tooltip: "Tag",
    icon: <IoMdPricetag />,
    content: <NewPalletDrawer />
  }
] as const

export type SidebarOptions = typeof sidebarOptions[number]["option"]

export const SideDrawer = ({
  children,
  palletsData
}: {
  children: React.ReactNode,
  palletsData: PalletsOnShelf[]
}) => {
  const { isSideDrawerOpen, sidebarOptionActive } = useAppSelector(state => state.global)
  const dispatch = useAppDispatch()


  useEffect(() => {
    dispatch(setPalletsData(palletsData))
    console.log("palletData", palletsData)

    return () => { dispatch(setPalletsData(undefined)) }
  }, [])

  const drawerContent = () => {
    return (
      <aside className="side-drawer__panel">
        <nav className="sidebar">
          { sidebarOptions.map(option => (
            <Button
              key={ option.option }
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
        { sidebarOptions.find(option => option.option === sidebarOptionActive)?.content || <NewPalletDrawer /> }
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