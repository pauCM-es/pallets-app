"use client"
//libs
import React, { useEffect } from 'react'
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
//components
import Shelf from './Shelf'
import PalletItem from './PalletItem'
//utils
import { useMovePalet } from '@/hooks/camaras/useMovePallet'
//types
import { ItemsByShelf } from '@/types/camara.types'
//styles
import '@/styles/EmptySpace.style.scss'

interface EmptySpaceProps { itemsGroupedByShelf: ItemsByShelf }

const EmptySpace = ({ itemsGroupedByShelf }: EmptySpaceProps) => {

  const {
    onDragStart,
    onDragMove,
    onDragEnd,
    initialPositionsRef,
    activePallet,
    currentPositions
  } = useMovePalet(itemsGroupedByShelf)


  useEffect(() => {
    console.log(itemsGroupedByShelf)


    return () => {

    }
  }, [])



  return (
    <section className="empty-space">
      <DndContext
        onDragStart={ onDragStart }
        onDragMove={ onDragMove }
        onDragEnd={ onDragEnd }
        collisionDetection={ closestCorners }
      >
        {
          Object.keys(currentPositions).map((shelf: string) => (
            <Shelf
              id={ shelf }
              key={ shelf }
              title={ shelf }
            >
              <SortableContext
                items={
                  currentPositions[shelf].length > 0 ? currentPositions[shelf]
                    .map(pallet => pallet.numberId) : [`empty-${shelf}`]
                }
                id={ shelf }
                strategy={ verticalListSortingStrategy }
              >

                { currentPositions[shelf].length
                  ? currentPositions[shelf]?.map((item) => item &&
                    <PalletItem
                      key={ `${shelf}-${item.numberId}` }
                      id={ item.numberId }
                      pallet={ item }
                      isActive={ activePallet?.numberId === item.numberId }
                    />
                  )
                  :
                  <PalletItem
                    key={ `empty-${shelf}` }
                    id={ `empty-${shelf}` }
                    pallet={ { numberId: "empty" } }
                  />
                  // <></>
                }
              </SortableContext>
            </Shelf>
          )
          )
        }
        <DragOverlay>
          { (activePallet) ? (
            <PalletItem pallet={ activePallet } id={ activePallet.numberId } />
          ) : null

          }
        </DragOverlay>
      </DndContext>
    </section>
  )
}

export default EmptySpace