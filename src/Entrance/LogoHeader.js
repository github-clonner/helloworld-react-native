import React from 'react';

import { View, Image } from 'react-native';

import { STYLE } from '../common/styles';

import * as PropTypes from '../common/proptypes';

const LogoHeader = ({ style, logoStyle }) => (
  <View style={style}>
    {/* <View style={[STYLE.fit, { justifyContent: 'flex-end' }]}>
      // <Image source={HeaderBackgroundImage} resizeMode="cover" />
    </View> */}

    <View style={[STYLE.fit, { alignItems: 'center', justifyContent: 'center' }]}>
      <Image
        source={{ uri: 'logo' }}
        _resizeMode="contain"
        style={[
          {
            // flex: 1,
            margin: 24,
            width: 140,
            height: 140,
          },
          logoStyle,
        ]}
      />
    </View>
  </View>
);

LogoHeader.propTypes = {
  style: PropTypes.style,
  logoStyle: PropTypes.style,
};

LogoHeader.defaultProps = {
  style: {},
  logoStyle: {},
};

export { LogoHeader };
