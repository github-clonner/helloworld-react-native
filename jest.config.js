module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: ['node_modules/?!(react-native|native-base)'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  },
};
