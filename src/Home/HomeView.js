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

import * as Activity from '../Shared/Activity.state';

import { $fetchTaskIndex } from './state';

const withStore = connect((state) => ({
  processing: state.Activity.processingByTopic['Home.$fetchTaskIndex'] || false,
  tasks: state.Home.tasks,
}));

const propTypes = {
  dispatch: PropTypes.dispatch.isRequired,
  processing: PropTypes.bool.isRequired,
  tasks: PropTypes.object.isRequired,
};

const Wrapper = (C) => withStore(C);

class HomeView extends Component {
  componentDidMount() {
    this.props
      .dispatch($fetchTaskIndex())
      .then(() => this.props.dispatch(Activity.$toast('success', 'Tasks loaded')))
      .catch((error) => this.props.dispatch(Activity.$toast('failure', error.message)));
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
                <CardItem key={item.id} button bordered onPress={() => alert('Not yet implemented!')}>
                  <CheckBox checked={item.done} color={COLOR.primary} style={{ marginLeft: 0, marginRight: 16 }} />
                  <Text style={{ textDecorationLine: item.done ? 'line-through' : 'none' }}>{item.label}</Text>
                </CardItem>
              ))}
            </Card>
          )}
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
