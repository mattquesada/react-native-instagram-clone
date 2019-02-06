# react-native-instagram-clone
Instagram clone built with react-native and sqlite3. Brought to you by the White Tigers.

## Installation

1. Install node.js: https://nodejs.org/en/.

2. In your terminal, run the command ```npm install -g react-native-cli```.

3. Clone this repository to your local machine.

4. Navigate to the root directory containing ```package.json``` and run ```npm install```.

5. Run the command ```react-native start``` to initiate the Metro Bundler.

### Android

1. Plug in your Android device or launch the Android Debugger from Android Studio. To verify that you have a valid device integrated, run the command `adb devices` to display all connected devices.

2. Import the `android` subfolder located inside the main directory into Android Studio to sync Gradle files. 

3. In order to gather the dependencies needed for react-native-sqlite-storage, modify the `build.gradle` file for react-native-sqlite-storage by changing the line `compile 'com.facebook.react:react-native:0.14.+'` to `implementation 'com.facebook.react:react-native:0.58.+'`. 

4. Re-sync gradle files build the project manually in Android Studio.

2. Run the command ```react-native run-android``` in your terminal to build the app and load to your device or debugger. 

3. The debugging interface is available with ```react-native log-android```.

### iOS (work-in-progress)

1. Plug in your iOS device or launch an iOS emulator. 

2. Run the command ```react-native run-ios```.
