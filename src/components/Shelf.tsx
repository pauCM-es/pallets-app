'use client'

import React, { ReactNode } from 'react'
import { Pallet } from '@prisma/client'
import PalletItem from './PalletItem'
import '@/styles/Shelf.style.scss'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'

interface ShelfProps {
  children: ReactNode
  title: string,
  id: string
}

const Shelf = ({ children, title, id }: ShelfProps) => {

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
    <div className='shelf'

      ref={ setNodeRef }
      { ...attributes }
      { ...listeners }
      style={ style }
    >
      <div className="shelf__title">{ title }</div>
      <div className="shelf__content" >
        { children }
      </div>
    </div>

  )
}

export default Shelf