import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View, TouchableOpacity } from 'react-native';
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
  List,
  ListItem,
} from 'native-base';

import * as PropTypes from '../common/proptypes';

import { COLOR } from '../common/styles';

import * as Activity from '../Shared/Activity.service';

import {
  $fetchTasks,
  $createTask,
  $completeTask,
  $uncompleteTask,
  $editTask,
} from './state';

const withStore = connect((state) => ({
  processing: state.Activity.processingByOperation['Home.fetchTasks'] || false,
  tasks: state.Home.tasks,
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

    dispatch($fetchTasks())
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

  handleToggleComplete = (task) => {
    const { dispatch } = this.props;

    if (task.done) {
      dispatch($uncompleteTask(task.id));
    } else {
      dispatch($completeTask(task.id));
    }
  }

  renderTasks() {
    const { processing, tasks } = this.props;

    return (
      <FlatList
        data={tasks}
        refreshing={!!processing}
        ListEmptyComponent={<Text>Empty</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <CheckBox
                checked={item.done}
                color={COLOR.primary}
                style={{ marginLeft: 0, marginRight: 16 }}
                onPress={() => this.handleToggleComplete(item)}
              />
              <Text style={{ textDecorationLine: item.done ? 'line-through' : 'none' }}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  }

  renderInput() {
    const { task } = this.state;

    return (
      <Item regular>
        <Input
          placeholder="What needs to be done?"
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
          {this.renderInput()}
          <View style={{ marginTop: 14 }}>
            {this.renderTasks()}
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
