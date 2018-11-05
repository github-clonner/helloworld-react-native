import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, KeyboardAvoidingView } from 'react-native';
import {
  Container, Header, Content, Button, Spinner, Input, Item, Text, Form,
} from 'native-base';

import * as PropTypes from '../common/proptypes';

import { COLOR } from '../common/styles';

import { LogoHeader } from './LogoHeader';

import * as Activity from '../Shared/Activity.state';
import { $initiatePasswordReset } from '../Auth/state';

const withStore = connect((state) => ({
  processing: state.Activity.processingByTopic['Auth.$initiatePasswordReset'] || false,
}));

const propTypes = {
  dispatch: PropTypes.dispatch.isRequired,
  processing: PropTypes.bool.isRequired,
};

const Wrapper = (C) => withStore(C);

class PasswordResetView extends Component {
  state = {
    email: '',
  };

  hasValidInput() {
    return !!this.state.email;
  }

  initiatePasswordReset() {
    if (!this.hasValidInput()) {
      return null;
    }

    return this.props
      .dispatch($initiatePasswordReset(this.state.email))
      .catch((error) => this.props.dispatch(Activity.$toast('failure', error.message)));
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
                  value={this.state.email}
                  autoCapitalize="none"
                  returnKeyType="send"
                  enablesReturnKeyAutomatically
                  onChangeText={(email) => this.setState({ email })}
                  onSubmitEditing={() => this.initiatePasswordReset()}
                />
              </Item>

              <View style={{ margin: 4 }} />

              <Button
                full
                primary
                active={!this.hasValidInput() || this.props.processing}
                onPress={() => this.initiatePasswordReset()}
              >
                <Text>Recover my Account</Text>
                {this.props.processing && <Spinner size="small" inverse />}
              </Button>
            </Form>
          </KeyboardAvoidingView>

          <View style={{ flexDirection: 'row' }}>
            <Button transparent full onPress={() => this.props.navigation.navigate('/login')} style={{ flex: 1 }}>
              <Text>Log in</Text>
            </Button>

            <Button transparent full onPress={() => this.props.navigation.navigate('/signup')} style={{ flex: 1 }}>
              <Text>Sign up</Text>
            </Button>
          </View>

          <View style={{ margin: 4 }} />
        </Content>
      </Container>
    );
  }
}

const WrappedPasswordResetView = Wrapper(PasswordResetView);

WrappedPasswordResetView.propTypes = {
  navigation: PropTypes.navigation.isRequired,
};

PasswordResetView.propTypes = {
  ...WrappedPasswordResetView.propTypes,
  ...propTypes,
};

export default WrappedPasswordResetView;
