import React from 'react';

import { View, Image } from 'react-native';

import { STYLE } from '../common/styles';

import * as PropTypes from '../common/proptypes';

import logoImage from '../../assets/logo.png';

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
          margin: 24,
          maxWidth: 140,
        }}
      />
    </View>
  </View>
);

LogoHeader.propTypes = {
  style: PropTypes.style,
};

LogoHeader.defaultProps = {
  style: {},
};

export { LogoHeader };
