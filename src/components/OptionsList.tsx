import { Button, ScrollView } from "devextreme-react"
import { SelectedOptions } from "./NewPalletDrawer"

type OptionsList = {
  title: string
  property: keyof SelectedOptions
  optionsList: string[] | undefined
  onSelect: React.Dispatch<React.SetStateAction<SelectedOptions>>
  optionSelected: string | undefined
}

export const OptionsList = ({ title, property, optionsList, onSelect, optionSelected }: OptionsList) => {

  return (
    <section className="property">
      <h4 className="property__title">
        { title } <span>{ optionSelected || "" }</span>
      </h4>
      <ScrollView
        useNative={ false }
        scrollByThumb={ true }
        scrollByContent={ true }
        className="options__scroll-view"
        showScrollbar="always"
        direction="horizontal"
      >
        <div className="options__list">

          { optionsList?.map(opt => (
            <Button
              key={ opt }
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
              width={ "3rem" }
            />
          )) }
        </div>
      </ScrollView>
    </section>
  )
}