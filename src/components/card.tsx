import React, { useEffect, useState } from 'react'
import Vibrant from 'node-vibrant/dist/vibrant'

import useRelativeTimeFormatter from '../hooks/use-relative-time-formatter'
import daysSinceNow from '../helpers/days-since-now'
import secondLastOrLast from '../helpers/second-last-or-last'
import createClassName from '../helpers/create-class-name'

import type ShopEntryType from '../types/shop-entry'

export type CardProps = {
  card: ShopEntryType<string>
  size: 'small' | 'normal' | 'double'
}

const getImage = (card: CardProps['card'], cardSize: CardProps['size']) => {
  switch (cardSize) {
    case 'small':
      return card.items[0].images.icon

    case 'double':
      return (
        card.bundle?.image ??
        card.items[0].images.featured ??
        card.items[0].images.icon
      )

    case 'normal':
    default:
      return card.items[0].images.featured ?? card.items[0].images.icon
  }
}

export const Card = ({ card, size = 'normal' }: CardProps) => {
  const [colors, setColors] = useState<[string, string] | null>(null)
  const relativeTimeFormatter = useRelativeTimeFormatter()

  const daysSinceLastSeen = daysSinceNow(
    new Date(secondLastOrLast(card.items[0].shopHistory))
  )
  const isNew = daysSinceLastSeen === 0
  const isBundle = card.bundle !== null

  const image = getImage(card, size)

  useEffect(() => {
    const getPalette = async () => {
      const { DarkVibrant, LightVibrant } = await Vibrant.from(
        image
      ).getPalette()

      if (DarkVibrant && LightVibrant) {
        setColors([DarkVibrant.hex, LightVibrant.hex])
      }
    }

    void getPalette()
  }, [image])

  const cardStyle = {
    '--image': `url("${image}")`,
    ...(colors
      ? {
          '--darker-color': colors[0],
          '--lighter-color': colors[1],
        }
      : {}),
  }

  return (
    <div
      className={createClassName([
        'card',
        size,
        isBundle ? 'bundle' : card.items[0].rarity.value,
      ])}
      style={cardStyle as React.CSSProperties}
    >
      <div className="image" />
      <div className="rarity">
        {isBundle ? 'Bundle' : card.items[0].rarity.displayValue}
      </div>
      <div className="middle">
        <div className="name">
          {isBundle ? card.bundle!.name : card.items[0].name}
        </div>
      </div>
      <div className="bottom">
        <div className="price">{card.finalPrice}</div>
        <div className={createClassName(['ago', isNew && 'new'])}>
          {isNew
            ? 'New!'
            : relativeTimeFormatter.format(daysSinceLastSeen, 'days')}
        </div>
      </div>
    </div>
  )
}

export default Card
