import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Content,
  Spinner,
  Text,
  Icon,
  Button,
  Card,
  CardItem,
  CheckBox,
  View,
} from 'native-base';

import * as PropTypes from '../common/proptypes';

import { COLOR } from '../common/styles';

import * as Activity from '../Shared/Activity.service';

import { $fetchIndex } from './state';

const withStore = connect((state) => ({
  processing: state.Activity.processingByOperation['Home.$fetchIndex'] || false,
  tasks: state.Home.index,
}));

const propTypes = {
  dispatch: PropTypes.dispatch.isRequired,
  processing: PropTypes.bool.isRequired,
  tasks: PropTypes.object.isRequired,
};

const Wrapper = (C) => withStore(C);

class HomeView extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch($fetchIndex())
      .then(() => Activity.toast('success', 'Tasks loaded'))
      .catch((error) => Activity.toast('failure', error.message));
  }

  render() {
    const { processing, tasks } = this.props;

    return (
      <Container>
        <Header _style={{ alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              {processing ? <Spinner size="small" inverse /> : <Icon name="menu" />}
            </Button>
          </Left>
          <Body>
            <Title>Tasks</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          {/* <Text>{JSON.stringify(tasks, null, 2)}</Text> */}
          {tasks && (
            <Card>
              {tasks.map((item) => (
                <CardItem key={item.id} button bordered>
                  <CheckBox checked={item.done} color={COLOR.primary} style={{ marginLeft: 0, marginRight: 16 }} />
                  <Text style={{ textDecorationLine: item.done ? 'line-through' : 'none' }}>{item.title}</Text>
                </CardItem>
              ))}
            </Card>
          )}

          <View>
            <Text>Alert examples</Text>
            <Button
              danger
              onPress={() => {
                Activity.alert(
                  'Do you like Hello World?',
                  'Please take a few seconds to rate our app in the store',
                  {
                    text: 'Ask me later',
                    onPress: () => console.log('Ask me later pressed'),
                  },
                  {
                    text: 'Never',
                    onPress: () => console.log('Never Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => console.log('OK Pressed'),
                  },
                );
              }}
            >
              <Text>Rate us</Text>
            </Button>

            <Button
              danger
              onPress={() => {
                Activity.confirm(
                  'Are you sure?',
                  'Data will be permanantly deleted!',
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel pressed'),
                  },
                  {
                    text: 'Confirm',
                    onPress: () => console.log('Confirm pressed'),
                    style: 'destructive',
                  }
                );
              }}
            >
              <Text>Delete</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const WrappedHomeView = Wrapper(HomeView);

WrappedHomeView.propTypes = {
  navigation: PropTypes.navigation.isRequired,
};

HomeView.propTypes = {
  ...WrappedHomeView.propTypes,
  ...propTypes,
};

export default WrappedHomeView;
