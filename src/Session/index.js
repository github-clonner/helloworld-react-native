import { createDrawerNavigator } from 'react-navigation';

import NavigationMenu from './NavigationMenu';

import HomeRouter from '../Home';
import ProfileView from './ProfileView';
import AboutView from './AboutView';

export default createDrawerNavigator(
  {
    '/home': { screen: HomeRouter },
    '/profile': { screen: ProfileView },
    '/about': { screen: AboutView },
  },
  {
    contentComponent: NavigationMenu,
    initialRouteName: '/home',
  },
);
