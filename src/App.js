import React, { Component } from 'react';
import { View, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import * as PropTypes from './common/proptypes';

import * as Logger from './common/logger';

import { COLOR } from './common/styles';

import LandingView from './Auth/LandingView';
import AuthNavigator from './Auth';
import SessionNavigator from './Session';

const withStore = connect((state) => ({
  ready: state.Shared.ready,
  authenticated: state.Auth.authenticated,
  initialized: state.Shared.initialized,
}));

const propTypes = {
  dispatch: PropTypes.dispatch.isRequired,
  ready: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  initialized: PropTypes.bool.isRequired,
};

const Wrapper = (C) => withStore(C);

class App extends Component<{}> {
  componentDidMount() {
    if (SplashScreen) {
      SplashScreen.hide();
    }
  }

  componentDidCatch(error, info) {
    Logger.error(error, info);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: COLOR.background }}>
        <SafeAreaView style={{ flex: 1 }}>
          {(!this.props.ready || (this.props.authenticated && !this.props.initialized)) && <LandingView />}

          {this.props.ready && !this.props.authenticated && <AuthNavigator />}

          {this.props.ready && this.props.authenticated && this.props.initialized && <SessionNavigator />}
        </SafeAreaView>
      </View>
    );
  }
}

const WrappedApp = Wrapper(App);

WrappedApp.propTypes = {};

App.propTypes = {
  ...WrappedApp.propTypes,
  ...propTypes,
};

export default WrappedApp;
