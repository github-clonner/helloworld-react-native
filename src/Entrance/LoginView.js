import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, KeyboardAvoidingView } from 'react-native';
import {
  Container, Header, Content, Button, Spinner, Input, Item, Text, Form,
} from 'native-base';

import * as PropTypes from '../common/proptypes';

import { STYLE } from '../common/styles';

import { LogoHeader } from './LogoHeader';

import * as Dialog from '../Shared/Dialog';

import { $login } from '../Auth/state';

const withStore = connect((state) => ({
  processing: state.Activity.processingByOperation['Auth.login'] || false,
}));

const propTypes = {
  ...PropTypes.withState,
  processing: PropTypes.bool.isRequired,
};

const Wrapper = (C) => withStore(C);

class LoginView extends Component {
  state = {
    username: '',
    password: '',
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

    dispatch($login(this.state.username, this.state.password)).catch((error) => Dialog.toast(Dialog.FAILURE, error.message));
  }

  render() {
    return (
      <Container>
        <Header noShadow style={{ height: 0 }} />
        <Content scrollEnabled={false} contentContainerStyle={STYLE.flexGrow}>
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
                  value={this.state.username}
                  onChangeText={(username) => this.setState({ username })}
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() => this.$password.current.wrappedInstance.focus()}
                  enablesReturnKeyAutomatically
                  autoCapitalize="none"
                />
              </Item>

              <View style={{ margin: 4 }} />

              <Item regular>
                <Input
                  ref={this.$password}
                  placeholder="Password"
                  value={this.state.password}
                  onChangeText={(password) => this.setState({ password })}
                  returnKeyType="send"
                  onSubmitEditing={() => this.login()}
                  secureTextEntry
                  enablesReturnKeyAutomatically
                  blurOnSubmit
                  autoCapitalize="none"
                />
              </Item>

              <View style={{ margin: 4 }} />

              <Button
                block
                primary
                active={!this.hasValidInput() || this.props.processing}
                onPress={() => this.login()}
              >
                <Text>Log in</Text>
                {this.props.processing && <Spinner size="small" inverse />}
              </Button>
            </Form>
          </KeyboardAvoidingView>

          <View style={{ flexDirection: 'row' }}>
            <Button transparent block onPress={() => this.props.navigation.navigate('/signup')} style={{ flex: 1 }}>
              <Text>Sign up</Text>
            </Button>

            <Button
              transparent
              block
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
  ...PropTypes.withRouting,
};

LoginView.propTypes = {
  ...WrappedLoginView.propTypes,
  ...propTypes,
};

export default WrappedLoginView;
