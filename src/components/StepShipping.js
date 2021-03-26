import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import { FormattedMessage, injectIntl } from 'react-intl'

import PageTitle from './PageTitle.js'
import SlaOption from './SlaOption.js'
import ItemsPreview from './ItemsPreview.js'
import Location from './Location.js'

import Button from '@vtex/styleguide/lib/Button'

class StepShipping extends Component {
    constructor() {
        super()
    }

  render() {
    let {
      location,
      slas,
      selectedSla,
      selectSla,
      formatData,
      products,
      remainingItems,
      hasAddressStep,
      removeSelectedSla,
      setShowingItemsList,
      showPickup,
      modalOpen,
      setLocation,
      goToNextStep,
      intl: { formatMessage, }
    } = this.props

    let remainingShippingSlas = _.filter(slas, (sla) => {
      return sla.channel === 'delivery' && sla.remainingItems && sla.remainingItems.length > 0
    })

    let remainingPickupSlas = _.filter(slas, (sla) => {
      return sla.channel === 'pickup-in-point' && sla.remainingItems && sla.remainingItems.length > 0
    })

    if (!location) {
      return (
        <Location
          location={location}
          setLocation={setLocation}
        />
      )
    }

    return (
      <Fragment>
        <div className="ph5">
              <div className="flex mt5">
                  <div className="flex-none mt1 tc dn" style={{width: '74px'}}>
                      <svg className="pt1 db center" viewBox="0 0 24 24" width="24" height="24">
                          <g fill="#134cd8">
                              <path d="M12,14.817A6.848,6.848,0,0,1,19,8a7.293,7.293,0,0,1,2.438.43l-8.8-7.2a1,1,0,0,0-1.266,0l-11,9a1,1,0,0,0,1.266,1.548L3,10.656V22a1,1,0,0,0,1,1H16.753C15.191,21.478,12,17.981,12,14.817Z"></path>
                              <path d="M19,10a4.868,4.868,0,0,0-5,4.817c0,2.716,3.869,6.486,4.31,6.907l.69.659.69-.659C20.131,21.3,24,17.533,24,14.817A4.868,4.868,0,0,0,19,10Zm0,7a2,2,0,1,1,2-2A2,2,0,0,1,19,17Z"></path>
                          </g>
                      </svg>
                  </div>
                  <div className="flex-auto items-center">
                      <div className="lh-title">
                          <span className="fw5">Opções para</span>{' '}
                          {formatMessage({id: 'checkout.yourAddress'})}{' '}<span className="mr3">{location}</span>
                          <Button variation="tertiary" size="small" collapseLeft onClick={() => setLocation('')}><FormattedMessage id="checkout.changeAddress"/></Button>
                      </div>
                  </div>
              </div>
          </div>


        {/* Selected items */}
        {
          selectedSla.length > 0 && (
            <div>
              <div className="mh5 mb5 mt6 f4"><FormattedMessage id="checkout.youHaveSelected"/></div>

              {selectedSla.map((item, i) => {
                  return (
                    <div key={i} className="mb3">
                      {
                        <SlaOption
                          isSelected={true}
                          name={item.name}
                          id={item.id}
                          time={formatData(item.sla, item.timeType, item.channel)}
                          channel={item.channel}
                          price={item.lowPrice ? item.lowPrice : item.price}
                          products={products}
                          hasManySlasSelected={selectedSla.length > 1}
                          availableItems={item.availableItems}
                          selectedItems={item.selectedItems}
                          removeSelectedSla={removeSelectedSla}
                          setShowingItemsList={setShowingItemsList}
                          showPickup={showPickup}
                          pickup={item}
                        />
                      }
                    </div>
                  )
              })}
            </div>
          )
        }


        {/* Remaining title */}
        {
          selectedSla.length > 0 && remainingItems.length > 0 && (
            <div className="mh5 mt4">
              <div className="mb3 mt5 f4"><FormattedMessage id="checkout.remainingItems"/></div>
              <div className="c-muted-1">
                {
                  remainingPickupSlas.length === 1 ? (
                    <FormattedMessage id="checkout.remainingItemsHelp"/>
                  ) :
                  (
                    <FormattedMessage id="checkout.remainingItemsHelpPlural"/>
                  )
                }
              </div>

              <div className="mv4">
                <ItemsPreview
                  items={remainingItems}
                  setShowingItemsList={setShowingItemsList}
                />
              </div>
            </div>
          )
        }
       
        {/* Remaining items */}
        {
          remainingItems.length > 0 && (
            <Fragment>

              {/* Shipping */}
              <div className="mt4">
                <div className="ph5">
                  <h3 className="ttu c-muted-1 f6 fw5 mb3"><FormattedMessage id="checkout.shipToHome"/></h3>
                </div>

                {
                  remainingShippingSlas.map((item, i) => {
                    return (
                      <Fragment key={i}>
                        {
                          <div onClick={() => selectSla(item)}>
                            <SlaOption
                              name={item.name}
                              time={formatData(item.sla, item.timeType, item.channel)}
                              channel={item.channel}
                              price={item.lowPrice ? item.lowPrice : item.price}
                              products={products}
                              remainingItems={remainingItems}
                              slaRemainingItems={item.remainingItems}
                              availableItems={item.availableItems}
                            />
                          </div>
                        }
                      </Fragment>
                    )
                })}
              </div>

              {/* Pickup */}
              {
                remainingPickupSlas.length > 0 && (
                  <div className="mt5">
                    <div className="ph5">
                        <h3 className="ttu c-muted-1 f6 fw5 mb3"><FormattedMessage id="checkout.pickupInStore"/></h3>
                    </div>

                    {
                      remainingPickupSlas.map((item, i) => {
                        return (
                          <Fragment key={i}>
                          {
                            i === 0 &&
                              <Fragment>
                                <div onClick={() => showPickup(item)}>
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
                              </Fragment>
                          }
                          </Fragment>
                        )
                    })}

                    <div className="flex-auto ph5 pt4 c-on-base fw5" onClick={() => modalOpen('pickupList')}>
                      <div className="flex items-center">
                        <div className="flex-auto"><FormattedMessage id="checkout.viewOtherStores"/></div>

                        <div className="flex-none ml3 mt0">
                          <div className="flex items-center justify-end" style={{height: '26px', width: '26px'}}>
                            <svg width="16" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8.32251 5.28071L2.29701 0.280712C2.06973 0.0985538 1.76532 -0.00224062 1.44934 3.78026e-05C1.13337 0.00231622 0.831116 0.107485 0.60768 0.292893C0.384245 0.478301 0.257506 0.729114 0.25476 0.991311C0.252014 1.25351 0.373482 1.50611 0.593 1.69471L5.7665 5.98771L0.593 10.2807C0.477901 10.373 0.386094 10.4833 0.322936 10.6053C0.259778 10.7273 0.226534 10.8585 0.225143 10.9913C0.223753 11.1241 0.254244 11.2558 0.314837 11.3787C0.375431 11.5016 0.464913 11.6132 0.578063 11.7071C0.691213 11.801 0.825765 11.8753 0.973868 11.9255C1.12197 11.9758 1.28066 12.0011 1.44067 12C1.60068 11.9988 1.75881 11.9712 1.90584 11.9188C2.05287 11.8664 2.18585 11.7902 2.29701 11.6947L8.32251 6.69471C8.54843 6.50718 8.67535 6.25288 8.67535 5.98771C8.67535 5.72255 8.54843 5.46824 8.32251 5.28071Z" fill="#134CD8"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="mt5 bb b--muted-4"></div>
                    </div>
                  </div>
                )
              }
            </Fragment>
          )
        }

        {
          remainingItems.length === 0 &&
          <div className="mh5 mt5">
            {
              hasAddressStep ?
              <Button block onClick={goToNextStep}><FormattedMessage id="checkout.complementAddress"/></Button>
              :
              <Button block onClick={goToNextStep}><FormattedMessage id="checkout.goToPayment"/></Button>
            }
          </div>
        }
      </Fragment>
    )
  }
}

export default injectIntl(StepShipping)
