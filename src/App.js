import React, { Component, Fragment } from 'react';
import { SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import * as Logger from './common/logger';

import LandingView from './Auth/LandingView';
import AuthRouter from './Auth';
import SessionRouter from './Session';

const withStore = connect((state) => ({
  ready: state.Shared.ready,
  authenticated: state.Auth.authenticated,
  initialized: state.Shared.initialized,
}));

// provides shared state and actions as props;
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
      <SafeAreaView style={{ flex: 1 }}>
        {(!this.props.ready || (this.props.authenticated && !this.props.initialized)) && <LandingView />}

        {this.props.ready && !this.props.authenticated && <AuthRouter />}

        {this.props.ready && this.props.authenticated && this.props.initialized && <SessionRouter />}
      </SafeAreaView>
    );
  }
}

const WrappedApp = Wrapper(App);

WrappedApp.propTypes = {};

App.propTypes = {
  ...WrappedApp.propTypes,
  ready: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  initialized: PropTypes.bool.isRequired,
};

export default WrappedApp;
