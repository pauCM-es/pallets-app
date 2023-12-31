import React from 'react'
import { Button } from 'devextreme-react'
import { ClickEvent } from 'devextreme/ui/button'
import "@/styles/Numpad.style.scss"

type NumpadProps = {
  handleBtnClick: (e: ClickEvent) => void
}
export const Numpad = ({ handleBtnClick }: NumpadProps) => {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "abc", "0", "<"]



  return (
    <section className="numpad">
      <ul className="numpad__keys">
        {
          keys.map((key, i) => <Button
            key={ key }
            className={ `numpad__key ${++i % 3 === 1 ? "clear-left" : ''}` }
            text={ key }
            type='normal'
            stylingMode='contained'
            onClick={ (e) => handleBtnClick(e) }
          />)
        }
      </ul>
    </section>
  )
}