import React, { Component, Fragment } from 'react'
import { injectIntl } from 'react-intl'

class Arrow extends Component {
    constructor() {
        super()
    }

  render() {
    let {
    } = this.props

    return (
        <div className="flex-none pl5 pr5 self-center">
            <svg width="8" height="14" viewBox="0 0 8 14" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.33052 6.33107C7.67275 6.71137 7.67275 7.28863 7.33052 7.66893L1.63316 14L0 12.1852L4.66617 7L0 1.81481L1.63316 0L7.33052 6.33107Z" fill="#134CD8"/>
            </svg>
        </div>
    )
  }
}

export default injectIntl(Arrow)
