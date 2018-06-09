import { StyleSheet, TextInput } from 'react-native';

// import NativeBaseTheme from '../../native-base-theme/variables/platform';
import NativeBaseTheme from 'native-base/src/theme/variables/platform';

// import { createIconSetFromIcoMoon } from 'react-native-vector-icons';

// import CustomIconsIcoMoonConfig from '../assets/HelloWorldIcons.json';

/**
 * Colors
 */

export const COLOR = {
  background: '#F0F1F6',

  primary: '#607D8B',
  primaryDark: '#455A64',
  accent: '#FFC107',
  inverse: '#FAFAFA',

  success: '#2ECC71',
  error: '#E74C3C',
  info: '#3498DB',
  warning: '#F1C40F',
  off: '#999999',

  text: '#040404',
  textSecondary: '#333333',

  textInverse: '#FAFAFA',
  textSecondaryInverse: '#CCCCCC',

  white: '#FFFFFF',
  black: '#000000',

  debug: 'rgba(0,0,0,0.1)',
};

/**
 * React Native Customization
 */

TextInput.defaultProps.selectionColor = COLOR.accent;

/**
 * NativeBase Theme
 *
 * Refer to following links for variables names:
 *   * https://docs.nativebase.io/docs/ThemeVariables.html
 *   * https://github.com/GeekyAnts/NativeBase/blob/master/src/theme/variables/platform.js
 */

Object.assign(NativeBaseTheme, {
  brandPrimary: COLOR.primary,

  textColor: COLOR.text,
  inverseTextColor: COLOR.textInverse,

  toolbarDefaultBg: COLOR.primary,

  defaultSpinnerColor: COLOR.primary,
  inverseSpinnerColor: COLOR.inverse,

  iosStatusbar: 'light-content',

  listItemSelected: COLOR.primaryDark,
});

export const THEME = {
  ...NativeBaseTheme,
  // getters override...
};

/**
 * Custom Icons
 */

// export const CustomIcon = createIconSetFromIcoMoon(CustomIconsIcoMoonConfig);

// CustomIcon.defaultProps.size = Platform.OS === 'ios' ? 35 : 30;
// CustomIcon.defaultProps.color = COLOR.primary;

/**
 * Common Styles
 */

export const STYLE = StyleSheet.create({
  fit: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  // container: {
  //   backgroundColor: COLOR.background,
  // },
  text: {
    color: COLOR.text,
  },
  textSecondary: {
    color: COLOR.textSecondary,
  },
  textInverse: {
    color: COLOR.textInverse,
  },
});
