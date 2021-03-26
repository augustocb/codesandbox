import { useIntl } from 'react-intl'

const FormatTime = props => {
  return useIntl().formatTime(props.id)
}

export default FormatTime
