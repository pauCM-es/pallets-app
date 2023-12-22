import { getCamaraById } from "@/app/services/camara.service"
import EmptySpace from "@/components/EmptySpace"
import { SideDrawer } from "@/components/SideDrawer"
import { ItemsOnShelf } from "@/types/camara.types"
import { PositionOnShelf } from "@/types/pallet.types"
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

  const itemsGroupedByShelf: ItemsOnShelf[] = shelves.map(shelf => {
    let grouped: ItemsOnShelf = {
      ...shelf,
      items: {
        ["1"]: [] //at least height = "1" exist being the floor and the default value.
      }
    }
    palletsOnCamara
      .filter(pallet => pallet.position[0] === shelf.name)?.forEach(palletFiltered => {
        const itemHeightPosition = palletFiltered.position[1]
        const existHeigthOnShelf = Object.keys(grouped.items).some(heightGroup => heightGroup === itemHeightPosition)
        const previousItems = existHeigthOnShelf ? grouped.items?.[itemHeightPosition] : undefined
        grouped.items[itemHeightPosition] = previousItems ? [...previousItems, { ...palletFiltered }]
          : [{ ...palletFiltered }]
      })
    console.log(grouped)

    return grouped
  })

  return (
    <>
      <SideDrawer
        children={ <EmptySpace itemsGroupedByShelf={ itemsGroupedByShelf } /> }
        palletsData={ palletsOnCamara }
        camara={ camara }
      />
    </>
  )
}

export default CamaraIdPage