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

const initialStateOptions = {
  productCode: undefined,
  caliber: undefined,
  size: undefined,
  boxBrandCode: undefined
}

export const NewPalletDrawer = () => {

  const [numberId, setNumberId] = useState<number | undefined>(undefined)
  const [optionsSelected, setOptionsSelected] = useState<SelectedOptions>(initialStateOptions)
  const { products, boxBrands } = useAppSelector(state => state.camara)

  useEffect(() => {
    setOptionsSelected(prev => {
      return {
        ...prev,
        caliber: undefined
      }
    })
  }, [optionsSelected.productCode])

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
          focusStateEnabled={ false }
          onClick={ () => setOptionsSelected(initialStateOptions) }
        />
      </div>
      <section className="content__properties-list">
        <OptionsList
          title="Product:"
          property="productCode"
          onSelect={ setOptionsSelected }
          optionSelected={ optionsSelected.productCode }
          optionsList={ products.map(prod => prod.code) }
        />
        {
          optionsSelected.productCode && (
            <OptionsList
              title="Caliber:"
              property="caliber"
              onSelect={ setOptionsSelected }
              optionSelected={ optionsSelected.caliber }
              optionsList={ products.find(product => product.code === optionsSelected.productCode)?.calibers }

            />
          )
        }
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