import sortEntries from './sort-entries'
import cleanPanel from './clean-panel'

import type ShopEntryType from '../types/shop-entry'

export const createSection = (
  section: string,
  entries: Array<ShopEntryType<typeof section>>
) => {
  const sortedEntries = sortEntries(entries)

  return sortedEntries.reduce(
    (
      shop: Array<Array<Array<ShopEntryType<typeof section>>>>,
      entry: ShopEntryType<typeof section>
    ) => {
      const sectionLength = Number(entry.sectionId.replace(section, '')) || 1
      const sectionIndex = sectionLength - 1

      if (sectionLength > shop.length) shop.length = sectionLength

      const panelLength = cleanPanel(entry.categories[0])
      const panelIndex = panelLength - 1

      if (Array.isArray(shop[sectionIndex])) {
        if (Array.isArray(shop[sectionIndex][panelIndex])) {
          shop[sectionIndex][panelIndex].push(entry)
        } else {
          shop[sectionIndex][panelIndex] = [entry]
        }
      } else {
        console.log({ panelLength, panel: entry.categories[0] })
        shop[sectionIndex] = new Array(panelLength)

        shop[sectionIndex][panelIndex] = [entry]
      }

      return shop
    },
    []
  )
}

export default createSection
