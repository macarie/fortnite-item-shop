import getPanelNumber from './get-panel-number'

import type ShopEntryType from '../types/shop-entry'

export const sortEntries = (entries: Array<ShopEntryType<string>>) =>
  [...entries].sort((a, b) => {
    const aSortPriority = a.sortPriority
    const bSortPriority = b.sortPriority

    if (aSortPriority === bSortPriority) {
      return getPanelNumber(a.categories[0]) - getPanelNumber(b.categories[0])
    }

    return aSortPriority > bSortPriority ? -1 : 1
  })

export default sortEntries
