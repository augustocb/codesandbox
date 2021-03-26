import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import Button from '@vtex/styleguide/lib/Button'
import Dropdown from '@vtex/styleguide/lib/Dropdown'

import { currencyOptions } from '../data/const.js'
class ListItem extends React.Component {
  constructor() {
    super()
  }

  render() {
    let {
      image,
      name,
      price,
      quantity,
      variations,
      index,
      updateQuantity,
      intl: { formatNumber },
    } = this.props

    return (
      <div className="flex bb b--muted-4 pv5 c-on-base">
        <div className="flex-none mr6">
          <img src={image} width="100" height="100"/>
        </div>

        <div className="flex-auto">
          <div className="lh-copy pb3">{name}</div>

          {variations && variations.length > 0 &&
            <div className="dn">
              {variations.map((variation, i) => {
                return (
                  <div className="db pb3" key={i}>
                    <span className="t-mini"><FormattedMessage id={`checkout.${variation.name}`}/>: </span>
                    <a href="#" className="t-action--small hover-c-link active-c-link visited-c-link no-underline">{variation.value}</a>
                  </div>
                )
              })}
            </div>
          }

          <div className="mb3 mt3" style={{ 'width': '70px' }}>
            <Dropdown
              options={[
                { value: 1, label: '1' },
                { value: 2, label: '2' },
                { value: 3, label: '3' },
                { value: 4, label: '4' },
                { value: 5, label: '5' },
                { value: 6, label: '6' },
                { value: 7, label: '7' },
                { value: 8, label: '8' },
                { value: 9, label: '9' },
                { value: 10, label: '10' },
                { value: '11+', label: '11+' },
              ]}
              size="small"
              value={quantity}
              onChange={(e) => { updateQuantity(index, e.target.value)}}
            />
          </div>
          <div>
            <div>
              {
                price.old &&
                <div className="c-muted-1 strike t-mini mb2">
                  {formatNumber(price.old, currencyOptions)} <FormattedMessage id="checkout.perUn"/>
                </div>
              }
              {
                quantity > 1 &&
                <div className="c-muted-1 t-mini">
                  {formatNumber(price.list, currencyOptions)} <FormattedMessage id="checkout.perUn"/>
                </div>
              }
              <div className="fw5 mr3 mt5">
                {formatNumber(price.list * quantity, currencyOptions)}
              </div>
            </div>
          </div>
          <div className="mt4 dn">
            <Button collapseLeft variation="tertiary" size="small">
              <svg className="mr3" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 0C2.9 0 2 0.9 2 2V16L8 13L14 16V2C14 0.9 13.1 0 12 0H4ZM11 7H9V9H7V7H5V5H7V3H9V5H11V7Z" fill="#134CD8"/>
              </svg>
              <FormattedMessage id="checkout.saveForLater"/>
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(ListItem)
