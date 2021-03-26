import React, { Component, Fragment } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'

class ItemsList extends React.Component {
  constructor() {
    super()
  }

  render() {
    let {
      options,
    } = this.props

    let items = (
      <span className="c-muted-2 fw4"> ({options.items.length} {options.items.length === 1 ? <FormattedMessage id="checkout.item"/> : <FormattedMessage id="checkout.items"/>})</span>
    )

    return (
      <div className="mh5 mt4">
        {
          options.time || options.unavailable ?
          <Fragment>
            <div className="fw5 mb4">{options.name ? options.name : <FormattedMessage id="checkout.remainingItems"/>}</div>
            <div className="fw4">{options.unavailable ? <FormattedMessage id="checkout.unavailablePlural"/> : options.time } {items}</div>
          </Fragment>
          :
          <Fragment>
            <div className="fw5 mb4">{options.name ? options.name : <FormattedMessage id="checkout.remainingItems"/>} {items}</div>
          </Fragment>
        }
        <div className="mt5">
          {
            options.items.map((item, i) => {
              return(
                <div ley={i} className="flex mb4">
                  <div className="flex-none mr4">
                    <img className="db br2" width="48" height="48" src={item.image}/>
                  </div>
                  <div className="flex-auto flex items-center">
                    {item.name}
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default injectIntl(ItemsList)
