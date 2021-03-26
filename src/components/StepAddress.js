import React, { Component, Fragment } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import Button from '@vtex/styleguide/lib/Button'
import Input from '@vtex/styleguide/lib/Input'

class StepAddress extends Component {
  constructor() {
      super()
  }

  render() {
    let {
      address,
      location,
      intl: { formatMessage, },
    } = this.props

    return (
      <Fragment>
        <div className="mt5 ph5 lh-title">
          <div className="mb6">
            <div>{address.street}</div>
            <div>{address.neighbourhood}</div>
            <div>{address.city} - {address.state}</div>
            <div>{location}</div>
          </div>
          <div className="mb5">
            <Input label={formatMessage({id: 'checkout.number'})} />
          </div>
          <div className="mb5">
            <Input label={formatMessage({id: 'checkout.receiverName'})} />
          </div>
        </div>
        <div className="flex-none pa5 w-100 bg-white">
          <Button block onClick={this.props.goToNextStep}><FormattedMessage id="checkout.goToPayment" /></Button>
        </div>
      </Fragment>
    )
  }
}

export default injectIntl(StepAddress)
