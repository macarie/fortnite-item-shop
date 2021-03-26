import type ShopEntryType from '../types/shop-entry'

export const getFeaturedOrIcon = (length: number) => (
  index: number,
  images: ShopEntryType<string>['items'][0]['images'],
  type: ShopEntryType<string>['items'][0]['type']
) => {
  switch (length) {
    case 1:
      return images.featured ?? images.icon

    case 2:
      if (type.value === 'outfit' || index === 0) {
        return images.featured ?? images.icon
      }

      return images.icon

    case 3:
    case 5:
      if (type.value === 'outfit' || index === 0) {
        return images.featured ?? images.icon
      }

      return images.icon

    case 6:
      if (index < 2) {
        return images.featured ?? images.icon
      }

      return images.icon

    default:
      return images.featured ?? images.icon
  }
}

export default getFeaturedOrIcon
