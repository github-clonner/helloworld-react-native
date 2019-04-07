import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
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
  CardItem,
  CheckBox,
  Input,
  Item,
} from 'native-base';

import { FlatList } from 'react-native-gesture-handler';
import * as PropTypes from '../common/proptypes';

import { COLOR, STYLE } from '../common/styles';

import * as Dialog from '../Shared/Dialog';

import {
  $fetchTasks, $updateTask, $removeTask, $createTask,
} from './state';

const withStore = connect((state) => ({
  processing: state.Activity.processingByOperation[$fetchTasks.OPERATION] || false,
  tasks: state.Home.tasks,
}));

const propTypes = {
  ...PropTypes.withRouting,
  ...PropTypes.withState,
  processing: PropTypes.bool.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.Task.isRequired).isRequired,
};

const Wrapper = (C) => withStore(C);

class HomeView extends Component {
  state = {
    text: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch($fetchTasks())
      .then(() => Dialog.toast(Dialog.SUCCESS, 'Tasks loaded'))
      .catch((error) => Dialog.toast(Dialog.FAILURE, error.message));
  }

  createTask() {
    const { dispatch } = this.props;
    const { text } = this.state;
    dispatch($createTask({ title: text }));
    this.setState({ text: '' });
  }

  render() {
    const { processing, tasks, dispatch } = this.props;
    const { text } = this.state;
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
          <Item>
            <Input placeholder="Add task" value={text} onChangeText={(value) => this.setState({ text: value })} />
            <Button disabled={processing} onPress={() => this.createTask()}>
              <Text>save</Text>
            </Button>
          </Item>
          {/* {tasks && (
            <Card>
              {tasks.map((item) => (
                <CardItem key={item.id} button bordered>
                  <Left>
                    <CheckBox
                      checked={item.done}
                      color={COLOR.primary}
                      style={{ marginLeft: 0, marginRight: 16 }}
                      onPress={() => dispatch($updateTask(item.id, { done: !item.done }))}
                    />
                    <Text style={{ textDecorationLine: item.done ? 'line-through' : 'none' }}>{item.title}</Text>
                  </Left>

                  <Right>
                    <Button transparent large><Icon name="create" /></Button>
                    <Button transparent large onPress={() => dispatch($removeTask(item.id))}><Icon name="trash" /></Button>
                  </Right>
                </CardItem>
              ))}
            </Card>
          )} */}

          <FlatList
            contentContainerStyle={[STYLE.flexGrow, STYLE.padder]}
            // ListEmptyComponent={<DataEmpty icon="history" message="Aucune course passée" />}
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CardItem key={item.id} button bordered>
                <Left>
                  <CheckBox
                    checked={item.done}
                    color={COLOR.primary}
                    style={{ marginLeft: 0, marginRight: 16 }}
                    onPress={() => dispatch($updateTask(item.id, { done: !item.done }))}
                  />
                  <Text style={{ textDecorationLine: item.done ? 'line-through' : 'none' }}>{item.title}</Text>
                </Left>

                <Right>
                  <View style={{ flexDirection: 'row' }}>
                    <Button transparent style={{ marginHorizontal: 12 }}>
                      <Icon name="create" />
                    </Button>
                    <Button transparent style={{ marginHorizontal: 12 }} onPress={() => dispatch($removeTask(item.id))}>
                      <Icon name="trash" />
                    </Button>
                  </View>
                </Right>
              </CardItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}

HomeView.propTypes = propTypes;

export default Wrapper(HomeView);
