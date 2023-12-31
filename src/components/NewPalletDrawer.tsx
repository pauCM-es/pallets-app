import React, { useEffect, useState } from 'react'
import { Button, NumberBox, ScrollView } from 'devextreme-react'
import { Numpad } from './Numpad'
import { useAppSelector } from '@/libs/store'
import { OptionsList } from './OptionsList'
import '@/styles/NewPalletDrawer.style.scss'
import { ClickEvent } from 'devextreme/ui/button'

export type SelectedOptions = {
  productCode: undefined | string
  caliber: undefined | string
  size: undefined | string
  boxBrandCode: undefined | string
  palletSize: "EU" | "IN"
}

const initialStateOptions: SelectedOptions = {
  productCode: undefined,
  caliber: undefined,
  size: undefined,
  boxBrandCode: undefined,
  palletSize: "EU"
}

export const NewPalletDrawer = () => {

  const [numberId, setNumberId] = useState<string>("")
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
  useEffect(() => {
    console.log(numberId)

  }, [numberId])

  return (
    <div className='new-pallet-drawer__content'>
      <h2 className='content__title'>Add new pallet</h2>
      <NumberBox
        className='content__id-input'
        value={ numberId.length ? Number(numberId) : undefined }
        showClearButton={ true }
        placeholder='Number ID'
        max={ 5 }
        text={ numberId.length ? numberId : undefined }
        stylingMode='outlined'
        onInput={ (e) => setNumberId("") }
        height={ "3rem" }
      />
      <Numpad
        handleBtnClick={ (e: ClickEvent) => {
          setNumberId(prev => {
            return `${prev}${e.element.innerText}`
          })
          console.log(e.element.innerText)
        } }
      />
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
          onClick={ () => {
            setOptionsSelected(initialStateOptions)
            setNumberId("")
          } }
        />
      </div>
      <ScrollView
        useNative={ false }
        scrollByThumb={ true }
        scrollByContent={ true }
        className="content__properties-scroll-view"
        showScrollbar="always"
      >
        <section>
          <OptionsList
            key={ "palletSize-list" }
            title="Pallet size:"
            property="palletSize"
            onSelect={ setOptionsSelected }
            optionSelected={ optionsSelected.palletSize }
            optionsList={ ["EU", "IN"] }
          />

          <OptionsList
            key={ "product-list" }
            title="Product:"
            property="productCode"
            onSelect={ setOptionsSelected }
            optionSelected={ optionsSelected.productCode }
            optionsList={ products.map(prod => prod.code) }
          />
          {
            optionsSelected.productCode && (<>
              <OptionsList
                key={ "caliber-list" }
                title="Caliber:"
                property="caliber"
                onSelect={ setOptionsSelected }
                optionSelected={ optionsSelected.caliber }
                optionsList={ products.find(product => product.code === optionsSelected.productCode)?.calibers }

              />
              <OptionsList
                key={ "size-list" }
                title="Pieces per box (size):"
                property="size"
                onSelect={ setOptionsSelected }
                optionSelected={ optionsSelected.size }
                optionsList={ ["16", "18", "20", "22", "24", "26", "28", "30", "32", "35", "37", "39", "42", "45"] }

              />
            </>
            )
          }
          <OptionsList
            key={ "boxBrands-list" }
            title="Box brand:"
            property="boxBrandCode"
            onSelect={ setOptionsSelected }
            optionSelected={ optionsSelected.boxBrandCode }
            optionsList={ boxBrands.map(box => box.code) }
          />
        </section>
      </ScrollView>

    </div>
  )
}