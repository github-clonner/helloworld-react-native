import React from 'react';
import { Container, Header, Content, Spinner } from 'native-base';

import { View } from 'react-native';

import { COLOR } from '../common/styles';

import { LogoHeader } from './LogoHeader';

const LandingView = () => (
  <Container>
    <Header noShadow style={{ height: 0 }} />
    <Content scrollEnabled={false} contentContainerStyle={{ flex: 1, backgroundColor: COLOR.primary }}>
      <LogoHeader style={{ flex: 2 }} />

      <View style={{ flex: 1, alignContent: 'center', justifyContent: 'flex-start' }}>
        <Spinner color={COLOR.accent} size="large" style={{ margin: 16 }} />
      </View>
    </Content>
  </Container>
);

export default LandingView;
