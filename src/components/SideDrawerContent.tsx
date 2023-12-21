import React, { useState } from 'react'
import '@/styles/SideDrawerContent.style.scss'
import { NumberBox } from 'devextreme-react'


const SideDrawerContent = () => {

  const [numberId, setNumberId] = useState<number | undefined>(undefined)


  return (
    <div className='side-drawer__content'>

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

const Numpad = () => {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "abc", "0", "<"]
  return (
    <section className="numpad">
      <ul className="numpad__keys">
        {
          keys.map((key, i) => <li
            className={ `numpad__key ${++i % 3 === 1 ? "clear-left" : ''}` }
          >{ key }</li>)
        }
      </ul>
    </section>
  )
}

export default SideDrawerContent