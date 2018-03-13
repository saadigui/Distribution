import {PropTypes as T} from 'prop-types'

const Home = {
  propTypes: {

  }
}

// todo : rename in WidgetInstance
const Widget = {
  propTypes: {
    id: T.string.isRequired,
    type: T.string.isRequired,
    name: T.string,
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
  Home,
  Widget
}
