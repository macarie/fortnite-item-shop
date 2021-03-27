import React from 'react'

type SectionTitleProps = {
  sectionName: string
}

export const SectionTitle = ({ sectionName }: SectionTitleProps) => (
  <span className="title">{sectionName}</span>
)

export default SectionTitle
