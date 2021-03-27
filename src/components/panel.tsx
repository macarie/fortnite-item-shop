import React from 'react'

import createClassName from '../helpers/create-class-name'

import Card from './card'

import type ShopEntryType from '../types/shop-entry'

type PanelProps = {
  panel: Array<ShopEntryType<string>>
  isFeaturedSection: boolean
  panelIndex: number
  panelsLength: number
}

export const Panel = ({
  panel,
  isFeaturedSection,
  panelIndex,
  panelsLength,
}: PanelProps) => {
  return (
    <div
      className={createClassName([
        'panel',
        panel.some((card) => card.items[0].rarity.value === 'legendary') &&
          'legendary',
      ])}
      data-children={panel.length.toString()}
    >
      {panel.map((card, cardIndex) => (
        <Card
          key={card.items[0].name}
          card={card}
          cardIndex={cardIndex}
          isFeaturedSection={isFeaturedSection}
          panelIndex={panelIndex}
          panelLength={panel.length}
          panelsLength={panelsLength}
        />
      ))}
    </div>
  )
}

export default Panel
