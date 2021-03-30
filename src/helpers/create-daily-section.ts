import sortEntries from './sort-entries'

import type ShopEntryType from '../types/shop-entry'

export const createDailySection = (
  dailyEntries: Array<ShopEntryType<'Daily'>>
) => {
  const sortedEntries = sortEntries(dailyEntries)

  return [
    [sortedEntries.slice(0, 2), sortedEntries.slice(2, sortedEntries.length)],
  ]
}

export default createDailySection
