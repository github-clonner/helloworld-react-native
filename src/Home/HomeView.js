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
  Item,
  Input,
} from 'native-base';

import * as PropTypes from '../common/proptypes';

import { COLOR } from '../common/styles';

import * as Activity from '../Shared/Activity.service';

import { $fetchIndex, $createTask } from './state';

const withStore = connect((state) => ({
  processing: state.Activity.processingByOperation['Home.fetchIndex'] || false,
  tasks: state.Home.index,
}));

const propTypes = {
  dispatch: PropTypes.dispatch.isRequired,
  processing: PropTypes.bool.isRequired,
  tasks: PropTypes.array,
};

const Wrapper = (C) => withStore(C);

class HomeView extends Component {
  state = {
    task: '',
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch($fetchIndex())
      .then(() => Activity.toast('success', 'Tasks loaded'))
      .catch((error) => Activity.toast('failure', error.message));
  }

  handleAddTask = () => {
    const { dispatch } = this.props;
    const { task } = this.state;

    dispatch($createTask(task))
      .then(() => Activity.toast('success', 'Tasks added'))
      .catch((error) => Activity.toast('failure', error.message));
  }

  renderTasks() {
    const { processing, tasks } = this.props;
    if (processing) {
      return null;
    }

    const isEmpty = tasks.length === 0;
    if (isEmpty) {
      return <Text>Empty</Text>;
    }

    return (
      <Card>
        {tasks.map((item) => (
          <CardItem key={item.id} button bordered onPress={() => alert('Not yet implemented!')}>
            <CheckBox
              checked={item.done}
              color={COLOR.primary}
              style={{ marginLeft: 0, marginRight: 16 }}
            />
            <Text style={{ textDecorationLine: item.done ? 'line-through' : 'none' }}>
              {item.title}
            </Text>
          </CardItem>
        ))}
      </Card>
    );
  }

  renderInput() {
    const { task } = this.state;

    return (
      <Item regular>
        <Input
          placeholder="Regular Textbox"
          value={task}
          onChangeText={(text) => this.setState({ task: text })}
        />
        <Button primary large onPress={this.handleAddTask}>
          <Text>Add</Text>
        </Button>
      </Item>
    );
  }

  render() {
    const { processing } = this.props;

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
          {this.renderTasks()}
          {this.renderInput()}
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
