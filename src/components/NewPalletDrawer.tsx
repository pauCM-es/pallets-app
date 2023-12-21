import React, { useState } from 'react'
import '@/styles/NewPalletDrawer.style.scss'
import { Button, NumberBox } from 'devextreme-react'
import { Numpad } from './Numpad'


export const NewPalletDrawer = () => {

  const [numberId, setNumberId] = useState<number | undefined>(undefined)


  return (
    <div className='new-pallet-drawer__content'>

      <NumberBox
        className='content__id-input'
        value={ numberId }
        showClearButton={ true }
      />
      <Numpad />
      <section className="options">

      </section>
    </div>
  )
}