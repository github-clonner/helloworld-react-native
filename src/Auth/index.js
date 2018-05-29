import { createSwitchNavigator } from 'react-navigation';

import WelcomeView from './WelcomeView';
import LoginView from './LoginView';
import SignupView from './SignupView';
import RecoveryView from './RecoveryView';

const AuthRouter = createSwitchNavigator(
  {
    '/welcome': { screen: WelcomeView },
    '/login': { screen: LoginView },
    '/signup': { screen: SignupView },
    '/recovery': { screen: RecoveryView },
  },
  {
    initialRouteName: '/login',
    backBehavior: 'initialRoute',
  },
);

export default AuthRouter;
