import React, { Fragment } from 'react'

import Panel from './panel'

import type ShopEntryType from '../types/shop-entry'

type SectionProps = {
  isFeaturedSection: boolean
  panels: Array<Array<ShopEntryType<string>>>
  sectionIndex: number
  sectionName: string
}

export const Section = ({
  isFeaturedSection,
  panels,
  sectionIndex,
  sectionName,
}: SectionProps) => {
  return (
    <section
      className={`section ${sectionName
        .toLocaleLowerCase()
        .replace(/\s/g, '')}`}
    >
      {panels.map((panel, panelIndex) => (
        <Panel
          key={`${sectionName}-panel[${panelIndex}]`}
          panel={panel}
          isFeaturedSection={isFeaturedSection}
          panelIndex={panelIndex}
          panelsLength={panels.length}
        />
      ))}
    </section>
  )
}

export default Section
