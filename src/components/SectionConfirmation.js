import React, { Component, Fragment } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import NavigationHeader from './NavigationHeader'
import PageTitle from './PageTitle'

class SectionConfirmation extends Component {
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
            <PageTitle>Order Placed!</PageTitle>
          </NavigationHeader>
          
          <div className="mt5 ph5">
            Thank you soooo much!
          </div>
        </div>
      </Fragment>
    )
  }
}

export default injectIntl(SectionConfirmation)
