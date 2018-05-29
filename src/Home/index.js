import { createStackNavigator } from 'react-navigation';

import HomeView from '../Home/HomeView';

const HomeRouter = createStackNavigator(
  {
    '/': { screen: HomeView },
  },
  {
    initialRouteName: '/',
    headerMode: 'none',
  },
);

export default HomeRouter;
