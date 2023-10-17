'use client'

import React from 'react'
import { Pallet } from '@prisma/client'
import PalletItem from './PalletItem'
import { Draggable, Droppable } from 'react-beautiful-dnd'

interface ShelfProps {
  title: string,
  pallets: (Pallet | undefined)[]
}

const Shelf = ({ title, pallets }: ShelfProps) => {
  return (
    <div className='shelf'>
      <div className="shelf__title">{ title }</div>

      <Droppable droppableId={ title }>
        { provided => (
          <div
            className="shelf__content"
            ref={ provided.innerRef }
            { ...provided.droppableProps }
          >
            { pallets?.map((pallet, index) => pallet && <Draggable draggableId={ pallet.numberId } index={ index }>
              { (provided) => (
                <PalletItem
                  key={ pallet.id }
                  pallet={ pallet }
                  { ...provided.draggableProps }
                  { ...provided.dragHandleProps }
                />
              ) }
            </Draggable>) }
            { provided.placeholder }
          </div>)
        }
      </Droppable>
    </div>
  )
}

export default Shelf