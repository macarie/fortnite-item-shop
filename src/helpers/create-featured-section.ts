import sortEntries from './sort-entries'

import type ShopEntryType from '../types/shop-entry'

export const createFeaturedSection = (
  featuredItems: Array<ShopEntryType<string>>
) => {
  const sortedItems = sortEntries(featuredItems)
  const categorizedItems = new Map<string, Array<ShopEntryType<string>>>()

  for (const item of sortedItems) {
    const setCode = `${
      item.bundle === null
        ? item.items[0].set?.backendValue ?? item.items[0].added
        : item.bundle.name
    }[${item.items[0].type.value === 'outfit' ? 'outfit' : 'object'}]@${
      item.sectionId
    }`

    if (categorizedItems.has(setCode)) {
      categorizedItems.get(setCode)!.push(item)
    } else {
      categorizedItems.set(setCode, [item])
    }
  }

  const groupsSplitBySection = new Map<
    string,
    Array<Array<ShopEntryType<string>>>
  >()

  for (const group of categorizedItems.values()) {
    const sectionName = group[0].sectionId

    if (groupsSplitBySection.has(sectionName)) {
      groupsSplitBySection.get(sectionName)!.push(group)
    } else {
      groupsSplitBySection.set(sectionName, [group])
    }
  }

  return [...groupsSplitBySection.values()]
}

export default createFeaturedSection
