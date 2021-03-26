import React, { Component, Fragment } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'

import Button from '@vtex/styleguide/lib/Button'
import Alert from '@vtex/styleguide/lib/Alert'

import ItemsPreview from './ItemsPreview.js'

import { currencyOptions } from '../data/const.js'

class PickupDetails extends Component {
  constructor() {
    super()
  }

  handleSetShowingItems = (options, unavailable) => {
    if (unavailable) options.unavailable = true

    this.props.modalSetPageBack('pickupDetails')
    this.props.setShowingItemsList(options)
  }

  handleSelectPickup = () => {
    this.props.selectSla(this.props.pickup)
    this.props.modalClose()
  }

  render() {
    let {
        pickup,
        formatData,
        modalPageBack,
        modalOpen,
        intl: { formatMessage, formatNumber },
    } = this.props

    let unavailable = pickup.unavailableItemsFull.length
    let remaining = pickup.remainingItemsFull.length

    return (
        <div className={`flex-auto ph5 pt4 c-on-base`}>
            {
                (unavailable > 0 && remaining > 0) && (
                    <div className="mb7">
                        <Alert type="warning">
                            {unavailable} { unavailable === 1 ? <FormattedMessage id="checkout.unavailabilityMessage"/> : <FormattedMessage id="checkout.unavailabilityMessagePlural"/> }
                        </Alert>
                    </div>
                )
            }
            <div className="flex items-center">
              <div className="flex-auto fw5 f4">{pickup.name}</div>
              <div className="flex-none">
                {pickup.price === 0 ? <span className="ttu fw5" style={{'color': '#79B03A'}}>{formatMessage({id: 'checkout.free'})}</span> : formatNumber(pickup.price, currencyOptions)}
              </div>
            </div>
            <div className="flex mt2 c-muted-1 fw5">
                <div className="flex-auto">
                  <div>{pickup.date ? pickup.date + ', ' : ''}{pickup.time}</div>
                </div>
            </div>
            
            <div className="mt2 f6 flex">
                <div className="flex-none c-muted-1">
                    {pickup.distance}{formatMessage({id: 'checkout.away'})}
                </div>
            </div>

            <div className="mt7">
                <div className="flex-auto fw5 mb4"><FormattedMessage id="checkout.itemsToPickup"/></div>
                <ItemsPreview
                    items={remaining > 0 ? pickup.remainingItemsFull : pickup.selectedItems}
                    setShowingItemsList={this.handleSetShowingItems}
                    name={pickup.name}
                    time={formatData(pickup.sla, pickup.timeType, pickup.channel)}
                />
            </div>

            {
                (unavailable > 0 && remaining > 0) && (
                    <div className="mt7">
                        <div className="flex-auto fw5 mb4"><FormattedMessage id="checkout.itemsUnavailableInPickup"/></div>
                        <ItemsPreview
                            unavailable={true}
                            items={pickup.unavailableItemsFull}
                            setShowingItemsList={(options) => this.handleSetShowingItems(options, true)}
                            name={pickup.name}
                            time={formatData(pickup.sla, pickup.timeType, pickup.channel)}
                        />
                    </div>
                )
            }

            <div className="mt7">
                <div className="flex-auto fw5 mb5"><FormattedMessage id="checkout.address"/></div>
                <div>{pickup.address}</div>
            </div>

            <div className="mt7">
                <div className="flex-auto fw5 mb5"><FormattedMessage id="checkout.businessHours"/></div>
                <div className="">
                    <div className="flex bb b--muted-4 pb3 mb3">
                        <div className="flex-auto">Segunda a Sexta-feira</div>
                        <div className="none">9h a 21h</div>
                    </div>
                    <div className="flex bb b--muted-4 pb3 mb3">
                        <div className="flex-auto">Sábado</div>
                        <div className="none">9h a 21h</div>
                    </div>
                    <div className="flex bb b--muted-4 pb3 mb3">
                        <div className="flex-auto">Domingo</div>
                        <div className="none">9h a 15h</div>
                    </div>
                </div>
            </div>

            {
                remaining > 0 &&
                <div>
                    <div className="mt7">
                        <Button block onClick={this.handleSelectPickup}><FormattedMessage id={`checkout.selectPickupPoint${pickup.remainingItems.length === 1 ? '' : 'Plural'}`}/></Button>
                    </div>
                    {
                        modalPageBack.length === 0 &&
                        <div className="mt5">
                            <Button variation="secondary" block onClick={() => modalOpen('pickupList')}><FormattedMessage id={`checkout.viewOtherStores`}/></Button>
                        </div>
                    }
                </div>
            }
        </div>
    )
  }
}

export default injectIntl(PickupDetails)
