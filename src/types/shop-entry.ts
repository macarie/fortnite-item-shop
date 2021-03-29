export type ShopEntryType<Section> = {
  banner: {
    value: string
  } | null
  bundle: {
    name: string
    info: string
    image: string
  } | null
  categories: string[]
  finalPrice: number
  items: Array<{
    images: {
      featured: string | null
      icon: string
      other: string | null
      smallIcon: string
    }
    introduction: {
      chapter: string
      season: string
      text: string
    }
    name: string
    rarity: {
      displayValue:
        | 'Icon'
        | 'Legendary'
        | 'Epic'
        | 'Rare'
        | 'Uncommon'
        | 'Slurp'
        | 'Gaming Legends Series'
        | 'Dark'
      value:
        | 'icon'
        | 'legendary'
        | 'epic'
        | 'rare'
        | 'uncommon'
        | 'slurp'
        | 'gaminglegends'
        | 'dark'
    }
    set: {
      backendValue: string
      text: string
      value: string
    } | null
    shopHistory: string[]
    type: {
      displayValue: string
      value: string
    }
  }>
  regularPrice: number
  sectionId: Section
  sortPriority: number
}

export default ShopEntryType
