import React, { Fragment } from 'react'

import createFeaturedSection from '../helpers/create-featured-section'
import createSection from '../helpers/create-section'
import createSpecialSection from '../helpers/create-special-section'

import SectionTitle from './section-title'
import Section from './section'

import type ShopType from '../types/shop'

type ShopProps = {
  shop: ShopType['data']
}

const Shop = ({ shop }: ShopProps) => {
  const featured = createFeaturedSection(shop.featured.entries)
  console.log(featured)
  const daily = createSection('Daily', shop.daily.entries)
  console.log(daily)
  const specialSections = createSpecialSection(
    shop.specialFeatured?.entries ?? []
  )
  console.log(specialSections)

  return (
    <>
      {[
        { sectionName: 'Featured', sectionEntries: featured },
        { sectionName: 'Daily', sectionEntries: daily },
        ...specialSections,
      ].map(({ sectionName, sectionEntries }) => {
        const isFeaturedSection = sectionName === 'Featured'

        return (
          <Fragment key={`${sectionName}-supergroup`}>
            <SectionTitle sectionName={sectionName} />

            {sectionEntries.map((panels, sectionIndex) => (
              <Section
                key={`${sectionName}-section[${sectionIndex}]`}
                isFeaturedSection={isFeaturedSection}
                panels={panels}
                sectionIndex={sectionIndex}
                sectionName={sectionName}
              />
            ))}
          </Fragment>
        )
      })}
    </>
  )
}

export default Shop
