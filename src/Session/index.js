import { createAppContainer, createStackNavigator, createDrawerNavigator } from 'react-navigation';

import NavigationMenu from './NavigationMenu';

import DebugView from '../Shared/DebugView';
import DraftView from '../Shared/DraftView';

import HomeNavigator from '../Home';
import ProfileView from './ProfileView';
import AboutView from './AboutView';

const extra = process.env.NODE_ENV === 'development'
  ? {
    '/debug': { screen: DebugView },
    '/draft': { screen: DraftView },
  }
  : {};

const MainStack = createDrawerNavigator(
  {
    ...extra,
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
    transparentCard: true,
  },
);

export default createAppContainer(RootStack);
