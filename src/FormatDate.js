import { useIntl } from 'react-intl'

const FormatDate = props => {
  return useIntl().formatDate(props.id)
}

export default FormatDate
