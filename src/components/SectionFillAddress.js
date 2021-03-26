import React, { Component, Fragment } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import Button from '@vtex/styleguide/lib/Button'
import NavigationHeader from './NavigationHeader'
import PageTitle from './PageTitle'

class SectionFillAddress extends Component {
    constructor() {
        super()
    }

  render() {
    let {
      goToSection,
      intl: { formatMessage, },
    } = this.props

    return (
      <Fragment>
        <div className="flex-auto overflow-auto momentum">
          <NavigationHeader>
            <PageTitle><FormattedMessage id="checkout.complementAddress"/></PageTitle>
          </NavigationHeader>
          
          <div className="mt5 ph5">
            Address Options
          </div>
        </div>
        <div className="flex-none pa5 w-100 bg-white">
          <Button block onClick={() => goToSection('Payment')}><FormattedMessage id="checkout.goToPayment"/></Button>
        </div>
      </Fragment>
    )
  }
}

export default injectIntl(SectionFillAddress)
