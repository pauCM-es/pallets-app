"use client"
//libs
import React, { useEffect } from 'react'
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
//components
import { ShelfItem } from './ShelfItem'
import PalletItem from './PalletItem'
//utils
import { useMovePalet } from '@/hooks/camaras/useMovePallet'
import { useAppDispatch, useAppSelector } from '@/libs/store'
import { setData, setPalletsData } from '@/libs/features/camaras/camaraSlice'
//types
import { ItemsByShelf } from '@/types/camara.types'
//styles
import '@/styles/EmptySpace.style.scss'
//types
import { Camara, Pallet, Shelf } from "@prisma/client"

interface EmptySpaceProps {
  itemsGroupedByShelf: ItemsByShelf
  palletsData: Pallet[],
  camara: Camara
  shelves: Shelf[]
}

const EmptySpace = ({
  itemsGroupedByShelf,
  palletsData,
  camara,
  shelves
}: EmptySpaceProps) => {
  const dispatch = useAppDispatch()
  const { palletsGroupedByShelf } = useAppSelector(state => state.camara)

  const {
    onDragStart,
    onDragMove,
    onDragEnd,
    initialPositionsRef,
    activePallet,
    currentPositions
  } = useMovePalet(itemsGroupedByShelf)


  useEffect(() => {
    dispatch(setPalletsData(palletsData))
    dispatch(setData({ key: "shelvesOnCamera", value: shelves }))
    dispatch(setData({ key: "palletsGroupedByShelf", value: itemsGroupedByShelf }))
    dispatch(setData({ key: "currentCamaraId", value: camara.code }))

    return () => {
      dispatch(setPalletsData(undefined))
      dispatch(setData({ key: "shelvesOnCamera", value: undefined }))
      dispatch(setData({ key: "palletsGroupedByShelf", value: undefined }))
      dispatch(setData({ key: "currentCamaraId", value: "" }))
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
        { currentPositions &&
          Object.keys(currentPositions).map((shelf: string) => (
            <ShelfItem
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
            </ShelfItem>
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