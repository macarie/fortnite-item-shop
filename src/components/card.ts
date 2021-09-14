import type ShopEntryType from '../types/shop-entry'

const getOfferImage = (card: ShopEntryType<string>) => {
  if (card.newDisplayAsset?.materialInstances[0].images.Flipbook) {
    return null
  }

  return card.newDisplayAsset?.materialInstances[0].images.OfferImage
}

export const getImage = (
  card: ShopEntryType<string>,
  cardSize: 'small' | 'normal' | 'double'
) => {
  switch (cardSize) {
    case 'small':
      return card.items[0].images.icon

    case 'double':
      return (
        card.bundle?.image ??
        card.items[0].images.featured ??
        getOfferImage(card) ??
        card.items[0].images.icon
      )

    case 'normal':
    default:
      return (
        card.items[0].images.featured ??
        getOfferImage(card) ??
        card.items[0].images.icon
      )
  }
}

export const getColors = (card: ShopEntryType<string>) => {
  if (!card.newDisplayAsset) {
    return [null, null, null]
  }

  return [
    `#${card.newDisplayAsset.materialInstances[0].colors.Background_Color_A}`,
    `#${card.newDisplayAsset.materialInstances[0].colors.Background_Color_B}`,
    `#${card.newDisplayAsset.materialInstances[0].colors.FallOff_Color}`,
  ]
}
