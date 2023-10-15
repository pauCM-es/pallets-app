import { getCamaraById } from "@/app/services/camara.service"
import EmptySpace from "@/components/EmptySpace"
import Shelf from "@/components/Shelf"



interface Params {
  camaraId: string
}

const CamaraIdPage = async ({
  params
}: {
  params: Params
}) => {

  const { camara, pallets } = await getCamaraById(params.camaraId)


  return (
    <section>
      <EmptySpace />
      { camara?.shelves?.map(shelf => (
        <Shelf
          title={ shelf?.name }
          pallets={ pallets }
        // pallets={ shelf?.palletIds?.map(id => pallets.find(pallet => pallet.numberId === id)) }
        />)) }
    </section>
  )
}

export default CamaraIdPage