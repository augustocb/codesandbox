import { useIntl } from 'react-intl'

const FormatMessage = props => {
  return useIntl().formatMessage(props.id)
}

export default FormatMessage