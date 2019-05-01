import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import * as PropTypes from 'prop-types';

class KeyboardEvents extends Component {
  listeners = [];

  componentWillMount() {
    const { keyboardDidShow, keyboardDidHide } = this.props;

    if (keyboardDidShow) this.listeners.push(Keyboard.addListener('keyboardDidShow', keyboardDidShow));
    if (keyboardDidHide) this.listeners.push(Keyboard.addListener('keyboardDidHide', keyboardDidHide));
  }

  componentWillUnmount() {
    this.listeners.forEach((listener) => listener.remove());
  }

  render() {
    return null;
  }
}

KeyboardEvents.propTypes = {
  keyboardDidShow: PropTypes.func,
  keyboardDidHide: PropTypes.func,
};

KeyboardEvents.defaultProps = {
  keyboardDidShow: null,
  keyboardDidHide: null,
};

export { KeyboardEvents };

/**
 * Usage
 */
/*

<KeyboardEvents
  keyboardDidShow={() => this.setState({ keyboardVisible: true })}
  keyboardDidHide={() => this.setState({ keyboardVisible: false })}
/>

*/
