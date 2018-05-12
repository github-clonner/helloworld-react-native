import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, KeyboardAvoidingView } from 'react-native';
import { Container, Content, Button, Spinner, Input, Item, Text, Form } from 'native-base';

import * as CustomPropTypes from '../common/proptypes';

import { COLOR } from '../common/styles';

import { LogoHeader } from './LogoHeader';

import * as Activity from '../common/Activity.state';
import { $login } from './state';

const withStore = connect(
  (state) => ({
    processing: state.Activity.processing,
  }),
  (dispatch) => ({
    login(username, password) {
      dispatch($login(username, password)).catch((error) => dispatch(Activity.$toast('failure', error.message)));
    },
  }),
);

// provides shared state and actions as props
const Wrapper = (C) => withStore(C);

class LoginView extends Component {
  state = {
    username: process.env.NODE_ENV === '_development' ? 'test@example.com' : '',
    password: process.env.NODE_ENV === '_development' ? 'test' : '',
  };

  hasValidInput() {
    return !!this.state.username && !!this.state.password;
  }

  login() {
    if (!this.hasValidInput()) {
      return null;
    }
    return this.props.login(this.state.username, this.state.password);
  }

  render() {
    return (
      <Container>
        <Content scrollEnabled={false} contentContainerStyle={{ flex: 1, backgroundColor: COLOR.primary }}>
          <LogoHeader style={{ flex: 1, minHeight: 'auto' }} />

          <KeyboardAvoidingView>
            <Form
              style={{
                padding: 16,
              }}
            >
              <Item regular>
                <Input
                  style={{ color: COLOR.textInverse }}
                  placeholderTextColor={COLOR.textSecondaryInverse}
                  placeholder="Email"
                  keyboardType="email-address"
                  value={this.state.username}
                  autoCapitalize="none"
                  returnKeyType="next"
                  enablesReturnKeyAutomatically
                  onChangeText={(username) => this.setState({ username })}
                  onSubmitEditing={() => this.$password.wrappedInstance.focus()}
                />
              </Item>

              <View style={{ margin: 4 }} />

              <Item regular>
                <Input
                  ref={(ref) => (this.$password = ref)}
                  style={{ color: COLOR.textInverse }}
                  placeholderTextColor={COLOR.textSecondaryInverse}
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

              <Button
                style={{ backgroundColor: COLOR.accent }}
                full
                disabled={!this.hasValidInput() || this.props.processing}
                onPress={() => this.login()}
              >
                <Text>Log in</Text>
                {this.props.processing && <Spinner size={22} inverse />}
              </Button>
            </Form>
          </KeyboardAvoidingView>

          <View style={{ flexDirection: 'row' }}>
            <Button
              transparent
              light
              full
              onPress={() => this.props.navigation.navigate('/signup')}
              style={{ flex: 1 }}
            >
              <Text>Sign up</Text>
            </Button>

            <Button
              transparent
              light
              full
              onPress={() => this.props.navigation.navigate('/recovery')}
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
  navigation: CustomPropTypes.navigation.isRequired,
};

LoginView.propTypes = {
  ...WrappedLoginView.propTypes,
};

export { LoginView };
export default WrappedLoginView;
