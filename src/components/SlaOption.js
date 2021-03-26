import React, { Component } from 'react'
import _ from 'lodash'
import { FormattedMessage, injectIntl } from 'react-intl'

import ItemsPreview from './ItemsPreview.js'

import { currencyOptions } from '../data/const.js'

class SlaOption extends Component {
  constructor() {
    super()
  }

  render() {
    let {
        isSelected,
        name,
        id,
        distance,
        date,
        time,
        price,
        channel,
        products,
        selectedItems,
        unavailableItems,
        removeSelectedSla,
        setShowingItemsList,
        showPickup,
        pickup,
        intl: { formatMessage, formatNumber },
    } = this.props

    return (
        <div className={`flex-auto ph5 pt4 c-on-base ${isSelected && 'bg-muted-5 pb5'}`}>
            <div className="flex items-center">
              <div className="flex-auto fw5">{channel === 'pickup-in-point' ? name : formatMessage({id: `checkout.${name}`})}</div>
              <div className="flex-none">
                {price === 0 ? <span className="ttu fw5" style={{'color': '#79B03A'}}>{formatMessage({id: 'checkout.free'})}</span> : formatNumber(price, currencyOptions)}
              </div>

              <div className="flex-none ml3 mt0">
                {
                  isSelected
                  ? (
                    <div className="flex items-center justify-end" onClick={() => removeSelectedSla(id)} style={{height: '26px', width: '26px'}}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.2251 15.5H15.2251" stroke="#134CD8" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.7251 0.5L13.7251 3.5L5.2251 12L1.2251 13L2.2251 9L10.7251 0.5Z" stroke="#134CD8" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8.7251 2.5L11.7251 5.5" stroke="#134CD8" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  ) : (
                    <div className="flex items-center justify-end" style={{height: '26px', width: '26px'}}>
                      <svg width="16" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.32251 5.28071L2.29701 0.280712C2.06973 0.0985538 1.76532 -0.00224062 1.44934 3.78026e-05C1.13337 0.00231622 0.831116 0.107485 0.60768 0.292893C0.384245 0.478301 0.257506 0.729114 0.25476 0.991311C0.252014 1.25351 0.373482 1.50611 0.593 1.69471L5.7665 5.98771L0.593 10.2807C0.477901 10.373 0.386094 10.4833 0.322936 10.6053C0.259778 10.7273 0.226534 10.8585 0.225143 10.9913C0.223753 11.1241 0.254244 11.2558 0.314837 11.3787C0.375431 11.5016 0.464913 11.6132 0.578063 11.7071C0.691213 11.801 0.825765 11.8753 0.973868 11.9255C1.12197 11.9758 1.28066 12.0011 1.44067 12C1.60068 11.9988 1.75881 11.9712 1.90584 11.9188C2.05287 11.8664 2.18585 11.7902 2.29701 11.6947L8.32251 6.69471C8.54843 6.50718 8.67535 6.25288 8.67535 5.98771C8.67535 5.72255 8.54843 5.46824 8.32251 5.28071Z" fill="#134CD8"/>
                      </svg>
                    </div>
                  )
                }
              </div>
            </div>
            <div className="flex mt1 c-muted-1 fw5">
                <div className="flex-auto">
                  <div>{date ? date + ', ' : ''}{time}</div>
                </div>
            </div>
            
            {
              (distance || selectedItems || unavailableItems) &&
              <div className="mt2 f6 flex">
                {
                  distance &&
                  <div className="flex-none c-muted-1">
                    {distance}{formatMessage({id: 'checkout.away'})}
                  </div>
                }
                {
                  distance && unavailableItems > 0 && !isSelected &&
                  <div className="flex-none ph3 c-muted-1">∙</div>
                }
                {
                  unavailableItems > 0 && !isSelected &&
                  <div className="flex-auto" style={{color: '#9B6C02'}}>
                    {unavailableItems} {
                      unavailableItems === 1 ? (
                        <FormattedMessage id="checkout.unavailableItem"/>
                      ) : (
                        <FormattedMessage id="checkout.unavailableItems"/>
                      )
                    }
                  </div>
                }
              </div>
            }

            {
              isSelected && channel == 'pickup-in-point' && (
                <div className="c-action-primary pv2 mb2" onClick={() => showPickup(pickup)}>
                  <FormattedMessage id="checkout.viewDetails"/>
                </div>
              )
            }

            {
              selectedItems && selectedItems.length < products.length &&
              <div>
                <ItemsPreview
                  items={selectedItems}
                  setShowingItemsList={setShowingItemsList}
                  name={name}
                  time={time}
                />
              </div>
            }

            {!isSelected && <div className="mt5 bb b--muted-4"></div>}
        </div>
    )
  }
}

export default injectIntl(SlaOption)
