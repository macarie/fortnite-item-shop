import cleanPanel from './clean-panel'

import type ShopEntryType from '../types/shop-entry'

export const sortEntries = (entries: Array<ShopEntryType<string>>) =>
  [...entries].sort((a, b) => {
    const aMb = b.sortPriority - a.sortPriority

    if (aMb === 0) {
      return cleanPanel(a.categories[0]) - cleanPanel(b.categories[0])
    }

    return aMb
  })

export default sortEntries
