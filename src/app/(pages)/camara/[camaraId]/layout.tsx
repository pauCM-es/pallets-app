import Navbar from "@/components/Navbar"
import { ReactNode } from "react"


const CamaraIdLayout = ({ children }: { children: ReactNode }) => {

  return (
    <>
      <Navbar></Navbar>
      { children }
    </>

  )
}

export default CamaraIdLayout