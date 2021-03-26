import React, { Component, Fragment } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Spacer from './Spacer.js'

class Sidebar extends React.Component {
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
      modalClose,
    } = this.props

    return (
      <Fragment>
          <div className="fixed absolute--fill c-on-base">
            <div className="fixed absolute--fill bg-base--inverted o-50" onClick={modalClose}></div>
              <ReactCSSTransitionGroup
                transitionName="cart"
                transitionAppear
                transitionAppearTimeout={200}
                transitionEnter={false}
                transitionLeave={false}>
    
                <div className="fixed top-0 bottom-0 right-0 bg-muted-5 flex flex-column momentum overflow-auto" style={{ 'width': '80%' }}>
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

export default injectIntl(Sidebar)
