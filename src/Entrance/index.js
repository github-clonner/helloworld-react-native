import { createAppContainer, createStackNavigator } from 'react-navigation';

import DebugView from '../Shared/DebugView';

import LoginView from './LoginView';
import SignupView from './SignupView';
import PasswordResetView from './PasswordResetView';

export default createAppContainer(
  createStackNavigator(
    {
      '/debug': { screen: DebugView },
      '/login': { screen: LoginView },
      '/signup': { screen: SignupView },
      '/password-reset': { screen: PasswordResetView },
    },
    {
      initialRouteName: '/login',
      headerMode: 'none',
    },
  ),
);
