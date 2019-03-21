import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, KeyboardAvoidingView } from 'react-native';
import {
  Container, Header, Content, Button, Spinner, Input, Item, Text, Form,
} from 'native-base';

import * as PropTypes from '../common/proptypes';

import { COLOR } from '../common/styles';

import { LogoHeader } from './LogoHeader';

import * as Activity from '../Shared/Activity.service';
import { $login } from '../Auth/state';

const withStore = connect((state) => ({
  processing: state.Activity.processingByOperation['Auth.login'] || false,
}));

const propTypes = {
  dispatch: PropTypes.dispatch.isRequired,
  processing: PropTypes.bool.isRequired,
};

const Wrapper = (C) => withStore(C);

class LoginView extends Component {
  state = {
    username: 'client@starter.emiketic.com',
    password: 'password',
  };

  $password = React.createRef();

  hasValidInput() {
    return !!this.state.username && !!this.state.password;
  }

  login() {
    if (!this.hasValidInput()) {
      return null;
    }

    const { dispatch } = this.props;

    dispatch($login(this.state.username, this.state.password)).catch((error) => Activity.toast('failure', error.message));
  }

  render() {
    return (
      <Container>
        <Header noShadow style={{ height: 0 }} />
        <Content scrollEnabled={false} contentContainerStyle={{ flex: 1 }}>
          <LogoHeader style={{ flex: 1, minHeight: 'auto' }} />

          <KeyboardAvoidingView>
            <Form
              style={{
                padding: 16,
              }}
            >
              <Item regular>
                <Input
                  placeholder="Email"
                  keyboardType="email-address"
                  value={this.state.username}
                  autoCapitalize="none"
                  returnKeyType="next"
                  enablesReturnKeyAutomatically
                  onChangeText={(username) => this.setState({ username })}
                  onSubmitEditing={() => this.$password.current.wrappedInstance.focus()}
                />
              </Item>

              <View style={{ margin: 4 }} />

              <Item regular>
                <Input
                  ref={this.$password}
                  placeholder="Password"
                  secureTextEntry
                  autoCapitalize="none"
                  value={this.state.password}
                  returnKeyType="send"
                  enablesReturnKeyAutomatically
                  blurOnSubmit
                  onChangeText={(password) => this.setState({ password })}
                  onSubmitEditing={() => this.login()}
                />
              </Item>

              <View style={{ margin: 4 }} />

              <Button full primary active={!this.hasValidInput() || this.props.processing} onPress={() => this.login()}>
                <Text>Log in</Text>
                {this.props.processing && <Spinner size="small" inverse />}
              </Button>
            </Form>
          </KeyboardAvoidingView>

          <View style={{ flexDirection: 'row' }}>
            <Button transparent full onPress={() => this.props.navigation.navigate('/signup')} style={{ flex: 1 }}>
              <Text>Sign up</Text>
            </Button>

            <Button
              transparent
              full
              onPress={() => this.props.navigation.navigate('/password-reset')}
              style={{ flex: 1 }}
            >
              <Text>Recover</Text>
            </Button>
          </View>

          <View style={{ margin: 4 }} />
        </Content>
      </Container>
    );
  }
}

const WrappedLoginView = Wrapper(LoginView);

WrappedLoginView.propTypes = {
  navigation: PropTypes.navigation.isRequired,
};

LoginView.propTypes = {
  ...WrappedLoginView.propTypes,
  ...propTypes,
};

export default WrappedLoginView;
