import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import { FormattedMessage, injectIntl } from 'react-intl'

class ItemsPreview extends Component {
    constructor() {
        super()
    }

  render() {
    let {
      unavailable,
      items,
      setShowingItemsList,
      name,
      time,
      intl: { formatMessage, }
    } = this.props

    return (
      <div className="pt4 flex" onClick={() => setShowingItemsList({'name': name, 'time': time, 'items': items})}>
        {
          items.map((item, i) => (
            <Fragment>
              {
                i <= 2 && (
                  <div key={i} className="flex-none mr4 relative">
                    <img className="db br2" width="66" height="66" src={item.image}/>
                    {
                      unavailable &&
                      <div className="absolute top-0 right-0" style={{'top': '-4px', 'right': '-4px'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><title>ban</title><g fill="#FF4C4C"><path fill="#FF4C4C" d="M8,0C3.6,0,0,3.6,0,8s3.6,8,8,8s8-3.6,8-8S12.4,0,8,0z M8,2c1.3,0,2.5,0.4,3.5,1.1l-8.4,8.4 C2.4,10.5,2,9.3,2,8C2,4.7,4.7,2,8,2z M8,14c-1.3,0-2.5-0.4-3.5-1.1l8.4-8.4C13.6,5.5,14,6.7,14,8C14,11.3,11.3,14,8,14z"></path></g></svg>
                      </div>
                    }
                  </div>
                )
              }
            </Fragment>
          ))
        }
        {
          items.length > 3 && (
            <div className="flex-none ba br2 b--muted-3 c-action-primary ttu fw5 bg-white flex items-center tc" style={{height: '66px', width: '66px'}}>
              <div className="flex-auto pa2">
                + {items.length - 3} {items.length - 3 === 1 ? <FormattedMessage id="checkout.item"/> : <FormattedMessage id="checkout.items"/>}
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

export default injectIntl(ItemsPreview)
