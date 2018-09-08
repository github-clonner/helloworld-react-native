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

import { $fetchData } from './state';

const withStore = connect((state) => ({
  processing: state.Activity.processingByTopic['Home.$fetchData'] || false,
  data: state.Home.data,
}));

const propTypes = {
  dispatch: PropTypes.dispatch.isRequired,
  processing: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
};

const Wrapper = (C) => withStore(C);

class HomeView extends Component {
  componentDidMount() {
    this.props
      .dispatch($fetchData())
      .then(() => this.props.dispatch(Activity.$toast('success', 'Home data loaded')))
      .catch((error) => this.props.dispatch(Activity.$toast('failure', error.message)));
  }

  render() {
    const { processing, data } = this.props;

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Todos</Title>
          </Body>
          <Right>
            <Spinner size={22} inverse hidesWhenStopped animating={processing} />
          </Right>
        </Header>
        <Content padder>
          {/* <Text>{JSON.stringify(data, null, 2)}</Text> */}
          <Card>
            {data
              && data.todo.map((item) => (
                <CardItem key={item.id} button bordered onPress={() => alert('Not yet implemented!')}>
                  <CheckBox checked={item.done} color={COLOR.primary} style={{ marginLeft: 0, marginRight: 16 }} />
                  <Text style={{ textDecorationLine: item.done ? 'line-through' : 'none' }}>{item.label}</Text>
                </CardItem>
              ))}
          </Card>
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
