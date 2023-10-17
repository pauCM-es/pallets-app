'use client'

import { Pallet } from '@prisma/client'
import React, { ReactNode } from 'react'

import "@/styles/PalletItem.style.scss"
import { Draggable } from 'devextreme-react'

interface PalletItemProps {
  pallet: Pallet
}

const PalletItem = ({ pallet }: PalletItemProps) => {

  return (
    <section className='pallet'>
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