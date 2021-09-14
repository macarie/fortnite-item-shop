import { createApp } from 'vue'
import bent from 'bent'

import Shop from './components/shop.vue'

import type ShopType from './types/shop'

const getJSON = bent('json')

const init = async () => {
  const shop: ShopType = await getJSON('https://fortnite-api.com/v2/shop/br')

  createApp(Shop, { shop: shop.data }).mount('.shop')
}

void init()
