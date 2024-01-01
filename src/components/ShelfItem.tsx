'use client'

import React, { ReactNode, useEffect } from 'react'
import { Pallet } from '@prisma/client'
import PalletItem from './PalletItem'
import '@/styles/Shelf.style.scss'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { DndContext, DragEndEvent, closestCenter, useDroppable } from '@dnd-kit/core'

interface ShelfProps {
  children: ReactNode
  title: string,
  id: string
}

export const ShelfItem = ({ children, title, id }: ShelfProps) => {

  return (
    <div className={ `shelf` }
    >
      <div className="shelf__title">{ title }</div>
      <div className="shelf__content" >
        { children }
      </div>
    </div>

  )
}