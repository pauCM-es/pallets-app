'use client'

import { Pallet } from '@prisma/client'
import React, { useEffect } from 'react'

import "@/styles/PalletItem.style.scss"
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface PalletItemProps {
  pallet: Pallet
  id: string

}

const PalletItem = ({ pallet, id }: PalletItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <section
      className='pallet'
      ref={ setNodeRef }
      { ...attributes }
      { ...listeners }
      style={ style }
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