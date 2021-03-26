import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import Button from '@vtex/styleguide/lib/Button'
import Dropdown from '@vtex/styleguide/lib/Dropdown'

import { currencyOptions } from '../data/const.js'
class MiniListItem extends React.Component {
  constructor() {
    super()
  }

  render() {
    let {
      image,
      name,
      price,
      quantity,
      intl: { formatNumber },
    } = this.props

    return (
      <div className="flex pt5 pb3 c-on-base">
        <div className="flex-none mr6">
          <img src={image} width="56" height="56"/>
        </div>

        <div className="flex-auto">
          <div className="lh-copy pb3 truncate">{name}</div>
          <div>
            <div className="flex justify-between c-muted-1">
              <div className="flex-none">
                {quantity} un.
              </div>
              <div className="flex-none">
                {formatNumber(price.list * quantity, currencyOptions)}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(MiniListItem)
