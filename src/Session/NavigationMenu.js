import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Content, Text, List, ListItem, Icon, Thumbnail, Left, Body } from 'native-base';

import * as CustomPropTypes from '../common/proptypes';

import { $logout } from '../Auth/state';

import { COLOR } from '../common/styles';
import * as Activity from '../common/Activity.state';

const withStore = connect(
  (state) => ({
    user: state.Auth.user,
  }),
  (dispatch) => ({ dispatch }),
);
const Wrapper = (C) => withStore(C);

/* eslint-disable react/prefer-stateless-function */
class NavigationMenu extends Component {
  render() {
    const { user } = this.props;
    return (
      <Container>
        <Content>
          <List>
            <ListItem avatar onPress={() => this.props.navigation.navigate('/profile')}>
              <Left>
                <Thumbnail circle small source={{ uri: user.picture }} />
              </Left>
              <Body>
                <Text>{user.name}</Text>
                <Text note style={{ fontSize: 15, color: COLOR.textSecondary }}>
                  {user.email}
                </Text>
              </Body>
            </ListItem>
            <ListItem icon onPress={() => this.props.navigation.navigate('/home')}>
              <Left>
                <Icon name="home" style={{ fontSize: 24, marginLeft: 10 }} />
              </Left>
              <Body>
                <Text>Home</Text>
              </Body>
            </ListItem>
            <ListItem icon onPress={() => this.props.navigation.navigate('/about')}>
              <Left>
                <Icon name="information-circle" style={{ fontSize: 24, marginLeft: 10 }} />
              </Left>
              <Body>
                <Text>About</Text>
              </Body>
            </ListItem>
            <ListItem
              icon
              onPress={() =>
                this.props
                  .dispatch($logout())
                  .then(() => this.props.dispatch(Activity.$status('success', 'Goodbye!')))
                  .catch((error) => this.props.dispatch(Activity.$toast('failure', error.message)))
              }
            >
              <Left>
                <Icon name="log-out" style={{ fontSize: 24, marginLeft: 10 }} />
              </Left>
              <Body>
                <Text>Logout</Text>
              </Body>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

const WrappedNavigationMenu = Wrapper(NavigationMenu);

WrappedNavigationMenu.propTypes = {
  navigation: CustomPropTypes.navigation.isRequired,
};

NavigationMenu.propTypes = {
  ...WrappedNavigationMenu.propTypes,
  dispatch: CustomPropTypes.dispatch.isRequired,
  user: CustomPropTypes.User.isRequired,
};

export default WrappedNavigationMenu;
