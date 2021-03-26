import React, { Component, Fragment } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import Button from '@vtex/styleguide/lib/Button'
import Input from '@vtex/styleguide/lib/Input'

class StepProfile extends Component {
  constructor() {
      super()
  }

  render() {
    let {
      intl: { formatMessage, },
    } = this.props

    return (
      <Fragment>
        <div className="mt5 ph5">
          <div className="mb5">
            <Input label={formatMessage({id: 'checkout.email'})} />
          </div>
          <div className="mb5">
            <Input label={formatMessage({id: 'checkout.name'})} />
          </div>
          <div className="mb5">
            <Input label={formatMessage({id: 'checkout.phoneNumber'})} />
          </div>
          <div className="mb5">
            <Input label={formatMessage({id: 'checkout.document'})} />
          </div>
        </div>
        <div className="flex-none pa5 w-100 bg-white">
          <Button block onClick={this.props.goToNextStep}><FormattedMessage id="checkout.goToShipping" /></Button>
        </div>
      </Fragment>
    )
  }
}

export default injectIntl(StepProfile)
