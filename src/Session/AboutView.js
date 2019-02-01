import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import {
  Container, Header, Left, Body, Title, Right, Content, Text, Icon, Button,
} from 'native-base';

import * as PropTypes from '../common/proptypes';

import { STYLE } from '../common/styles';

import { RELEASE_VERSION } from '../common/config';

const withStore = connect((state) => ({}));

const propTypes = {
  dispatch: PropTypes.dispatch.isRequired,
};

const Wrapper = (C) => withStore(C);

class AboutView extends Component {
  state = {};

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>About</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <View>
            <Text>
              Release:
              {RELEASE_VERSION}
            </Text>
          </View>
        </Content>
      </Container>
    );
  }
}

const WrappedAboutView = Wrapper(AboutView);

WrappedAboutView.propTypes = {
  navigation: PropTypes.navigation.isRequired,
};

AboutView.propTypes = {
  ...WrappedAboutView.propTypes,
  ...propTypes,
};

export default WrappedAboutView;
