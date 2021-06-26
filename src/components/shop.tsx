import React, { Fragment } from 'react'

import createFeaturedSection from '../helpers/create-featured-section'
import createDailySection from '../helpers/create-daily-section'
import createSpecialSection from '../helpers/create-special-section'

import SectionTitle from './section-title'
import Section from './section'

import type ShopType from '../types/shop'

type ShopProps = {
  shop: ShopType['data']
}

const Shop = ({ shop }: ShopProps) => {
  const featured = createFeaturedSection(shop.featured.entries)
  const daily = createDailySection(shop.daily.entries)
  const specialSections = createSpecialSection([
    ...(shop.specialFeatured?.entries ?? []),
    ...(shop.specialDaily?.entries ?? []),
  ])

  const shopTabs = [
    { sectionName: 'Featured', sectionEntries: featured },
    { sectionName: 'Daily', sectionEntries: daily },
    ...specialSections,
  ]

  console.log('shopTabs', shopTabs)

  return (
    <>
      {shopTabs.map(({ sectionName, sectionEntries }) => (
        <Fragment key={`${sectionName}-supergroup`}>
          <SectionTitle sectionName={sectionName} />

          {sectionEntries.map((panels, sectionIndex) => (
            <Section
              key={`${sectionName}-section[${sectionIndex}]`}
              panels={panels}
              sectionName={sectionName}
            />
          ))}
        </Fragment>
      ))}
    </>
  )
}

export default Shop
