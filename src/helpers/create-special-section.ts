import fixSpecialFeaturedName from './fix-specal-featured-name'
import createFeaturedSection from './create-featured-section'

import type ShopEntryType from '../types/shop-entry'

export const createSpecialSection = (
  specialItems: Array<ShopEntryType<string>>
): Array<{
  sectionName: string
  sectionEntries: Array<Array<Array<ShopEntryType<string>>>>
}> => {
  const featuredSections = createFeaturedSection(specialItems)

  const groupedSections = new Map<
    string,
    Array<Array<Array<ShopEntryType<string>>>>
  >()

  for (const featuredSection of featuredSections) {
    const sectionName = fixSpecialFeaturedName(featuredSection[0][0].sectionId)

    if (groupedSections.has(sectionName)) {
      groupedSections.get(sectionName)!.push(featuredSection)
    } else {
      groupedSections.set(sectionName, [featuredSection])
    }
  }

  return [...groupedSections.entries()].map(([name, sections]) => ({
    sectionName: name,
    sectionEntries: sections,
  }))
}

export default createSpecialSection
