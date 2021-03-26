import React, { Component, Fragment } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'

import MiniListItem from './MiniListItem.js'

import Button from '@vtex/styleguide/lib/Button'

class MiniCart extends Component {
  constructor() {
    super()

		this.state = {
      typedAddress: '',
    }
  }

  render() {
    let {
      cartItems,
      intl: { formatMessage, }
    } = this.props

    return (
      <Fragment>
        <div className="ph5 flex-auto">
          <div id="cart">
            <h3 className="t-heading-5 pb4 mb3 bb b--muted-4"><FormattedMessage id="checkout.cart"/>: <span className="fw3">{cartItems.length} <FormattedMessage id="checkout.items"/></span></h3>

            {cartItems.map((item, i) => {
              return (
                <MiniListItem
                  image={item.image}
                  key={i}
                  index={i}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  variations={item.variations}
                />
              )
            })}
          </div>
        </div>
      </Fragment>

    )
  }
}

export default injectIntl(MiniCart)
