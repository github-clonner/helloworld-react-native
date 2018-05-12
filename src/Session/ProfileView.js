import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Spinner,
  Text,
  Icon,
  Label,
  Button,
  Card,
  CardItem,
  Thumbnail,
} from 'native-base';

import { View } from 'react-native';

import { COLOR } from '../common/styles';

import * as Activity from '../common/Activity.state';

// import { $fetchProfile } from '../Auth/state';

const withStore = connect(
  (state) => ({
    processing: state.Activity.processing,
    user: state.Auth.user,
  }),
  (dispatch) => ({ dispatch }),
);

// provides shared state and actions as props
const Wrapper = (C) => withStore(C);

class ProfileView extends Component {
  componentDidMount() {
    // this.props
    //   .dispatch($fetchProfile())
    //   .catch((error) => this.props.dispatch(Activity.$toast('failure', error.message)));
  }

  render() {
    const { user, processing } = this.props;

    return (
      <Container>
        <Header style={{ height: 200 }}>
          <Left style={{ flex: 0, alignSelf: 'flex-start' }}>
            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <View
              style={{
                alignSelf: 'stretch',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 8,
              }}
            >
              <Thumbnail large resizeMode="cover" source={{ uri: user.picture }} />
              <Text style={{ marginTop: 10, color: COLOR.inverse }}>{user.name}</Text>
            </View>
          </Body>
          <Right style={{ flex: 0, alignSelf: 'flex-start' }}>
            <Spinner size={22} inverse hidesWhenStopped animating={processing} style={{ margin: 4, maxHeight: 36 }} />
          </Right>
        </Header>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLOR.white,
          }}
        >
          <Card
            transparent
            style={{
              marginLeft: 36,
              marginRight: 36,
              borderBottomWidth: 0,
              borderTopWidth: 0,
              borderRightWidth: 0,
              borderLeftWidth: 0,
            }}
          >
            <CardItem>
              <Body>
                <Label style={{ fontSize: 16 }}>Email</Label>
                <Text style={{ fontSize: 16 }}>{user.email}</Text>
              </Body>
              {/* {user.emailVerified ? (
                <Icon name="ios-checkmark-circle-outline" style={{ color: 'green' }} />
              ) : (
                <Icon name="ios-checkmark-circle-outline" style={{ color: 'gray' }} />
              )} */}
            </CardItem>
          </Card>
        </View>
      </Container>
    );
  }
}

const WrappedProfileView = Wrapper(ProfileView);

ProfileView.propTypes = {
  processing: PropTypes.bool,
  user: PropTypes.object,
  dispatch: PropTypes.func,
};

ProfileView.defaultProps = {
  processing: true,
  user: {},
  dispatch: () => {},
};

export default Wrapper(WrappedProfileView);
