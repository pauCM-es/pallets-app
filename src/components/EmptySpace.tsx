"use client"

import { PalletsOnShelf } from '@/types/prisma.types'
import React, { useCallback, useState } from 'react'
import Shelf from './Shelf'
import '@/styles/EmptySpace.style.scss'
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'


const EmptySpace = ({ palletsOnShelves }: { palletsOnShelves: PalletsOnShelf[] }) => {
  const [positions, setPositions] = useState(palletsOnShelves)

  const onDragEnd = (evt: DragEndEvent) => {
    console.log(evt)

  }

  return (
    <section className="empty-space">
      <DndContext
        onDragEnd={ onDragEnd }
        collisionDetection={ closestCenter }
      >
        <SortableContext items={ palletsOnShelves.map(shelf => {
          return { ...shelf, id: shelf.shelfId }
        }) }>

          {
            palletsOnShelves?.map((shelf: PalletsOnShelf) => {
              return (
                <Shelf
                  id={ shelf.shelfId }
                  key={ shelf.shelfId }
                  title={ shelf.shelfId }
                  pallets={ shelf.pallets }
                />
              )
            })
          }
        </SortableContext>
      </DndContext>
    </section>
  )
}

export default EmptySpace