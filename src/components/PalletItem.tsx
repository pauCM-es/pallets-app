import { Pallet } from '@prisma/client'
import React from 'react'

import "@/styles/PalletItem.style.scss"

interface PalletItemProps {
  pallet: Pallet
}

const PalletItem = ({ pallet }: PalletItemProps) => {
  return (
    <section>
      <div>{ pallet.numberId }</div>
      <div className="pallet__data">
        <span className="product">{ pallet.product }</span>
        <span className="caliber">{ pallet.size }-{ pallet.pieces }</span>
        <span className="box-brand">{ pallet.boxBrand }</span>
      </div>
    </section>
  )
}

export default PalletItem