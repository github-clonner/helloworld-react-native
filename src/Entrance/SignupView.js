import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import {
  Container, Header, Content, Button, Spinner, Input, Item, Text, Form,
} from 'native-base';

import * as PropTypes from '../common/proptypes';

import { STYLE } from '../common/styles';

import { LogoHeader } from './LogoHeader';

import * as Dialog from '../Shared/Dialog';

import { $signup } from '../Auth/state';

const withStore = connect((state) => ({
  processing: state.Activity.processingByOperation[$signup.OPERATION] || false,
}));

const propTypes = {
  ...PropTypes.withRouting,
  ...PropTypes.withState,
  processing: PropTypes.bool.isRequired,
};

const Wrapper = (C) => withStore(C);

const styles = StyleSheet.create({
  header: {
    height: 0,
  },
  header_logo: {
    flex: 1,
    minHeight: 'auto',
  },
});

class SignupView extends Component {
  state = {
    name: '',
    email: '',
    password: '',
  };

  $name = React.createRef();

  $password = React.createRef();

  hasValidInput() {
    return !!this.state.name && !!this.state.email && !!this.state.password;
  }

  signup() {
    if (!this.hasValidInput()) {
      return null;
    }

    const { dispatch } = this.props;

    return dispatch(
      $signup({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      }),
    ).catch((error) => Dialog.toast(Dialog.FAILURE, error.message));
  }

  render() {
    return (
      <Container>
        <Header noShadow style={styles.header} />
        <Content scrollEnabled={false} contentContainerStyle={STYLE.flex_grow}>
          <LogoHeader style={styles.header_logo} />

          <KeyboardAvoidingView>
            <Form style={STYLE.padding_16}>
              <Item regular>
                <Input
                  placeholder="Name"
                  value={this.state.name}
                  returnKeyType="next"
                  enablesReturnKeyAutomatically
                  onChangeText={(name) => this.setState({ name })}
                  onSubmitEditing={() => this.$name.current.wrappedInstance.focus()}
                />
              </Item>

              <View style={STYLE.margin_4} />

              <Item regular>
                <Input
                  ref={this.$name}
                  placeholder="Email"
                  keyboardType="email-address"
                  value={this.state.email}
                  autoCapitalize="none"
                  returnKeyType="next"
                  enablesReturnKeyAutomatically
                  onChangeText={(email) => this.setState({ email })}
                  onSubmitEditing={() => this.$password.current.wrappedInstance.focus()}
                />
              </Item>

              <View style={STYLE.margin_4} />

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
                  onSubmitEditing={() => this.signup()}
                />
              </Item>

              <View style={STYLE.margin_4} />

              <Button
                full
                primary
                active={!this.hasValidInput() || this.props.processing}
                onPress={() => this.signup()}
              >
                <Text>Sign up</Text>
                {this.props.processing && <Spinner size="small" inverse />}
              </Button>
            </Form>
          </KeyboardAvoidingView>

          <View style={STYLE.flex_row}>
            <Button transparent full onPress={() => this.props.navigation.navigate('/login')} style={STYLE.flex}>
              <Text>Log in</Text>
            </Button>

            <Button
              transparent
              full
              onPress={() => this.props.navigation.navigate('/password-reset')}
              style={STYLE.flex}
            >
              <Text>Recover</Text>
            </Button>
          </View>

          <View style={STYLE.margin_4} />
        </Content>
      </Container>
    );
  }
}

SignupView.propTypes = propTypes;

export default Wrapper(SignupView);
