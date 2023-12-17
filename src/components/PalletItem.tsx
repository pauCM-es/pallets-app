'use client'

import { Pallet } from '@prisma/client'
import React, { useEffect } from 'react'

import "@/styles/PalletItem.style.scss"
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { UniqueIdentifier } from '@dnd-kit/core'
import { EmptyShelf } from '@/types/shelf.types'

interface PalletItemProps {
  pallet: Pallet | EmptyShelf["pallets"][0]
  id: string | UniqueIdentifier

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

  const isTypePallet = (pallet: PalletItemProps["pallet"]): pallet is Pallet => {
    return (pallet as Pallet).numberId !== "empty"
  }

  return (
    isTypePallet(pallet)
      ? <section
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

      : <section
        className='pallet pallet--empty'
        ref={ setNodeRef }
      >
        <div>{ pallet.numberId }</div>
        <div className="pallet__data">
        </div>
      </section>
  )



}


export default PalletItem