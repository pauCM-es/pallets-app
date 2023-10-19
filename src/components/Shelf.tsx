'use client'

import React from 'react'
import { Pallet } from '@prisma/client'
import PalletItem from './PalletItem'
import '@/styles/Shelf.style.scss'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'

interface ShelfProps {
  title: string,
  pallets: Pallet[]
  id: string
}

const Shelf = ({ title, pallets, id }: ShelfProps) => {

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
  const onDragEnd = (evt: DragEndEvent) => {
    console.log(evt)

  }
  return (
    <DndContext
      onDragEnd={ onDragEnd }
      collisionDetection={ closestCenter }
    >
      <div className='shelf'

        ref={ setNodeRef }
        { ...attributes }
        { ...listeners }
        style={ style }
      >
        <div className="shelf__title">{ title }</div>

        <div
          className="shelf__content"
        >
          <SortableContext items={ pallets.map(pallet => pallet.numberId) } >
            { pallets?.map((pallet, index) => pallet &&
              <PalletItem
                key={ pallet.numberId }
                id={ pallet.numberId }
                pallet={ pallet }
              />
            ) }
          </SortableContext>
        </div>
      </div>
    </DndContext>

  )
}

export default Shelf