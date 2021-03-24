import type ShopEntryType from './shop-entry'

export type ShopType = {
  status: number
  data: {
    date: string
    hash: string
    daily: {
      name: 'DAILY'
      entries: Array<ShopEntryType<'Daily'>>
    }
    featured: {
      name: 'FEATURED'
      entries: Array<ShopEntryType<'Featured'>>
    }
    specialFeatured: {
      name: string | null
      entries: Array<ShopEntryType<string>>
    }
  }
}

export default ShopType
