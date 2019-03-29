import { createStackNavigator } from 'react-navigation';

import LoginView from './LoginView';
import SignupView from './SignupView';
import PasswordResetView from './PasswordResetView';

export default createStackNavigator(
  {
    '/login': { screen: LoginView },
    '/signup': { screen: SignupView },
    '/password-reset': { screen: PasswordResetView },
  },
  {
    initialRouteName: '/login',
    headerMode: 'none',
  },
);
