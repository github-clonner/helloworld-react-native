import { StyleSheet, TextInput } from 'react-native';

// import NativeBaseTheme from '../../native-base-theme/variables/platform';
import NativeBaseTheme from 'native-base/src/theme/variables/material';

// import { createIconSetFromIcoMoon } from 'react-native-vector-icons';

// import CustomIconsIcoMoonConfig from '../assets/HelloWorldIcons.json';

/**
 * Fonts
 * inspect using https://opentype.js.org/font-inspector.html
 * make sure file name matches full name
 */

// const FONT_REGULAR = 'CustomFont-Regular';
// const FONT_LIGHT = 'CustomFont-Light';
// const FONT_BOLD = 'CustomFont-Bold';

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

// const Text_render = Text.prototype.render;
// const Text_style = { fontFamily: FONT_REGULAR };
// Text.prototype.render = function (...args) {
//   const origin = Text_render.call(this, ...args);
//   return cloneElement(origin, {
//     style: [Text_style, origin.props.style],
//   });
// };

// TextInput.defaultProps.fontFamily = FONT_REGULAR;
TextInput.defaultProps.selectionColor = COLOR.accent;

/**
 * NativeBase Customization
 *
 * Refer to following links for variables names:
 *   * https://docs.nativebase.io/docs/ThemeVariables.html
 *   * https://github.com/GeekyAnts/NativeBase/blob/master/src/theme/variables/platform.js
 */

Object.assign(NativeBaseTheme, {
  brandPrimary: COLOR.primary,

  // fontFamily: FONT_REGULAR,
  // btnFontFamily: FONT_REGULAR,
  // titleFontfamily: FONT_REGULAR,

  textColor: COLOR.text,
  inverseTextColor: COLOR.textInverse,

  // Toolbar

  toolbarDefaultBg: COLOR.primary,

  iosStatusbar: 'light-content',

  // Spinner

  defaultSpinnerColor: COLOR.primary,
  inverseSpinnerColor: COLOR.inverse,

  // ...

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
  // General-purpose styles
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
  text: {
    color: COLOR.text,
  },
  textSecondary: {
    color: COLOR.textSecondary,
  },
  textInverse: {
    color: COLOR.textInverse,
  },

  // Shared styles

  // textRegular: {
  //   fontFamily: FONT_REGULAR,
  // },

  // textLight: {
  //   fontFamily: FONT_LIGHT,
  // },

  // textBold: {
  //   fontFamily: FONT_BOLD,
  // },
});
