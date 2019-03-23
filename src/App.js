import React, { Component } from 'react';
import { View, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import { createAppContainer } from 'react-navigation';

import * as PropTypes from './common/proptypes';

import * as Logger from './common/logger';

import { COLOR } from './common/styles';

import LandingView from './Entrance/LandingView';
import EntranceNavigator from './Entrance';
import SessionNavigator from './Session';

const EntranceNavigatorContainer = createAppContainer(EntranceNavigator);
const SessionNavigatorContainer = createAppContainer(SessionNavigator);

const withStore = connect((state) => ({
  appReady: state.Shared.appReady,
  sessionReady: state.Shared.sessionReady,
  authenticated: state.Auth.authenticated,
}));

const propTypes = {
  dispatch: PropTypes.dispatch.isRequired,
  appReady: PropTypes.bool.isRequired,
  sessionReady: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
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
    const { appReady, sessionReady, authenticated } = this.props;

    if (!appReady || (authenticated && !sessionReady)) {
      return <LandingView />;
    }

    return (
      <View style={{ flex: 1, backgroundColor: COLOR.background }}>
        <SafeAreaView style={{ flex: 1 }}>
          {authenticated ? <SessionNavigatorContainer /> : <EntranceNavigatorContainer />}
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
