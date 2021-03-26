import React, { Component, Fragment } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import Button from '@vtex/styleguide/lib/Button'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import PageTitle from './PageTitle.js'
import Spacer from './Spacer.js'

class Modal extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    document.body.style.overflow = 'hidden';
  }
  
  componentWillUnmount() {
      document.body.style.overflow = 'unset';
  }

  render() {
    let {
      children,
      modalPage,
      modalPageBack,
      modalGoTo,
      modalClose,
      modalGoBack,
    } = this.props

    let linkBack
    let title = 'checkout.takeOneProducts'

    switch (modalPage) {
      case 'pickupDetails':
        title = 'checkout.pickupDetails'
      break;
      case 'pickupList':
        title = 'checkout.pickupList'
      break;
      case 'itemsList':
        title = 'checkout.itemsList'
        linkBack = false
      break;
    }

    return (
      <Fragment>
          <div className="fixed absolute--fill c-on-base">
            <div className="fixed absolute--fill bg-base--inverted o-50" onClick={modalClose}></div>
              <ReactCSSTransitionGroup
                transitionName="hello"
                transitionAppear
                transitionAppearTimeout={200}
                transitionEnter={false}
                transitionLeave={false}>
    
                <div className="fixed top-2 mt4 bottom-0 left-0 right-0 bg-white flex flex-column momentum overflow-auto">
                  <div className="flex-none flex items-center mt5 mb4">
                    <div className="flex-auto ph5 pt5">
                      <PageTitle><FormattedMessage id={title}/></PageTitle>
                    </div>
                    <div className="flex-none fr">
                      <Button variation="tertiary" size="small" onClick={modalClose}>
                        <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.7 0.3C13.3 -0.1 12.7 -0.1 12.3 0.3L7 5.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L5.6 7L0.3 12.3C-0.1 12.7 -0.1 13.3 0.3 13.7C0.5 13.9 0.7 14 1 14C1.3 14 1.5 13.9 1.7 13.7L7 8.4L12.3 13.7C12.5 13.9 12.8 14 13 14C13.2 14 13.5 13.9 13.7 13.7C14.1 13.3 14.1 12.7 13.7 12.3L8.4 7L13.7 1.7C14.1 1.3 14.1 0.7 13.7 0.3Z" fill="#979899"/>
                        </svg>
                      </Button>
                    </div>
                  </div>

                  {
                    modalPageBack && modalPageBack.length > 0 && (
                      <div className="flex-none" onClick={modalGoBack}>
                        <Button variation="tertiary" size="small">
                          <svg width="16" height="11" viewBox="0 0 16 11" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.500023 5.5C0.500023 5.75781 0.583356 5.92969 0.750023 6.10156L5.50002 11L6.66669 9.79687L3.33335 6.35938L16.0002 6.35938V4.64063L3.33335 4.64063L6.66669 1.20313L5.50002 0L0.750023 4.89844C0.583356 5.07031 0.500023 5.24219 0.500023 5.5Z" fill="#134CD8"/>
                          </svg>
                        </Button>
                      </div>
                    )
                  }
                  <div className="mt3">
                    {children}
                    <Spacer/>
                  </div>
              </div>
            </ReactCSSTransitionGroup>
          </div>
      </Fragment>
    )
  }
}

export default injectIntl(Modal)
