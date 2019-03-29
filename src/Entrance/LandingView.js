import React from 'react';
import {
  Container, Header, Content, Spinner,
} from 'native-base';

import { View } from 'react-native';

import { STYLE } from '../common/styles';

import { LogoHeader } from './LogoHeader';

const LandingView = () => (
  <Container>
    <Header noShadow style={{ height: 0 }} />
    <Content scrollEnabled={false} contentContainerStyle={STYLE.flexGrow}>
      <LogoHeader style={STYLE.flex} logoStyle={{ margin: 0, marginBottom: 24 }} />

      <View style={{ position: 'absolute', height: '100%', width: '100%' }}>
        <View style={STYLE.flex} />
        <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
          <Spinner size="large" style={{ margin: 16 }} />
        </View>
      </View>
    </Content>
  </Container>
);

export default LandingView;
