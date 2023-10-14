'use client'

import axios from "axios"
import { useEffect } from "react"



interface Params {
  camaraId: string
}

const Camara = ({ params }: { params: Params }) => {
  // const [camara, setCamara] = useState(undefined)

  useEffect(() => {
    axios.get("camara/:id", {
      params: params.camaraId
    }).then(res => console.log(res)
    )

  }, [])


  return (
    <section>
      CAMARA ID: { params.camaraId }
    </section>
  )
}

export default Camara