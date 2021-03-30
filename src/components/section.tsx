import React from 'react'

import Panel from './panel'

import type ShopEntryType from '../types/shop-entry'

type SectionProps = {
  panels: Array<Array<ShopEntryType<string>>>
  sectionName: string
}

export const Section = ({ panels, sectionName }: SectionProps) => {
  return (
    <section
      className={`section ${sectionName
        .toLocaleLowerCase()
        .replace(/\s/g, '')}`}
    >
      {panels.map((panel, panelIndex) => (
        <Panel key={`${sectionName}-panel[${panelIndex}]`} panel={panel} />
      ))}
    </section>
  )
}

export default Section
