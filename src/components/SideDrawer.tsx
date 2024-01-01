'use client'
//libs
import { Button, Drawer } from "devextreme-react"
import { IoIosSearch, IoMdAdd, IoMdPricetag } from "react-icons/io"
//components
import SearchPalletDrawer from "@/components/SearchPalletDrawer"
import { NewPalletDrawer } from "./NewPalletDrawer"
//store
import { useAppDispatch, useAppSelector } from "@/libs/store"
import { setDrawerState, setSidebarOption } from "@/libs/features/global/globalSlice"
//types

//styles
import '@/styles/SideDrawer.style.scss'

export const sidebarOptions = [
  {
    option: "new-pallet",
    tooltip: "Add new pallet",
    icon: <IoMdAdd />,
    content: <NewPalletDrawer />,
  },
  {
    option: "search",
    tooltip: "Search",
    icon: <IoIosSearch />,
    content: <SearchPalletDrawer />,
  },
  {
    option: "tag",
    tooltip: "Tag",
    icon: <IoMdPricetag />,
    content: <NewPalletDrawer />,
  },
] as const

interface SideDrawerProps {
  children: React.ReactNode,
}

export const SideDrawer = ({
  children
}: SideDrawerProps) => {
  const { isSideDrawerOpen, sidebarOptionActive } = useAppSelector(state => state.global)
  const dispatch = useAppDispatch()

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
      className="side-drawer"
      minSize={ 47 }
    >
      { children }
    </Drawer >
  )
}