import React, { useEffect, useState } from 'react'
import { Button, NumberBox } from 'devextreme-react'
import { Numpad } from './Numpad'
import { useAppSelector } from '@/libs/store'
import { OptionsList } from './OptionsList'
import '@/styles/NewPalletDrawer.style.scss'

export type SelectedOptions = {
  productCode: undefined | string
  caliber: undefined | string
  size: undefined | string
  boxBrandCode: undefined | string
}


export const NewPalletDrawer = () => {

  const [numberId, setNumberId] = useState<number | undefined>(undefined)
  const [optionsSelected, setOptionsSelected] = useState<SelectedOptions>({
    productCode: undefined,
    caliber: undefined,
    size: undefined,
    boxBrandCode: undefined
  })
  const { products, boxBrands } = useAppSelector(state => state.camara)

  useEffect(() => {
    console.log(optionsSelected)

  }, [optionsSelected])

  return (
    <div className='new-pallet-drawer__content'>
      <h2 className='content__title'>Add new pallet</h2>
      <NumberBox
        className='content__id-input'
        value={ numberId }
        showClearButton={ true }
      />
      <Numpad />
      <div className="content__action-btns">
        <Button
          text='ADD'
          onClick={ () => console.log("pallet creado: ...") }
          type='success'
          width={ "6rem" }
          height={ "2rem" }
          focusStateEnabled={ false } />
        <Button
          text='RESET'
          type='danger'
          width={ "6rem" }
          height={ "2rem" }
          focusStateEnabled={ false } />
      </div>
      <section className="content__properties-list">
        <OptionsList
          title="Product:"
          property="productCode"
          onSelect={ setOptionsSelected }
          optionSelected={ optionsSelected.productCode }
          optionsList={ products.map(prod => prod.code) }
        />
        <OptionsList
          title="Box brand:"
          property="boxBrandCode"
          onSelect={ setOptionsSelected }
          optionSelected={ optionsSelected.boxBrandCode }
          optionsList={ boxBrands.map(box => box.code) }
        />

      </section>
    </div>
  )
}