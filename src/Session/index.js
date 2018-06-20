import React from 'react';

import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import NavigationMenu from './NavigationMenu';

import HomeNavigator from '../Home';
import ProfileView from './ProfileView';
import AboutView from './AboutView';

const MainStack = createDrawerNavigator(
  {
    '/home': { screen: HomeNavigator },
    '/profile': { screen: ProfileView },
    '/about': { screen: AboutView },
  },
  {
    contentComponent: NavigationMenu,
    initialRouteName: '/home',
  },
);

const RootStack = createStackNavigator(
  {
    '/main': { screen: MainStack },
    '/modal': {
      screen: (props) => {
        return props.navigation.state.params.render ? props.navigation.state.params.render(props) : null;
      },
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    initialRouteName: '/main',
  },
);

export default RootStack;
