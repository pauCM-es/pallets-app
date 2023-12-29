import React from 'react'
import { Button } from 'devextreme-react'
import "@/styles/Numpad.style.scss"

export const Numpad = () => {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "abc", "0", "<"]

  return (
    <section className="numpad">
      <ul className="numpad__keys">
        {
          keys.map((key, i) => <Button
            key={ key }
            // className={ `${++i % 3 === 1 ? "clear-left" : ''}` }
            className={ `numpad__key ${++i % 3 === 1 ? "clear-left" : ''}` }
            text={ key }
            type='normal'
            stylingMode='contained'

          />)
        }
      </ul>
    </section>
  )
}