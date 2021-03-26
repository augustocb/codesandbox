import React, { Component, Fragment } from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import Button from '@vtex/styleguide/lib/Button'
import NavigationHeader from './NavigationHeader.js'
import PageTitle from './PageTitle.js'

class GetLocation extends Component {
  constructor() {
    super()
  }

  render() {
    let {
      openModal,
      setSearchAddress,
    } = this.props

    return (
      <div className="flex-auto overflow-auto momentum">
        {
          !openModal
          ? <NavigationHeader><PageTitle><FormattedMessage id="checkout.pickupInAPoint"/></PageTitle></NavigationHeader>
          : <div className="ph5"><PageTitle><FormattedMessage id="checkout.pickupInAPoint"/></PageTitle></div>
        }

        <div className="ph5 mb6">
          <div className="tc lh-copy pt4"><FormattedMessage id="checkout.pickupSuggest"/></div>

          <svg className="db center mv7" width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0)">
                  <circle cx="60" cy="60" r="60" fill="#134CD8"/>
                  <path d="M46.9433 42.4374L-9.32953 -13.8354C-9.99268 -14.4985 -11.0679 -14.4985 -11.731 -13.8354L-68.0038 42.4374C-68.667 43.1005 -68.667 44.1757 -68.0038 44.8389L-11.731 101.112C-11.0679 101.775 -9.99268 101.775 -9.32953 101.112L46.9432 44.8389C47.6064 44.1757 47.6064 43.1005 46.9433 42.4374Z" stroke="white"/>
                  <path d="M144.701 -28.9806L88.428 -85.2534C87.7649 -85.9165 86.6897 -85.9165 86.0265 -85.2534L29.7538 -28.9806C29.0906 -28.3174 29.0906 -27.2422 29.7538 -26.5791L86.0265 29.6937C86.6897 30.3568 87.7649 30.3568 88.428 29.6937L144.701 -26.5791C145.364 -27.2422 145.364 -28.3174 144.701 -28.9806Z" stroke="white"/>
                  <path d="M167.42 95.1718L111.147 38.899C110.484 38.2358 109.409 38.2358 108.746 38.899L52.4728 95.1718C51.8096 95.8349 51.8096 96.9101 52.4728 97.5733L108.746 153.846C109.409 154.509 110.484 154.509 111.147 153.846L167.42 97.5733C168.083 96.9101 168.083 95.8349 167.42 95.1718Z" stroke="white"/>
                  <path d="M84.2277 147.906L27.9549 91.6334C27.2917 90.9702 26.2166 90.9702 25.5534 91.6334L-30.7194 147.906C-31.3825 148.569 -31.3825 149.644 -30.7194 150.308L25.5534 206.58C26.2166 207.244 27.2917 207.244 27.9549 206.58L84.2277 150.308C84.8908 149.644 84.8908 148.569 84.2277 147.906Z" stroke="white"/>
                  <path d="M185.136 47.8544L128.863 -8.41839C128.2 -9.08155 127.125 -9.08155 126.462 -8.41839L70.1891 47.8544C69.5259 48.5175 69.5259 49.5927 70.1891 50.2559L126.462 106.529C127.125 107.192 128.2 107.192 128.863 106.529L185.136 50.2559C185.799 49.5927 185.799 48.5175 185.136 47.8544Z" stroke="white"/>
                  <path d="M56.4787 0.537977L0.205874 -55.7348C-0.45728 -56.398 -1.53247 -56.398 -2.19562 -55.7348L-58.4684 0.537983C-59.1316 1.20114 -59.1316 2.27633 -58.4684 2.93948L-2.19563 59.2123C-1.53248 59.8754 -0.457287 59.8754 0.205868 59.2123L56.4787 2.93947C57.1418 2.27632 57.1418 1.20113 56.4787 0.537977Z" stroke="white"/>
                  <path d="M56.4061 32.5186C46.0924 32.5186 37.7268 41.0363 37.7268 51.5374C37.7268 65.8016 56.4061 86.8582 56.4061 86.8582C56.4061 86.8582 75.0853 65.8016 75.0853 51.5374C75.0853 41.0363 66.7197 32.5186 56.4061 32.5186ZM56.4061 58.3299C52.7236 58.3299 49.7349 55.2869 49.7349 51.5374C49.7349 47.788 52.7236 44.745 56.4061 44.745C60.0885 44.745 63.0772 47.788 63.0772 51.5374C63.0772 55.2869 60.0885 58.3299 56.4061 58.3299Z" fill="white"/>
              </g>
              <defs>
                  <clipPath id="clip0">
                      <rect width="120" height="120" fill="white"/>
                  </clipPath>
              </defs>
          </svg>

          <Button block onClick={setSearchAddress}>
            <FormattedMessage id="checkout.detectLocation"/>
          </Button>

          <div className="t-action--small c-muted-1 tc mv6">
            <FormattedMessage id="checkout.or"/>
          </div>

          <Button variation="secondary" block>
            <FormattedMessage id="checkout.searchManually"/>
          </Button>
        </div>
      </div>
    )
  }
}

export default injectIntl(GetLocation)
