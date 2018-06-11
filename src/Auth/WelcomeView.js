import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';

import * as PropTypes from '../common/proptypes';

import { COLOR } from '../common/styles';

import styles from './styles';

import * as Activity from '../Shared/Activity.state';

const withStore = connect((state) => ({}));

const propTypes = {
  dispatch: PropTypes.dispatch.isRequired,
};

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
  navigation: PropTypes.navigation.isRequired,
};

WelcomeView.propTypes = {
  ...WrappedWelcomeView.propTypes,
  ...propTypes,
};

export default Wrapper(WrappedWelcomeView);
