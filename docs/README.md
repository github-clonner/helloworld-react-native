# Documentation

## Native Image Assets

`./scripts/generate-all-image-assets.sh` generates native image assets.

Customize it according to your needs then run it.

**Requirements**

* [Inkscape](https://inkscape.org)
* [ImageMagick](https://www.imagemagick.org/)

## Debug Build

### Android

Run `./scripts/build-android-debug.sh` to build debug .apk

### iOS

Run `./scripts/build-ios-debug.sh` to build debug .app

## Release Build

### Android

1. Make sure there is a keystore under `./android/app/`

   ```sh
   keytool -genkey -v -keystore ./android/app/helloworld.keystore -alias helloworld -keyalg RSA -keysize 2048 -validity 10000
   ```

1. Define keystore parameters as environment variables

    * `RELEASE_KEYSTORE_FILE`: keystore file name
    * `RELEASE_KEYSTORE_PASSWORD`: keystore password
    * `RELEASE_KEYSTORE_KEY_ALIAS`: keystore alias
    * `RELEASE_KEYSTORE_KEY_PASSWORD`: keystore alias password

    ```sh
    export \
      RELEASE_KEYSTORE_FILE=helloworld.keystore \
      RELEASE_KEYSTORE_PASSWORD=helloworldpass \
      RELEASE_KEYSTORE_KEY_ALIAS=helloworld \
      RELEASE_KEYSTORE_KEY_PASSWORD=helloworldpass \
    ;
    ```

1. Run `./scripts/build-android-release.sh` to build release .apk

### iOS

1. Make sure signing credentials are provided
1. Run Xcode and configure signing
1. Run `./scripts/build-ios-release.sh` to build release .app
