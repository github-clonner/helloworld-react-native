import React, { Component } from 'react';
import { View, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import * as PropTypes from './common/proptypes';

import * as Logger from './common/logger';

import { STYLE, COLOR } from './common/styles';

import LandingView from './Entrance/LandingView';
import Entrance from './Entrance';
import Session from './Session';

const withStore = connect((state) => ({
  appReady: state.Shared.appReady,
  sessionReady: state.Shared.sessionReady,
  authenticated: state.Auth.authenticated,
}));

const propTypes = {
  ...PropTypes.withState,
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
        <SafeAreaView style={STYLE.flex}>{authenticated ? <Session /> : <Entrance />}</SafeAreaView>
      </View>
    );
  }
}

App.propTypes = propTypes;

export default Wrapper(App);
