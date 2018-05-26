import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container, Header, Left, Body, Title, Right, Spinner, Content, Text, Icon, Button } from 'native-base';

import { COLOR } from '../common/styles';

import * as Activity from '../common/Activity.state';

import { $fetchData } from './state';

const withStore = connect(
  (state) => ({
    processing: state.Activity.processing,
    data: state.Home.data,
  }),
  (dispatch) => ({ dispatch }),
);

// provides shared state and actions as props
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
            <Title>Home</Title>
          </Body>
          <Right>
            <Spinner size={22} inverse hidesWhenStopped animating={processing} />
          </Right>
        </Header>
        <Content padder>
          <Text>{JSON.stringify(data, null, 2)}</Text>
        </Content>
      </Container>
    );
  }
}

const WrappedHomeView = Wrapper(HomeView);

HomeView.propTypes = {
  processing: PropTypes.bool,
  data: PropTypes.object,
  dispatch: PropTypes.func,
};

HomeView.defaultProps = {
  processing: true,
  data: {},
  dispatch: () => {},
};

export default WrappedHomeView;
