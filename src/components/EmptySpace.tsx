"use client"

import { PalletsOnShelf } from '@/types/prisma.types'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Shelf from './Shelf'
import '@/styles/EmptySpace.style.scss'
import { DndContext, DragEndEvent, DragMoveEvent, DragOverlay, DragStartEvent, DroppableContainer, UniqueIdentifier, closestCenter } from '@dnd-kit/core'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import PalletItem from './PalletItem'
import { Pallet } from '@prisma/client'


const EmptySpace = ({ palletsOnShelves }: { palletsOnShelves: PalletsOnShelf[] }) => {
  const positionRef = useRef(palletsOnShelves)
  const [positions, setPositions] = useState(palletsOnShelves)
  const [activePallet, setActivePallet] = useState<{ pallet: Pallet, indexOnShelf: number, shelfId: string } | null>(null)
  // const [newActivePalletPosition, setNewActivePalletPosition] = useState<{ newIndex: number, newShelfId: string } | null>(null)

  useEffect(() => {
    console.log("position change", positions.map(shelf => shelf.pallets.map(pallet => pallet.numberId)))

  }, [positions])


  const getShelf = (shelfId: string): [PalletsOnShelf, number] | [undefined, undefined] => {
    const shelfFound = palletsOnShelves?.find(shelf => shelf.shelfId === shelfId)
    if (!shelfFound) return [undefined, undefined]
    const indexShelf = palletsOnShelves.findIndex(shelf => shelf.shelfId === shelfFound.shelfId)
    return [shelfFound, indexShelf]
  }
  const findPalletOnShelfs = (id: UniqueIdentifier, shelfId: string) => {
    const [shelf] = getShelf(shelfId)
    const palletFound = shelf?.pallets.find(pallet => pallet.numberId === id)
    return palletFound || null
  }

  const onDragStart = (evt: DragStartEvent) => {
    const id = evt.active.id
    const shelf: string = evt.active.data.current?.sortable.containerId
    const index = evt.active.data.current?.sortable.index
    const activePalletData = findPalletOnShelfs(id, shelf)
    activePalletData && setActivePallet({ pallet: activePalletData, indexOnShelf: index, shelfId: shelf })

    console.log("start", `palet ${id} position ${shelf}[${index}]`)

  }

  const onDragMove = (evt: DragMoveEvent) => {
    const { active, over } = evt
    let activePalletInted = active?.data.current?.sortable.index
    let newShelfId: string = over?.data.current?.sortable.containerId
    let newPalletIndex: number = over?.data.current?.sortable.index
    let [prevShelf, prevIndexShelf] = getShelf(activePallet?.shelfId!)


    if (activePallet?.shelfId !== newShelfId) {
      let [newShelf, newIndexShelf] = getShelf(newShelfId)

      console.log(`origin shelf: ${prevIndexShelf} to ${newIndexShelf}`)

      let prevPositions = [...positions]
      prevPositions[prevIndexShelf!].pallets.splice(activePallet?.indexOnShelf!, 1)
      prevPositions[newIndexShelf!].pallets.splice(newPalletIndex, 0, activePallet?.pallet!)
      setActivePallet(oldState => {
        if (oldState) {
          return {
            ...oldState,
            indexOnShelf: newPalletIndex,
            shelfId: newShelfId
          }
        } else return null
      })
      setPositions(prevPositions)
    } else {
      if (activePallet.indexOnShelf === newPalletIndex) return

      let prevPositions = [...positions]
      prevPositions[prevIndexShelf!].pallets = arrayMove(
        prevPositions[prevIndexShelf!].pallets,
        activePallet.indexOnShelf,
        newPalletIndex
      )

      console.log("move same shelf", `palet from ${activePallet.shelfId}[${activePallet.indexOnShelf}] to position ${newShelfId}[${newPalletIndex}]`)

      setActivePallet(oldState => {
        if (oldState) {
          return {
            ...oldState,
            indexOnShelf: newPalletIndex,
          }
        } else return null
      })
      setPositions(prevPositions)
    }
  }

  const onDragEnd = (evt: DragEndEvent) => {
    console.log("end", evt, positions)
    setActivePallet(null)
    positionRef.current = positions
  }

  return (
    <section className="empty-space">
      <DndContext
        onDragStart={ onDragStart }
        onDragMove={ onDragMove }
        onDragEnd={ onDragEnd }
        collisionDetection={ closestCenter }
      >
        {
          positionRef?.current.map((shelf: PalletsOnShelf) => (
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
          )
        }
        <DragOverlay>
          { (activePallet) ? (
            <PalletItem pallet={ activePallet.pallet } id={ activePallet.pallet.numberId } />
          ) : null

          }
        </DragOverlay>
      </DndContext>
    </section>
  )
}

export default EmptySpace