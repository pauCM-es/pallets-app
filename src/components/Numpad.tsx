import React from 'react'
import { Button } from 'devextreme-react'
import { ClickEvent } from 'devextreme/ui/button'
import "@/styles/Numpad.style.scss"

type NumpadProps = {
  setInput: React.Dispatch<React.SetStateAction<string>>
}
export const Numpad = ({ setInput }: NumpadProps) => {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "abc", "0", "<"]

  const handleNumberClick = (key: string) => {
    setInput(prev => {
      return `${prev}${key}`
    })
  }
  const handleDeleteClick = () => {
    setInput(prev => {
      if (prev.length <= 0) return ""
      return prev.slice(0, prev.length - 1)
    })
  }

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
            onClick={ key === "<" ? handleDeleteClick : () => handleNumberClick(key)
            }
          />)
        }
      </ul>
    </section>
  )
}