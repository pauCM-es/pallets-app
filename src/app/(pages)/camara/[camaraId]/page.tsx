import { getCamaraById } from "@/app/services/camara.service"
import EmptySpace from "@/components/EmptySpace"
import { SideDrawer } from "@/components/SideDrawer"


interface Params {
  camaraId: string
}

const CamaraIdPage = async ({
  params
}: {
  params: Params
}) => {

  const res = await getCamaraById(params.camaraId)
  const { palletsOnShelves } = res.data

  return (
    <>
      <SideDrawer
        children={ <EmptySpace palletsOnShelves={ palletsOnShelves } /> }
        palletsData={ palletsOnShelves }
      />
    </>
  )
}

export default CamaraIdPage