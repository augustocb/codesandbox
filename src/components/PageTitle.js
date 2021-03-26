import React, { Component, Fragment } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'

class PageTitle extends Component {
    constructor() {
        super()
    }

  render() {
    let {
        children,
    } = this.props

    return (
        <h2 className="t-heading-4 mt1 mb0">{children}</h2>
    )
  }
}

export default injectIntl(PageTitle)
