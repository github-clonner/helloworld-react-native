import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, KeyboardAvoidingView } from 'react-native';
import { Container, Content, Button, Spinner, Input, Item, Text, Form } from 'native-base';

import * as CustomPropTypes from '../common/proptypes';

import { COLOR } from '../common/styles';

import { LogoHeader } from './LogoHeader';

import * as Activity from '../common/Activity.state';
import { $initiateAccountRecovery } from './state';

const withStore = connect(
  (state) => ({
    processing: state.Activity.processing,
  }),
  (dispatch) => ({
    initiateAccountRecovery(email) {
      dispatch($initiateAccountRecovery(email)).catch((error) => dispatch(Activity.$toast('failure', error.message)));
    },
  }),
);

// provides shared state and actions as props
const Wrapper = (C) => withStore(C);

class RecoveryViewView extends Component {
  state = {
    email: '',
  };

  hasValidInput() {
    return !!this.state.email;
  }

  initiateAccountRecovery() {
    if (!this.hasValidInput()) {
      return null;
    }
    return this.props.initiateAccountRecovery(this.state.email);
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
                  value={this.state.email}
                  autoCapitalize="none"
                  returnKeyType="send"
                  enablesReturnKeyAutomatically
                  onChangeText={(email) => this.setState({ email })}
                  onSubmitEditing={() => this.initiateAccountRecovery()}
                />
              </Item>

              <View style={{ margin: 4 }} />

              <Button
                style={{ backgroundColor: COLOR.accent }}
                full
                disabled={!this.hasValidInput() || this.props.processing}
                onPress={() => this.initiateAccountRecovery()}
              >
                <Text>Recover my Account</Text>
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
              onPress={() => this.props.navigation.navigate('/signup')}
              style={{ flex: 1 }}
            >
              <Text>Sign up</Text>
            </Button>
          </View>

          <View style={{ margin: 4 }} />
        </Content>
      </Container>
    );
  }
}

const WrappedRecoveryViewView = Wrapper(RecoveryViewView);

WrappedRecoveryViewView.propTypes = {
  navigation: CustomPropTypes.navigation.isRequired,
};

RecoveryViewView.propTypes = {
  ...WrappedRecoveryViewView.propTypes,
};

export { RecoveryViewView };
export default WrappedRecoveryViewView;
