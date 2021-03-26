import React, { Component, Fragment } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'

import ListItem from './ListItem.js'

import Button from '@vtex/styleguide/lib/Button'

import Input from '@vtex/styleguide/lib/Input'
import InputButton from '@vtex/styleguide/lib/InputButton'
import NavigationHeader from './NavigationHeader.js'
import PageTitle from './PageTitle.js'

class Cart extends Component {
  constructor() {
    super()

		this.state = {
      typedAddress: '',
    }
  }

  render() {
    let {
      cartItems,
      updateQuantity,
      goToNextStep,
      intl: { formatMessage, }
    } = this.props

    return (
      <Fragment>
        <div className="ph5 flex-auto">
          <div id="cart">
            <h3 className="t-heading-4 mb3"><FormattedMessage id="checkout.cart"/>: <span className="fw3">{cartItems.length} <FormattedMessage id="checkout.items"/></span></h3>

            {cartItems.map((item, i) => {
              return (
                <ListItem
                  image={item.image}
                  key={i}
                  index={i}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  variations={item.variations}
                  updateQuantity={updateQuantity}
                />
              )
            })}
          </div>
        </div>
        <div className="flex-none pa5 w-100 bg-white">
          <Button block onClick={goToNextStep}><FormattedMessage id="checkout.procede"/></Button>
        </div>
      </Fragment>

    )
  }
}

export default injectIntl(Cart)
