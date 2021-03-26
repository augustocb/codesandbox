import { useIntl } from 'react-intl'

const FormatRelative = props => {
  return useIntl().formatRelative(props.id)
}

export default FormatRelative
