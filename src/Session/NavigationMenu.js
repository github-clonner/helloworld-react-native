import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Container, Content, Text, List, ListItem, Icon, Thumbnail, Left, Body } from 'native-base';

import * as PropTypes from '../common/proptypes';

import { $logout } from '../Auth/state';

import { COLOR } from '../common/styles';
import * as Activity from '../Shared/Activity.state';

const styles = StyleSheet.create({
  itemIcon: {
    fontSize: 24,
    marginLeft: 10,
  },
});

const withStore = connect((state) => ({
  user: state.Auth.user,
}));

const propTypes = {
  dispatch: PropTypes.dispatch.isRequired,
  user: PropTypes.User.isRequired,
};

const Wrapper = (C) => withStore(C);

/* eslint-disable react/prefer-stateless-function */
class NavigationMenu extends Component {
  render() {
    const user = this.props.user || {};
    const path = this.props.navigation.state.routes[this.props.navigation.state.index].routeName;
    return (
      <Container>
        <Content>
          <List>
            <ListItem avatar selected={path === '/profile'} onPress={() => this.props.navigation.navigate('/profile')}>
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
            <ListItem icon selected={path === '/home'} onPress={() => this.props.navigation.navigate('/home')}>
              <Left>
                <Icon name="home" style={styles.itemIcon} />
              </Left>
              <Body>
                <Text>Home</Text>
              </Body>
            </ListItem>
            <ListItem icon selected={path === '/about'} onPress={() => this.props.navigation.navigate('/about')}>
              <Left>
                <Icon name="information-circle" style={styles.itemIcon} />
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
                <Icon name="log-out" style={styles.itemIcon} />
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
  navigation: PropTypes.navigation.isRequired,
};

NavigationMenu.propTypes = {
  ...WrappedNavigationMenu.propTypes,
  ...propTypes,
};

export default Wrapper(WrappedNavigationMenu);
