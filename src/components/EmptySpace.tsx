"use client"

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Shelf from './Shelf'
import '@/styles/EmptySpace.style.scss'
import { DndContext, DragEndEvent, DragMoveEvent, DragOverlay, DragStartEvent, DroppableContainer, UniqueIdentifier, closestCenter, closestCorners } from '@dnd-kit/core'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import PalletItem from './PalletItem'
import { Pallet } from '@prisma/client'
import { EmptyShelf } from '@/types/shelf.types'
import { updateAfterMove } from '@/app/services/camara.service'
import { useMovePalet } from '@/hooks/camaras/useMovePallet'
import { ItemsOnShelf } from '@/types/camara.types'

interface EmptySpaceProps { itemsGroupedByShelf: ItemsOnShelf[] }

const EmptySpace = ({ itemsGroupedByShelf }: EmptySpaceProps) => {

  const { onDragStart, onDragMove, onDragEnd, positionRef, activePallet } = useMovePalet(itemsGroupedByShelf)



  return (
    <section className="empty-space">
      <DndContext
        onDragStart={ onDragStart }
        onDragMove={ onDragMove }
        onDragEnd={ onDragEnd }
        collisionDetection={ closestCorners }
      >
        {
          positionRef?.current.map((shelf: Pallet) => (
            <Shelf
              id={ shelf.shelfId }
              key={ shelf.shelfId }
              title={ shelf.shelfId }
            >
              <SortableContext
                items={ shelf.pallets.length > 0 ? shelf.pallets.map(pallet => pallet.numberId) : [`empty-${shelf.shelfId}`] }
                id={ shelf.shelfId }
                strategy={ verticalListSortingStrategy }
              >

                { shelf && !isShelfEmpty(shelf)
                  ? shelf.pallets?.map((pallet) => pallet &&
                    <PalletItem
                      key={ pallet.numberId }
                      id={ pallet.numberId }
                      pallet={ pallet }
                      isActive={ activePallet?.pallet.numberId === pallet.numberId }
                    />
                  )
                  : <PalletItem
                    key={ `empty-${shelf.shelfId}` }
                    id={ `empty-${shelf.shelfId}` }
                    pallet={ { numberId: "empty" } }
                  />
                }
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