import React, { Component, Fragment } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'

import Button from '@vtex/styleguide/lib/Button'

import PageTitle from './PageTitle.js'
import Logo from './Logo.js'
import _ from 'lodash'
import Checkout from '../App.js'

class NavigationHeader extends Component {
    constructor() {
        super()
    }

  render() {
    let {
      openMiniCart,
      step,
      steps,
      goToStep,
    } = this.props

    let title = 'title'
    switch (step) {
      case 'profile':
        title = 'checkout.stepTitleProfile'
      break;
      case 'shipping':
        title = 'checkout.stepTitleShipping'
      break;
      case 'address':
        title = 'checkout.stepTitleAddress'
      break;
      case 'payment':
        title = 'checkout.stepTitlePayment'
      break;
    }

    let bar = _.filter(steps, step => step.bar === true)
    let indexCurrentStep = _.findIndex(steps, item => item.name === step)
    let previousStep = indexCurrentStep > 0 ? steps[indexCurrentStep - 1].name : 0

    return (
        <div className="mt1">
          <div className="flex items-center">
            {
              step === 'cart' && (
                <div className="flex-none pv5 ml5">
                  <svg className="mt2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><title>menu-34</title><g fill="#2e2e2e"><path d="M15,7H1C0.4,7,0,7.4,0,8s0.4,1,1,1h14c0.6,0,1-0.4,1-1S15.6,7,15,7z"></path> <path fill="#2e2e2e" d="M15,1H1C0.4,1,0,1.4,0,2s0.4,1,1,1h14c0.6,0,1-0.4,1-1S15.6,1,15,1z"></path> <path fill="#2e2e2e" d="M15,13H1c-0.6,0-1,0.4-1,1s0.4,1,1,1h14c0.6,0,1-0.4,1-1S15.6,13,15,13z"></path></g></svg>
                </div>
              )
            }
            <div className="flex-none pv5 ml5">
              <Logo />
            </div>
            {
              step !== 'cart' && (
                <div className="flex-auto c-muted-1 f6 tr">
                  <div className="dib pa5" onClick={openMiniCart}>
                    <FormattedMessage id={'checkout.viewCart'}/>
                  </div>
                </div>
              )
            }
          </div>

          <div className={`flex ${step === 'cart' ? 'bg-muted-4' : ''}`} style={{'height': step === 'cart' ? '1px' : '3px'}}>
            {
              bar.map((item, i) => {
                return (
                  <div className={`flex-auto mh1 ${i < indexCurrentStep ? 'bg-action-primary' : 'bg-muted-4'}`}></div>
                )
              })
            }
          </div>
          {
            step !== 'cart' && (
              <div className="dib mt3" onClick={() => goToStep(previousStep)}>
                <Button variation="tertiary" size="small">
                  <svg width="16" height="28" viewBox="0 0 16 11" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.500023 5.5C0.500023 5.75781 0.583356 5.92969 0.750023 6.10156L5.50002 11L6.66669 9.79687L3.33335 6.35938L16.0002 6.35938V4.64063L3.33335 4.64063L6.66669 1.20313L5.50002 0L0.750023 4.89844C0.583356 5.07031 0.500023 5.24219 0.500023 5.5Z" fill="#134CD8"/>
                  </svg>
                </Button>
              </div>
            )
          }

          {
            step !== 'cart' && (
              <div className="mh5 mt4 mb2">
                <PageTitle><FormattedMessage id={title}/></PageTitle>
              </div>
            )
          }
        </div>
    )
  }
}

export default injectIntl(NavigationHeader)
