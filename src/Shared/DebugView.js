import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container, Content, Header, Left, Body, Title, Right, Icon, Button, Text,
} from 'native-base';

import * as PropTypes from '../common/proptypes';

import { STYLE } from '../common/styles';

const withStore = connect((state) => state);

const propTypes = {
  ...PropTypes.withState,
};

const Wrapper = (C) => withStore(C);

class DebugView extends Component {
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
            <Title>DEBUG</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Text style={{ fontFamily: 'monospace', fontSize: 10 }}>{JSON.stringify(this.props, null, 2)}</Text>
        </Content>
      </Container>
    );
  }
}

DebugView.propTypes = propTypes;

export default Wrapper(DebugView);
