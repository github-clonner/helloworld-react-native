/* eslint-env jest */

jest.mock('react-navigation', () => {
  return {
    createAppContainer: jest.fn().mockReturnValue((props) => {
      return null;
    }),
    createDrawerNavigator: jest.fn(),
    createMaterialTopTabNavigator: jest.fn(),
    createStackNavigator: jest.fn(),
    StackActions: {
      push: jest.fn().mockImplementation((x) => ({ ...x, type: 'Navigation/PUSH' })),
      replace: jest.fn().mockImplementation((x) => ({ ...x, type: 'Navigation/REPLACE' })),
    },
    NavigationActions: {
      navigate: jest.fn().mockImplementation((x) => x),
    },
  };
});

jest.mock('NativeModules', () => ({
  UIManager: {
    RCTView: () => {},
  },
  RNGestureHandlerModule: {
    attachGestureHandler: jest.fn(),
    createGestureHandler: jest.fn(),
    dropGestureHandler: jest.fn(),
    updateGestureHandler: jest.fn(),
    State: {},
    Directions: {},
  },
}));
