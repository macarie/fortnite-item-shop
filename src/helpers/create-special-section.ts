import fixSpecialFeaturedName from './fix-specal-featured-name'
import createFeaturedSection from './create-featured-section'

import type ShopEntryType from '../types/shop-entry'

const originaleSectionName = Symbol('originalSectionName')

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
      const originalName: string = Reflect.get(
        groupedSections.get(sectionName)!,
        originaleSectionName
      )

      if (originalName.localeCompare(featuredSection[0][0].sectionId) < 0) {
        groupedSections.get(sectionName)!.push(featuredSection)
      } else {
        groupedSections.get(sectionName)!.unshift(featuredSection)
      }
    } else {
      const section = [featuredSection]

      Reflect.set(
        section,
        originaleSectionName,
        featuredSection[0][0].sectionId
      )

      groupedSections.set(sectionName, section)
    }
  }

  return [...groupedSections.entries()].map(([name, sections]) => ({
    sectionName: name,
    sectionEntries: sections,
  }))
}

export default createSpecialSection
