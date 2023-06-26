
# Meal Tracker App

## Overview

The app allows you to create custom meals and define their nutrition. After which, you can add the meals with the consumed quantity to track your calorie and nutrition. You can set your goals as well as see generate reports to see your avergage nutrition and calorie intake.

# To create an expo app

1. Install the Expo CLI globally by running the command:
```
npm install -g expo-cli
```

2. Initialize a new Expo project by running the command:
```
expo init <app-name>
```

# To start the app using Expo Go

1. Install the dependencies:
```
npm i
```

2. Start the Expo development server by running the command:
```
expo start
```

3. Install the Expo Go app on your mobile device.

4. Launch the Expo Go app on your mobile device and scan the QR code displayed in the Expo DevTools.

## Building the APK

1. Install the EAS CLI globally by running the command:
```
npm install -g eas-cli
```

2. Run the following commands:
```
eas login
eas build:configure
eas build -p android --profile preview
```

3. After the build is complete, scan the QR code displayed.

4. Click the 'install' button. Then choose to open with Chrome. This will download the APK file.

