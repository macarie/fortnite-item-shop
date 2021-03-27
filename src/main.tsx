import React from 'react'
import ReactDOM from 'react-dom'
import bent from 'bent'

import './index.scss'

import Shop from './components/shop'

import type ShopType from './types/shop'

const getJSON = bent('json')

const init = async () => {
  const shop: ShopType = await getJSON('https://fortnite-api.com/v2/shop/br')
  console.log(shop.data)

  ReactDOM.render(
    <React.StrictMode>
      <Shop shop={shop.data} />
    </React.StrictMode>,
    document.querySelector('.shop')
  )
}

void init()
