import { getCamaraById } from "@/app/services/camara.service"
import { Pallet } from "@prisma/client"



interface Params {
  camaraId: string
}

const Camara = async ({
  params
}: {
  params: Params
}) => {

  const { camara, pallets } = await getCamaraById(params.camaraId)


  return (
    <section>
      <div>

        CAMARA ID: { camara.name }
      </div>
      <div>RESPONSE
        { pallets.map((pallet: Pallet) => <div>{ pallet.numberId }</div>) }
      </div>
    </section>
  )
}

export default Camara