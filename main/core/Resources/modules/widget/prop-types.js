import {PropTypes as T} from 'prop-types'

const Widget = {
  propTypes: {

  }
}

const WidgetInstance = {
  propTypes: {
    id: T.string.isRequired,
    type: T.string.isRequired,
    title: T.string,
    display: T.shape({
      color: T.string,
      background: T.oneOf(['none', 'color', 'image']),
      backgroundColor: T.string,
      backgroundImage: T.string
    }),
    // specific parameters of the instance
    // depends on the `type`
    parameters: T.object
  }
}

export {
  Widget,
  WidgetInstance
}
