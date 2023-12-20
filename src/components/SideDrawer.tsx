'use client'

import { useAppSelector } from "@/libs/store"
import { Drawer } from "devextreme-react"
import { useEffect, useState } from "react"



export const SideDrawer = () => {
  const { isSideDrawerOpen } = useAppSelector(state => state.global)

  useEffect(() => {
    console.log(isSideDrawerOpen)

  }, [isSideDrawerOpen])

  return (
    <Drawer
      opened={ isSideDrawerOpen }
      openedStateMode={ "overlap" }
      position={ "right" }
      revealMode={ "slide" }
      // component={  }
      closeOnOutsideClick={ true }
      height={ "100%" }
      width={ "30rem" }
    >
      <section>
        <div>
          sdfsdf

        </div>
      </section>
    </Drawer >
  )
}