import React, { Component } from 'react';

import {
  Container, Header, Content, Left, Body, Title, Right, Icon, Button, Text,
} from 'native-base';

import { STYLE } from '../common/styles';

import * as Dialog from './Dialog';

class DraftView extends Component {
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
            <Title>DRAFT</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Button block dark onPress={() => Dialog.toast(Dialog.SUCCESS, 'Toast')}>
            <Text>toast</Text>
          </Button>
          <Button block dark onPress={() => Dialog.status(Dialog.SUCCESS, 'Status')}>
            <Text>status</Text>
          </Button>
          <Button block dark onPress={() => Dialog.alert('Title', 'Alert').then((r) => Dialog.toast(Dialog.INFO, r))}>
            <Text>alert</Text>
          </Button>
          <Button
            block
            dark
            onPress={() => Dialog.confirm('Title', 'Confirmation').then((r) => Dialog.toast(Dialog.INFO, r))}
          >
            <Text>confirm</Text>
          </Button>
          <Button
            block
            dark
            onPress={() => Dialog.confirmWithNeutral('Title', 'confirmWithNeutral').then((r) => Dialog.toast(Dialog.INFO, r))
            }
          >
            <Text>confirmWithNeutral</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default DraftView;
