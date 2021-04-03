import React from 'react'

import createClassName from '../helpers/create-class-name'

import Card from './card'

import type ShopEntryType from '../types/shop-entry'
import type { CardProps } from './card'

type PanelType = 'bundle' | 'outfits' | 'items'

const computePanelType = (panel: Array<ShopEntryType<string>>): PanelType => {
  if (
    panel[0].bundle !== null ||
    panel[0].items[0].id === 'CID_A_060_Athena_Commando_M_Daytrader_8MRO2'
  ) {
    return 'bundle'
  }

  const numberOfOutfits = panel.reduce(
    (outfits, card) => outfits + Number(card.items[0].type.value === 'outfit'),
    0
  )

  if (numberOfOutfits >= panel.length / 2) {
    return 'outfits'
  }

  return 'items'
}

const createAndFillArray = (length: number) => {
  const array = new Array(length).fill('small')

  if (length % 2 === 1) {
    array[0] = 'normal'
  }

  return array
}

const computeCardSize = (
  panel: Array<ShopEntryType<string>>,
  panelType: PanelType
): ((index: number) => CardProps['size']) => {
  if (panelType === 'bundle') {
    return () => 'double'
  }

  if (panelType === 'outfits') {
    return () => 'normal'
  }

  const cardSizes: Array<CardProps['size']> = createAndFillArray(panel.length)

  return (index) => {
    return cardSizes[index]
  }
}

type PanelProps = {
  panel: Array<ShopEntryType<string>>
}

export const Panel = ({ panel }: PanelProps) => {
  const panelType = computePanelType(panel)
  const getCardSize = computeCardSize(panel, panelType)

  return (
    <div
      className={createClassName(['panel', panelType])}
      data-children={panel.length.toString()}
    >
      {panel.map((card, cardIndex) => {
        const cardSize = getCardSize(cardIndex)

        return (
          <Card
            key={card.bundle?.name ?? card.items[0].name}
            card={card}
            size={cardSize}
          />
        )
      })}
    </div>
  )
}

export default Panel
