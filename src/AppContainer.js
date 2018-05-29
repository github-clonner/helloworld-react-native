import React from 'react';

import { SafeAreaView } from 'react-native';

import { Provider } from 'react-redux';

import { Root as NativeBaseRoot, StyleProvider, getTheme } from 'native-base';

import { THEME } from './common/styles';

import App from './App';

import { setupStore } from './common/state';

const store = setupStore();

const AppContainer = () => (
  <Provider store={store}>
    <NativeBaseRoot>
      <StyleProvider style={getTheme(THEME)}>
        <SafeAreaView style={{ flex: 1 }}>
          <App />
        </SafeAreaView>
      </StyleProvider>
    </NativeBaseRoot>
  </Provider>
);

export default AppContainer;
