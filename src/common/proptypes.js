import PropTypes from 'prop-types';

/**
 * General Purpose
 */

export const style = PropTypes.object; // @TODO define shape

export const navigation = PropTypes.shape({
  navigate: PropTypes.func,
  goBack: PropTypes.func,
  addListener: PropTypes.func,
  isFocused: PropTypes.func,
  // state: PropTypes.object,
  state: PropTypes.shape({
    routeName: PropTypes.string,
    key: PropTypes.string,
    params: PropTypes.object,
  }),
  setParams: PropTypes.func,
  getParam: PropTypes.func,
  dispatch: PropTypes.func,
  push: PropTypes.func,
  pop: PropTypes.func,
  popToTop: PropTypes.func,
  replace: PropTypes.func,
});

export const dispatch = PropTypes.func;

export const View = {
  navigation: navigation.isRequired,
};

export const ConnectedView = {
  dispatch: dispatch.isRequired,
};

/**
 * Domain Entities
 */

export const User = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  picture: PropTypes.string,
  email: PropTypes.string,
});
