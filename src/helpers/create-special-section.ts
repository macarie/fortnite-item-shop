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
    const sectionName =
      featuredSection[0][0].section?.name ??
      fixSpecialFeaturedName(featuredSection[0][0].sectionId)

    if (groupedSections.has(sectionName)) {
      groupedSections.get(sectionName)!.push(featuredSection)
    } else {
      groupedSections.set(sectionName, [featuredSection])
    }
  }

  return [...groupedSections.entries()]
    .map(([name, sections]) => ({
      sectionName: name,
      sectionEntries: sections.sort(
        (a, b) => a[0][0].section.index - b[0][0].section.index
      ),
    }))
    .sort(
      (a, b) =>
        a.sectionEntries[0][0][0].section.index -
        b.sectionEntries[0][0][0].section.index
    )
}

export default createSpecialSection
