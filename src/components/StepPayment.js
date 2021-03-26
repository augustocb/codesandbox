import React, { Component, Fragment } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import Button from '@vtex/styleguide/lib/Button'
import Input from '@vtex/styleguide/lib/Input'

class StepPayment extends Component {
  constructor() {
      super()
  }

  render() {
    let {
      intl: { formatMessage, },
    } = this.props

    return (
      <Fragment>
        <div className="mt5 ph5 lh-title">
          Payment tralala
        </div>
        <div className="flex-none pa5 w-100 bg-white">
          <Button block onClick={this.props.goToNextStep}><FormattedMessage id="checkout.goToPayment" /></Button>
        </div>
      </Fragment>
    )
  }
}

export default injectIntl(StepPayment)
