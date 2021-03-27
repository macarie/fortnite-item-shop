import React from 'react'

import useRelativeTimeFormatter from '../hooks/use-relative-time-formatter'
import daysSinceNow from '../helpers/days-since-now'
import secondLastOrLast from '../helpers/second-last-or-last'
import getFeaturedOrIcon from '../helpers/get-featured-or-icon'

import type ShopEntryType from '../types/shop-entry'

type CardProps = {
  card: ShopEntryType<string>
  cardIndex: number
  isFeaturedSection: boolean
  panelIndex: number
  panelLength: number
  panelsLength: number
}

export const Card = ({
  card,
  cardIndex,
  isFeaturedSection,
  panelIndex,
  panelLength,
  panelsLength,
}: CardProps) => {
  const relativeTimeFormatter = useRelativeTimeFormatter()

  const getImage = getFeaturedOrIcon(
    isFeaturedSection ? panelLength : panelsLength
  )
  const daysSinceLastSeen = daysSinceNow(
    new Date(secondLastOrLast(card.items[0].shopHistory))
  )
  const isNew = daysSinceLastSeen === 0
  const isBundle = card.bundle !== null

  return (
    <div className={`card ${isBundle ? 'bundle' : card.items[0].rarity.value}`}>
      <div
        className="image"
        style={
          {
            '--image': `url(${
              isBundle
                ? card.bundle!.image
                : getImage(
                    isFeaturedSection ? cardIndex : panelIndex,
                    card.items[0].images,
                    card.items[0].type
                  )
            })`,
          } as React.CSSProperties
        }
      />
      <div className="middle">
        <div className="name">
          {isBundle ? card.bundle!.name : card.items[0].name}
        </div>
      </div>
      <div className="bottom">
        <div className="price">{card.finalPrice}</div>
        <div className={['ago', isNew && 'new'].filter(Boolean).join(' ')}>
          {isNew
            ? 'New!'
            : relativeTimeFormatter.format(daysSinceLastSeen, 'days')}
        </div>
      </div>
    </div>
  )
}

export default Card
