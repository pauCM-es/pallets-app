"use client"

import { PalletsOnShelf } from '@/types/prisma.types'
import React, { useCallback, useState } from 'react'
import Shelf from './Shelf'
import '@/styles/EmptySpace.style.scss'
import { DndContext, DragEndEvent, DragMoveEvent, DragOverlay, DragStartEvent, UniqueIdentifier, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import PalletItem from './PalletItem'


const EmptySpace = ({ palletsOnShelves }: { palletsOnShelves: PalletsOnShelf[] }) => {
  const [positions, setPositions] = useState(palletsOnShelves)
  const [activePalletId, setActivePalletId] = useState<{ palletId: UniqueIdentifier, shelfId: string } | null>(null)

  const getShelf = (shelfId: string) => {
    const shelfFound = palletsOnShelves?.find(shelf => shelf.shelfId === shelfId)
    if (!shelfFound) return { shelf: undefined, indexShelf: undefined }
    const indexShelf = palletsOnShelves.findIndex(shelf => shelf.shelfId === shelfFound.shelfId)
    return { shelf: shelfFound, indexShelf }
  }
  const findPalletOnShelfs = (id: UniqueIdentifier, shelfId: string) => {
    const { shelf } = getShelf(shelfId)
    const palletFound = shelf?.pallets.find(pallet => pallet.numberId === id)
    return palletFound || null
  }

  const onDragStart = (evt: DragStartEvent) => {
    const id = evt.active.id
    const shelf: string = evt.active.data.current?.sortable.containerId
    setActivePalletId({ palletId: id, shelfId: shelf })
    console.log("start", evt, activePalletId)

  }

  const onDragMove = (evt: DragMoveEvent) => {
    let activePallet
    let originPosition
    let newPosition
    console.log("move", evt)

  }

  const onDragEnd = (evt: DragEndEvent) => {
    console.log("end", evt, activePalletId)
    setActivePalletId(null)
  }

  return (
    <section className="empty-space">
      <DndContext
        onDragStart={ onDragStart }
        onDragMove={ onDragMove }
        onDragEnd={ onDragEnd }
        collisionDetection={ closestCenter }
      >
        {/* <SortableContext items={ palletsOnShelves.map(shelf => {
          return { ...shelf, id: shelf.shelfId }
        }) }> */}

        {
          palletsOnShelves?.map((shelf: PalletsOnShelf) => {
            return (
              <Shelf
                id={ shelf.shelfId }
                key={ shelf.shelfId }
                title={ shelf.shelfId }
              >
                <SortableContext items={ shelf.pallets.map(pallet => pallet.numberId) } id={ shelf.shelfId }>

                  { shelf.pallets?.map((pallet, index) => pallet &&
                    <PalletItem
                      key={ pallet.numberId }
                      id={ pallet.numberId }
                      pallet={ pallet }
                    />
                  ) }
                </SortableContext>
              </Shelf>
            )
          })
        }
        {/* </SortableContext> */ }
        <DragOverlay>
          { (activePalletId) ? (
            <PalletItem pallet={ findPalletOnShelfs(activePalletId.palletId, activePalletId.shelfId)! } id={ activePalletId.palletId } />
          ) : null

          }
        </DragOverlay>
      </DndContext>
    </section>
  )
}

export default EmptySpace