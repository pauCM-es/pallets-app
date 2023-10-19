'use client'

import { Pallet } from '@prisma/client'
import React, { useEffect } from 'react'

import "@/styles/PalletItem.style.scss"

interface PalletItemProps {
  pallet: Pallet
  index: number
  // ref: (element: HTMLElement | null) => void
  // provided: DraggableProvided
}

const PalletItem = ({ pallet, index }: PalletItemProps) => {
  useEffect(() => {

  }, [])

  return (
    <section
      className='pallet'
    >
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