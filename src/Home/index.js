import { createStackNavigator } from 'react-navigation';

import HomeView from './HomeView';

export default createStackNavigator(
  {
    '/': { screen: HomeView },
  },
  {
    initialRouteName: '/',
    headerMode: 'none',
  },
);
