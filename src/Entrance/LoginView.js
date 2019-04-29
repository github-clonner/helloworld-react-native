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

import { $login } from '../Auth/state';

const withStore = connect((state) => ({
  processing: state.Activity.processingByOperation[$login.OPERATION] || false,
}));

const propTypes = {
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
        <Header noShadow style={styles.header} />
        <Content scrollEnabled={false} contentContainerStyle={STYLE.flex_grow}>
          <LogoHeader style={styles.header_logo} />

          <KeyboardAvoidingView>
            <Form style={STYLE.padding_16}>
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

              <View style={STYLE.margin_4} />

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

              <View style={STYLE.margin_4} />

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

          <View style={STYLE.flex_row}>
            <Button transparent block onPress={() => this.props.navigation.navigate('/signup')} style={STYLE.flex}>
              <Text>Sign up</Text>
            </Button>

            <Button
              transparent
              block
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

LoginView.propTypes = propTypes;

export default Wrapper(LoginView);
