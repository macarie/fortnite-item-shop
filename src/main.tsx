import React from 'react'
import ReactDOM from 'react-dom'
import bent from 'bent'

import './index.scss'

import Shop from './components/shop'

const getJSON = bent('json')

const init = async () => {
  const shop = await getJSON('https://fortnite-api.com/v2/shop/br')

  ReactDOM.render(
    <React.StrictMode>
      <Shop data={shop} />
    </React.StrictMode>,
    document.querySelector('.shop')
  )
}

void init()
