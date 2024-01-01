import { getCamaraById } from "@/app/services/camara.service"
import EmptySpace from "@/components/EmptySpace"
import { SideDrawer } from "@/components/SideDrawer"
import { orderItemsByIndexPosition } from "@/helpers/camaras-interactions"
import { ItemsByShelf, PalletItem } from "@/types/camara.types"
import { Pallet } from "@prisma/client"


interface Params {
  camaraId: string
}

const CamaraIdPage = async ({
  params
}: {
  params: Params
}) => {

  const res = await getCamaraById(params.camaraId)
  const { camara, palletsOnCamara, shelves } = res.data

  const itemsGroupedByShelf: ItemsByShelf = {}
  shelves.map(shelf => {
    const orderedItemsOnShelf = orderItemsByIndexPosition(
      palletsOnCamara.filter((pallet) => (pallet.position?.shelfId === shelf.name))
    )
    itemsGroupedByShelf[shelf.name] = orderedItemsOnShelf
  })

  return (
    <SideDrawer>
      <EmptySpace
        itemsGroupedByShelf={ itemsGroupedByShelf }
        palletsData={ palletsOnCamara }
        camara={ camara }
        shelves={ shelves }
      />
    </SideDrawer>
  )
}

export default CamaraIdPage