'use client'

import React from 'react'
import { Pallet } from '@prisma/client'
import PalletItem from './PalletItem'
import '@/styles/Shelf.style.scss'

interface ShelfProps {
  title: string,
  pallets: (Pallet | undefined)[]
}

const Shelf = ({ title, pallets }: ShelfProps) => {

  return (
    <div className='shelf'>
      <div className="shelf__title">{ title }</div>

      <div
        className="shelf__content"
      >
        { pallets?.map((pallet, index) => pallet && <PalletItem
          pallet={ pallet }
          key={ pallet.id }
          index={ index }
        />
        ) }

      </div>
    </div>
  )
}

export default Shelf