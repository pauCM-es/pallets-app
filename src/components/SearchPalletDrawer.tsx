import React, { use, useEffect, useState } from 'react'
import { Numpad } from './Numpad'
import { Lookup } from 'devextreme-react'

import '@/styles/SearchPalletDrawer.style.scss'
import { useAppSelector } from '@/libs/store'
import { Pallet } from '@prisma/client'


const SearchPalletDrawer = () => {
  const { palletsOnCurrentCamara } = useAppSelector(state => state.camara)

  const resultTemplate = (item: Pallet) => {
    return `${item.numberId} - ${item.product} ${item.boxBrand || "--"} ${item.pieces || "--"}`
  }

  return (
    <div className='search-drawer__content'>


    </div>
  )
}

export default SearchPalletDrawer