
import { addNewPallet } from '@/app/services/pallets.service'
import { setData, updateWithNewPallet } from '@/libs/features/camaras/camaraSlice'
import { useAppDispatch, useAppSelector } from '@/libs/store'
import { hasPosition } from '@/types/camara.types'
import { Position } from '@/types/prisma.types'
import { Button, Popup } from 'devextreme-react'
import { ToolbarItem } from 'devextreme-react/cjs/popup'
import React, { useCallback, useEffect, useState } from 'react'

type NewPalletPopupProps = {
  isActive: boolean
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

const NewPalletPopup = ({ isActive, setVisibility }: NewPalletPopupProps) => {
  const dispatch = useAppDispatch()

  const { palletOnEdit, palletsGroupedByShelf, currentCamaraId } = useAppSelector(state => state.camara)
  const [shelfSelected, setShelfSelected] = useState("")
  const [shelfHightSelected, setShelfHightSelected] = useState(1)

  useEffect(() => {
    console.log("has change after new??:", palletsGroupedByShelf)

  }, [palletsGroupedByShelf])

  const handleShelfSelected = (name: string) => {
    if (name === shelfSelected) {
      setShelfSelected('')
    } else {
      console.log('shelfSelected :', name)
      setShelfSelected(name)
    }
  }

  const handleConfirmData = () => {
    if (!palletsGroupedByShelf || !palletOnEdit) return
    const positionToPlace: Position = {
      shelfId: shelfSelected,
      height: shelfHightSelected,
      index: palletsGroupedByShelf[shelfSelected]?.length || 0
    }
    const newPalletData = { ...palletOnEdit, camaraCode: currentCamaraId, position: positionToPlace }
    console.log('newPalletData :', newPalletData)

    addNewPallet(newPalletData).then(res => {
      if (hasPosition(res.data)) {
        dispatch(updateWithNewPallet(res.data))
      } else {
        throw new Error("new pallet has no position")
      }
      console.log("new pallet created:", res.data)
      dispatch(setData({ key: 'palletOnEdit', value: undefined }))
      setVisibility(false)
    })
  }


  const getConfirmBtnOptions = useCallback(() => ({
    text: "Confirm",
    onClick: handleConfirmData,
    stylingMode: "contained",
    type: "success"
  }), [palletsGroupedByShelf, shelfSelected])

  return (
    <Popup
      className='popup__new-pallet'
      height={ "30rem" }
      width={ "50rem" }
      position={ "center" }
      title="Add new pallet to camara:"
      visible={ isActive }
      hideOnOutsideClick={ true }
      onHiding={ () => setVisibility(false) }
    >
      <ToolbarItem
        location='after'
        toolbar='bottom'
        widget='dxButton'
        options={ getConfirmBtnOptions() }
      />
      <section className="content__pallet-data">
        <h3 className="pallet-data__title">
          New pallet data:
        </h3>
        <div className="pallet-data__data">
          <p>{ palletOnEdit?.numberId }</p>
          <p>{ palletOnEdit?.product }</p>
          <p>{ palletOnEdit?.boxBrand }</p>
          <p>{ palletOnEdit?.size }</p>
          <p>{ palletOnEdit?.pieces }</p>
        </div>
      </section>

      <section className="content__select-shelf">
        <h3 className="select-shelf__title">
          Select the shelf where to place the pallet:
        </h3>
        <div className="select-shelf__list">
          { palletsGroupedByShelf && Object.keys(palletsGroupedByShelf).map(shelfName => (
            <Button
              key={ shelfName }
              text={ `${shelfName}: ${palletsGroupedByShelf[shelfName].length} pallets` }
              stylingMode='outlined'
              className={ `select-shelf__btn ${shelfSelected === shelfName ? "select-shelf__btn--selected" : ""}` }
              onClick={ () => handleShelfSelected(shelfName) }
            />
          )) }
        </div>
      </section>

    </Popup>
  )
}

export default NewPalletPopup