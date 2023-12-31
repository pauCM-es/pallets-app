
import { useAppSelector } from '@/libs/store'
import { Popup } from 'devextreme-react'
import React from 'react'

type NewPalletPopupProps = {
  isActive: boolean
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

const NewPalletPopup = ({ isActive, setVisibility }: NewPalletPopupProps) => {
  const { palletOnEdit } = useAppSelector(state => state.camara)

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
      <div className="popup__content">
        <p>{ palletOnEdit?.numberId }</p>
        <p>{ palletOnEdit?.boxBrand }</p>
        <p>{ palletOnEdit?.size }</p>
        <p>{ palletOnEdit?.pieces }</p>
      </div>
    </Popup>
  )
}

export default NewPalletPopup