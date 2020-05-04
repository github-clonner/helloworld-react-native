/* eslint-env jest */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import '../jest.setup';

import AppContainer from '../src';

it('renders correctly', () => {
  const tree = renderer.create(<AppContainer />).toJSON();
  expect(tree).toMatchSnapshot();
});
