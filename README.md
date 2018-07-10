# ALVB React Native Starter

A boilerplate and reference implementation for mobile applications built with React, Redux, and React Native.

## Preview

- [Android](https://appetize.io/app/3xvgukkq4gqjyjn1ztrzq6czwr?device=nexus5&scale=75&orientation=portrait&osVersion=7.1)
- [iOS](https://appetize.io/app/nkn34mhpchnx172e67ptmjypdm?device=iphone6s&scale=75&orientation=portrait&osVersion=11.1)

## References

- [API Specifications/Documentation](https://starterspecapi.docs.apiary.io/)
- [Documentation](./docs)
- [Guidelines](https://github.com/astalavistababy/alvb-docs/)

## Technology

- [React](https://reactjs.org/) + [Redux](https://redux.js.org/) + [React Native](https://facebook.github.io/react-native/)
- [NativeBase](https://nativebase.io/)
- [React Navigation](https://reactnavigation.org/)

## Requirements

- [Node.js v8+](https://nodejs.org/) + [Yarn](https://yarnpkg.com/)
- [React Native CLI](https://www.npmjs.com/package/react-native-cli) (`npm -g install react-native-cli`)
- [CocoaPods](https://cocoapods.org/) (`gem install cocoapods`)
- [xcpretty](https://github.com/supermarin/xcpretty) (`gem install xcpretty`)
- [Bash v4](http://tldp.org/LDP/abs/html/bashver4.html) (default on GNU/Linux, `brew install bash` on macOS)

## Usage

```sh
# install dependencies
yarn install

# run bundler
yarn start

# run on Android device/emulator
yarn android

# run on iOS device/simulator
(cd ios ; pod install)
yarn ios

# run tests
yarn test

# lint code for critical issues
yarn lint:critical

# lint code
yarn lint

# format code
yarn format
```

## Debugging

From DevTools

```javascript
// use logger
Logger.debug('Hello World!');

// check if there is an authenticated session
AuthService.isAuthenticated();

// get state from Redux store
$store.getState().MyModule.myField;

// dispatch action from Redux store
$store.dispatch($state.MyModule.$myAction(/* args */));
```

## Using the Template

Assuming target application with following properties:

- code name is `MyApp`
- display name is `My App`
- pacakge id is `com.myapp.client`

1.  Initialize your application `react-native init`

    ```sh
    react-native init MyApp --skip-jest --template 'https://github.com/astalavistababy/alvb-starter-react-native'
    ```

1.  Run post-init routine

    ```sh
    cd ./MyApp
    ./postinit.sh 'MyApp' 'My App' 'com.myapp.client'
    ```

1.  Make sure to replace placeholders (look for `@@`) with appropriate values
