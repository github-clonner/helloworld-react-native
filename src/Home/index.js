import { createStackNavigator } from 'react-navigation';

import HomeView from '../Home/HomeView';

export default createStackNavigator(
  {
    '/': { screen: HomeView },
  },
  {
    initialRouteName: '/',
    headerMode: 'none',
  },
);
