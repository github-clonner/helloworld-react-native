import React from 'react';
import { Container, Content, Spinner } from 'native-base';

import { View } from 'react-native';

import { COLOR } from '../common/styles';

import { LogoHeader } from './LogoHeader';

const LandingView = () => (
  <Container>
    <Content scrollEnabled={false} contentContainerStyle={{ flex: 1, backgroundColor: COLOR.primary }}>
      <LogoHeader style={{ flex: 1 }} />

      <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
        <Spinner color={COLOR.accent} size="large" style={{ margin: 16 }} />
      </View>
    </Content>
  </Container>
);

export default LandingView;
