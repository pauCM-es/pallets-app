import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button, NumberBox, ScrollView } from 'devextreme-react'
import { Numpad } from './Numpad'
import { useAppDispatch, useAppSelector } from '@/libs/store'
import { OptionsList } from './OptionsList'
import '@/styles/NewPalletDrawer.style.scss'
import { ClickEvent } from 'devextreme/ui/button'
import { type } from 'os'
import NewPalletPopup from './NewPalletPopup'
import { setData } from '@/libs/features/camaras/camaraSlice'
import { AddPallet, PalletMinRequired } from '@/types/pallet.types'

export type SelectedOptions = {
  productCode: undefined | string
  caliber: undefined | string
  pieces: undefined | string
  boxBrandCode: undefined | string
  palletSize: "EU" | "IN"
}

const initialStateOptions: SelectedOptions = {
  productCode: undefined,
  caliber: undefined,
  pieces: undefined,
  boxBrandCode: undefined,
  palletSize: "EU"
}

const maxNumberIds = 99999

export const NewPalletDrawer = () => {

  const [numberId, setNumberId] = useState<string>("")
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false)
  const [optionsSelected, setOptionsSelected] = useState<SelectedOptions>(initialStateOptions)
  const { products, boxBrands, palletOnEdit } = useAppSelector(state => state.camara)
  const dispatch = useAppDispatch()
  const numberIdBoxRef = useRef<NumberBox | null>(null)

  useEffect(() => {
    setOptionsSelected(prev => {
      return {
        ...prev,
        caliber: undefined
      }
    })
  }, [optionsSelected.productCode])

  useEffect(() => {

  }, [numberId])

  const confirmData = useCallback(() => {
    if (!numberId || !optionsSelected.productCode ||
      !optionsSelected.boxBrandCode
    ) return
    const newPalletData: PalletMinRequired = {
      numberId,
      product: optionsSelected.productCode,
      boxBrand: optionsSelected.boxBrandCode,
    }
    optionsSelected?.caliber && (newPalletData.size = optionsSelected.caliber)
    optionsSelected?.pieces && (newPalletData.pieces = +optionsSelected?.pieces)
    dispatch(setData({ key: "palletOnEdit", value: newPalletData }))
    setIsPopupVisible(true)
  }, [optionsSelected, numberId])

  return (
    <>
      <div className='new-pallet-drawer__content'>
        <h2 className='content__title'>Add new pallet</h2>
        <NumberBox
          ref={ numberIdBoxRef }
          className='content__id-input'
          value={ numberId.length ? Number(numberId) : undefined }
          showClearButton={ true }
          placeholder='Number ID'
          text={ numberId.length ? numberId : undefined }
          stylingMode='outlined'
          onInput={ (e) => setNumberId("") }
          onValueChanged={ (e) => {
            console.log("value", e.value)
          } }
          isValid={
            (numberId && +numberId <= maxNumberIds)
              ? true
              : false
          }
          validationMessagePosition='top'
          validationMessageMode='auto'
          invalidValueMessage='ID max length: 5 digits'
          // onKeyDown={ (e) => console.log("key", e?.event?.originalEvent?.key)

          // }
          mode='number'
        />
        <Numpad
          setInput={ setNumberId }
        />
        <div className="content__action-btns">
          <Button
            text='ADD'
            onClick={ confirmData }
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
                  title="Pieces per box:"
                  property="pieces"
                  onSelect={ setOptionsSelected }
                  optionSelected={ optionsSelected.pieces }
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
      <NewPalletPopup
        isActive={ isPopupVisible }
        setVisibility={ setIsPopupVisible }
      />
    </>
  )
}