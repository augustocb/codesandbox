import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import InputButton from '@vtex/styleguide/lib/InputButton'

class Location extends Component {
  constructor() {
    super()

		this.state = {
      typedAddress: '',
    }
  }

  handleChangeAddress = (e) => {
    this.setState({typedAddress: e.target.value})
  }

  render() {
    let {
      intl: { formatMessage, }
    } = this.props

    return (
      <div className="ph5 mt6">
        <form onSubmit={() => this.props.setLocation(this.state.typedAddress)}>
          <InputButton buttonProps={{'variation': 'primary'}} size="large" label={formatMessage({id: 'checkout.yourAddress'})} button="OK" onChange={this.handleChangeAddress} />
        </form>
      </div>
    )
  }
}

export default injectIntl(Location)
