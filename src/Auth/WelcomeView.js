import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';

import * as CustomPropTypes from '../common/proptypes';

import { COLOR } from '../common/styles';

import styles from './styles';

import * as Activity from '../common/Activity.state';

const withStore = connect((state) => ({}), (dispatch) => ({}));

// provides shared state and actions as props
const Wrapper = (C) => withStore(C);

class WelcomeView extends Component {
  state = {};

  render() {
    return (
      <Container>
        <Content scrollEnabled={false} contentContainerStyle={{ flex: 1 }}>
          <Text>WIP</Text>
        </Content>
      </Container>
    );
  }
}

const WrappedWelcomeView = Wrapper(WelcomeView);

WrappedWelcomeView.propTypes = {
  navigation: CustomPropTypes.navigation.isRequired,
};

WelcomeView.propTypes = {
  ...WrappedWelcomeView.propTypes,
};

export { WelcomeView };
export default WrappedWelcomeView;
