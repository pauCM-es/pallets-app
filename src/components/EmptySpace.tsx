"use client"

import { PalletsOnShelf } from '@/types/prisma.types'
import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import Shelf from './Shelf'


const EmptySpace = ({ palletsOnShelves }: { palletsOnShelves: PalletsOnShelf[] }) => {

  const onDragEnd = () => {
    //TODO
  }

  return (
    <DragDropContext
      onDragEnd={ () => { onDragEnd() } }
    >

      { palletsOnShelves?.map((shelf: PalletsOnShelf) => {
        return (
          <Shelf
            key={ shelf.shelfId }
            title={ shelf.shelfId }
            pallets={ shelf.pallets }
          />)
      }) }
    </DragDropContext>
  )
}

export default EmptySpace