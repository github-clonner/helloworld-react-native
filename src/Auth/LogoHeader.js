import React from 'react';

import { View, Image } from 'react-native';

import { STYLE } from '../common/styles';

import * as CustomPropTypes from '../common/proptypes';

import logoImage from '../assets/logo-transparent.png';

const LogoHeader = ({ style }) => (
  <View style={style}>
    {/* <View style={[STYLE.fit, { justifyContent: 'flex-end' }]}>
      // <Image source={headerBackgroundImage} resizeMode="cover" />
    </View> */}

    <View style={[STYLE.fit, { alignItems: 'center', justifyContent: 'center' }]}>
      <Image
        source={logoImage}
        resizeMode="contain"
        style={{
          flex: 1,
          marginTop: 24,
          marginBottom: 24,
          marginLeft: 100,
          marginRight: 100,
        }}
      />
    </View>
  </View>
);

LogoHeader.propTypes = {
  style: CustomPropTypes.style,
};

LogoHeader.defaultProps = {
  style: {},
};

export { LogoHeader };
