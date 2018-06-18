import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Container, Header, Left, Body, Title, Right, Content, Text, Icon, Button } from 'native-base';

import * as PropTypes from '../common/proptypes';

import { STYLE } from '../common/styles';

import { RELEASE_VERSION, RELEASE_DATE } from '../common/config';

const withStore = connect((state) => ({}));

const propTypes = {
  dispatch: PropTypes.dispatch.isRequired,
};

const Wrapper = (C) => withStore(C);

// eslint-disable-next-line react/prefer-stateless-function
class AboutView extends Component {
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
            <Text>Release Version: {RELEASE_VERSION}</Text>
            <Text>Release Date: {RELEASE_DATE}</Text>
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
