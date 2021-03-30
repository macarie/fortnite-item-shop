import fixSpecialFeaturedName from './fix-specal-featured-name'
import sortEntries from './sort-entries'
import createFeaturedSection from './create-featured-section'

import type ShopEntryType from '../types/shop-entry'

export const createSpecialSection = (
  specialItems: Array<ShopEntryType<string>>
): Array<{
  sectionName: string
  sectionEntries: Array<Array<Array<ShopEntryType<string>>>>
}> =>
  createFeaturedSection(specialItems).map((entries) => ({
    sectionName: fixSpecialFeaturedName(entries[0][0].sectionId),
    sectionEntries: [entries.map((entry) => sortEntries(entry))],
  }))

export default createSpecialSection
