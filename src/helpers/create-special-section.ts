import fixSpecialFeaturedName from './fix-specal-featured-name'
import cleanPanel from './clean-panel'
import sortEntries from './sort-entries'
import cleanSpecial from './clean-special'

import type ShopEntryType from '../types/shop-entry'

export const createSpecialSection = (
  entries: Array<ShopEntryType<string>>
): Array<{
  sectionName: string
  sectionEntries: Array<Array<Array<ShopEntryType<string>>>>
}> => {
  const tabs = [
    ...[
      ...entries
        .reduce((shop, entry) => {
          const tab = entry.sectionId
          const tabArray = shop.get(tab) ?? []

          tabArray.push(entry)

          if (!shop.has(tab)) {
            shop.set(tab, tabArray)
          }

          return shop
        }, new Map<string, Array<ShopEntryType<string>>>())
        .entries(),
    ]
      .sort(([a], [b]) => {
        if (a.startsWith('Special') && b.startsWith('Special')) {
          return cleanPanel(a) - cleanPanel(b)
        }

        return 0
      })
      .reduce((map, [name, entry]) => {
        const cleanName = cleanSpecial(name)

        if (map.has(cleanName)) {
          map.get(cleanName)!.push(entry)
        } else {
          map.set(cleanName, [entry])
        }

        return map
      }, new Map<string, Array<Array<ShopEntryType<string>>>>())
      .entries(),
  ].map(([name, entries]) => ({
    sectionName: fixSpecialFeaturedName(name),
    sectionEntries: entries.map((entry) => [sortEntries(entry)]),
  }))

  return tabs
}

export default createSpecialSection
