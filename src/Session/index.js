import { DrawerNavigator } from 'react-navigation';

import NavigationMenu from './NavigationMenu';

import HomeView from '../Home/HomeView';
import ProfileView from './ProfileView';
import AboutView from './AboutView';

const SessionRouter = DrawerNavigator(
  {
    '/home': { screen: HomeView },
    '/profile': { screen: ProfileView },
    '/about': { screen: AboutView },
  },
  {
    contentComponent: NavigationMenu,
    initialRouteName: '/home',
  },
);

export default SessionRouter;
