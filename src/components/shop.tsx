import React from 'react'

import useRelativeTimeFormatter from '../hooks/use-relative-time-formatter'
import createSection from '../helpers/create-section'
import createSpecialSection from '../helpers/create-special-section'
import daysSinceNow from '../helpers/days-since-now'
import secondLastOrLast from '../helpers/second-last-or-last'
import getFeaturedOrIcon from '../helpers/get-featured-or-icon'

import type ShopType from '../types/shop'

type ShopProps = {
  data: ShopType
}

const Shop = ({ data }: ShopProps) => {
  const relativeTimeFormatter = useRelativeTimeFormatter()

  const featured = createSection('Featured', data.data.featured.entries)
  console.log(featured)
  const daily = createSection('Daily', data.data.daily.entries)
  console.log(daily)
  const specialSections = createSpecialSection(
    data.data.specialFeatured?.entries ?? []
  )
  console.log(specialSections)

  return (
    <>
      {[
        { sectionName: 'Featured', sectionEntries: featured },
        { sectionName: 'Daily', sectionEntries: daily },
        ...specialSections,
      ].map(({ sectionName, sectionEntries }) => {
        const isFeatured = sectionName === 'Featured'

        return sectionEntries.map((panels, sectionIndex) => (
          <section
            key={`${sectionName}-section[${sectionIndex}]`}
            className={`section ${sectionName
              .toLocaleLowerCase()
              .replace(/\s/g, '')}`}
          >
            {panels.map((panel, panelIndex) => (
              <div
                key={`${sectionName}-panel[${panelIndex}]`}
                className="panel"
                data-children={panel.length.toString()}
              >
                {panel.map((entry, entryIndex) => {
                  const getImage = getFeaturedOrIcon(
                    isFeatured ? panel.length : panels.length
                  )
                  const daysSinceLastSeen = daysSinceNow(
                    new Date(secondLastOrLast(entry.items[0].shopHistory))
                  )
                  const isNew = daysSinceLastSeen === 0
                  const isBundle = entry.bundle !== null

                  return (
                    <div
                      key={entry.items[0].name}
                      className={`card ${
                        isBundle ? 'bundle' : entry.items[0].rarity.value
                      }`}
                    >
                      <div
                        className="image"
                        style={
                          {
                            '--image': `url(${
                              isBundle
                                ? entry.bundle!.image
                                : getImage(
                                    isFeatured ? entryIndex : panelIndex,
                                    entry.items[0].images,
                                    entry.items[0].type
                                  )
                            })`,
                          } as React.CSSProperties
                        }
                      />
                      <div className="middle">
                        <div className="name">
                          {isBundle ? entry.bundle!.name : entry.items[0].name}
                        </div>
                      </div>
                      <div className="bottom">
                        <div className="price">{entry.finalPrice}</div>
                        <div
                          className={['ago', isNew && 'new']
                            .filter(Boolean)
                            .join(' ')}
                        >
                          {isNew
                            ? 'New!'
                            : relativeTimeFormatter.format(
                                daysSinceLastSeen,
                                'days'
                              )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </section>
        ))
      })}
    </>
  )
}

export default Shop
