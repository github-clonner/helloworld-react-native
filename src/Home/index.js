import { createStackNavigator } from 'react-navigation';

import HomeView from './HomeView';

export default createStackNavigator(
  {
    '/home/main': { screen: HomeView },
  },
  {
    headerMode: 'none',
    initialRouteName: '/home/main',
  },
);
