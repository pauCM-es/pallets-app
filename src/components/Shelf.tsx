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

const Shelf = ({ children, title, id }: ShelfProps) => {

  // const {
  //   setNodeRef,
  //   isOver,
  //   over
  // } = useDroppable({ id: id })

  // useEffect(() => {
  //   isOver && console.log("over", over)

  // }, [isOver])



  return (
    <div className={ `shelf` }
    // <div className={ `shelf ${isOver && "shelf--hover"}` }
    // ref={ setNodeRef }
    >
      <div className="shelf__title">{ title }</div>
      <div className="shelf__content" >
        { children }
      </div>
    </div>

  )
}

export default Shelf