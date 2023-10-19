"use client"

import { PalletsOnShelf } from '@/types/prisma.types'
import React, { useCallback, useState } from 'react'
import Shelf from './Shelf'
import '@/styles/EmptySpace.style.scss'


const EmptySpace = ({ palletsOnShelves }: { palletsOnShelves: PalletsOnShelf[] }) => {
  const [positions, setPositions] = useState(palletsOnShelves)

  const onDragEnd = () => {

    // const palletNumberDragged = res.draggableId
    // const newPositions = positions.find((shelf, index) => shelf.shelfId === res.source.droppableId)
  }

  return (
    <section className="empty-space">

      { palletsOnShelves?.map((shelf: PalletsOnShelf) => {
        return (
          <Shelf
            key={ shelf.shelfId }
            title={ shelf.shelfId }
            pallets={ shelf.pallets }
          />)
      }) }
    </section>
  )
}

export default EmptySpace