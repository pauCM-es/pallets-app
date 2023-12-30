import { Button } from "devextreme-react"
import { SelectedOptions } from "./NewPalletDrawer"

type OptionsList = {
  title: string
  property: keyof SelectedOptions
  optionsList: string[]
  onSelect: React.Dispatch<React.SetStateAction<SelectedOptions>>
  optionSelected: string | undefined
}

export const OptionsList = ({ title, property, optionsList, onSelect, optionSelected }: OptionsList) => {

  return (
    <section className="property">
      <h4 className="property__title">
        { title }
      </h4>
      <div className="options__list">
        { optionsList.map(opt => (
          <Button
            text={ opt.toUpperCase() }
            className={ `options__btn options__btn${opt === optionSelected
              ? "--selected"
              : ""
              }` }
            stylingMode='outlined'
            focusStateEnabled={ false }
            onClick={ () => onSelect(prev => {
              return { ...prev, [property]: opt }
            }) }
          />
        )) }
      </div>
    </section>
  )
}