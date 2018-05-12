import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, KeyboardAvoidingView } from 'react-native';
import { Container, Content, Button, Spinner, Input, Item, Text, Form } from 'native-base';

import * as CustomPropTypes from '../common/proptypes';

import { COLOR } from '../common/styles';

import { LogoHeader } from './LogoHeader';

import * as Activity from '../common/Activity.state';
import { $signup } from './state';

const withStore = connect(
  (state) => ({
    processing: state.Activity.processing,
  }),
  (dispatch) => ({
    signup(user) {
      dispatch($signup(user)).catch((error) => dispatch(Activity.$toast('failure', error.message)));
    },
  }),
);

// provides shared state and actions as props
const Wrapper = (C) => withStore(C);

class SignupView extends Component {
  state = {
    name: '',
    email: '',
    password: '',
  };

  hasValidInput() {
    return !!this.state.name && !!this.state.email && !!this.state.password;
  }

  signup() {
    if (!this.hasValidInput()) {
      return null;
    }
    return this.props.signup({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    });
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
                  placeholder="Name"
                  value={this.state.name}
                  returnKeyType="next"
                  enablesReturnKeyAutomatically
                  onChangeText={(name) => this.setState({ name })}
                  onSubmitEditing={() => this.$name.wrappedInstance.focus()}
                />
              </Item>

              <View style={{ margin: 4 }} />

              <Item regular>
                <Input
                  ref={(ref) => (this.$name = ref)}
                  style={{ color: COLOR.textInverse }}
                  placeholderTextColor={COLOR.textSecondaryInverse}
                  placeholder="Email"
                  keyboardType="email-address"
                  value={this.state.email}
                  autoCapitalize="none"
                  returnKeyType="next"
                  enablesReturnKeyAutomatically
                  onChangeText={(email) => this.setState({ email })}
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
                  onSubmitEditing={() => this.signup()}
                />
              </Item>

              <View style={{ margin: 4 }} />

              <Button
                style={{ backgroundColor: COLOR.accent }}
                full
                disabled={!this.hasValidInput() || this.props.processing}
                onPress={() => this.signup()}
              >
                <Text>Sign up</Text>
                {this.props.processing && <Spinner size={22} inverse />}
              </Button>
            </Form>
          </KeyboardAvoidingView>

          <View style={{ flexDirection: 'row' }}>
            <Button transparent light full onPress={() => this.props.navigation.navigate('/login')} style={{ flex: 1 }}>
              <Text>Log in</Text>
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

const SignupViewView = Wrapper(SignupView);

SignupViewView.propTypes = {
  navigation: CustomPropTypes.navigation.isRequired,
};

SignupView.propTypes = {
  ...SignupViewView.propTypes,
};

export { SignupView };
export default SignupViewView;
