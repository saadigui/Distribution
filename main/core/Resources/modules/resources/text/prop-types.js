import {PropTypes as T} from 'prop-types'

const Text = {
  propTypes: {
    id: T.number,
    content: T.string,
    text: T.shape({
      id: T.number.isRequired
    }).isRequired,
    meta: T.shape({
      version: T.number
    })
  }
}

export {
  Text
}