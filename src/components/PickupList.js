import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import { FormattedMessage, injectIntl } from 'react-intl'

import SlaOption from './SlaOption.js'

class PickupList extends Component {
  constructor() {
      super()
  }

  handleShowPickup = (item) => {
    this.props.showPickup(item)
    this.props.modalSetPageBack('pickupList')
  } 

  render() {
    let {
      slas,
      formatData,
      products,
      remainingItems,
      modalSetPageBack,
      intl: { formatMessage, }
    } = this.props

    let remainingPickupSlas = _.filter(slas, (sla) => {
      return sla.channel === 'pickup-in-point' && sla.remainingItems && sla.remainingItems.length > 0
    })

    return (
      <div className="">
        {
          remainingPickupSlas.length > 0 && (
            <div className="mt5">
              {
                remainingPickupSlas.map((item, i) => {
                  return (
                    <div key={i} onClick={() => this.handleShowPickup(item)}>
                      <SlaOption
                        name={item.name}
                        time={formatData(item.sla, item.timeType, item.channel)}
                        channel={item.channel}
                        distance={item.distance}
                        price={item.lowPrice ? item.lowPrice : item.price}
                        products={products}
                        remainingItems={remainingItems}
                        slaRemainingItems={item.remainingItems}
                        availableItems={item.availableItems}
                        unavailableItems={item.unavailableItemsFull.length}
                      />
                    </div>
                  )
                })
              }
            </div>
          )
        }
      </div>
    )
  }
}

export default injectIntl(PickupList)
