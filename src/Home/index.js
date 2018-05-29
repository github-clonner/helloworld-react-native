import { createStackNavigator } from 'react-navigation';

import HomeView from '../Home/HomeView';

const SessionRouter = createStackNavigator(
  {
    '/': { screen: HomeView },
  },
  {
    initialRouteName: '/',
    headerMode: 'none',
  },
);

export default SessionRouter;
