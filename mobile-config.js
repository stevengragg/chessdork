// This section sets up some basic app metadata, the entire section is optional.
App.info({
    id: 'com.example.matt.uber',
    name: 'chessdork',
    description: 'blablaba',
    author: 'Gabriel Cebria',
    email: 'gabceboli@gmail.com',
    website: 'https://chessdork.com'
  });
  
//   App.appendToConfig(`
// <platform name="ios">
//   <resource-file target="GoogleService-Info.plist" src="../../../cordova-build-override/GoogleService-Info.plist"/>
// </platform>
// `)
//   // Set up resources such as icons and launch screens.
//   App.icons({
//     'iphone_2x': 'icons/icon-60@2x.png',
//     'iphone_3x': 'icons/icon-60@3x.png',
//     // More screen sizes and platforms...
//   });
  
//   App.launchScreens({
//     'iphone_2x': 'splash/Default@2x~iphone.png',
//     'iphone5': 'splash/Default~iphone5.png',
//     // More screen sizes and platforms...
//   });
  
  // Set PhoneGap/Cordova preferences.
  App.setPreference('BackgroundColor', '0xff0000ff');
  App.setPreference('HideKeyboardFormAccessoryBar', true);
  App.setPreference('Orientation', 'default');
  App.setPreference('Orientation', 'all', 'ios');
  
  
  // Add custom tags for a particular PhoneGap/Cordova plugin to the end of the
  // generated config.xml. 'Universal Links' is shown as an example here.
  App.appendToConfig(`
    <universal-links>
      <host name="localhost:3000" />
    </universal-links>
  `);
  App.configurePlugin('cordova-plugin-googleplus', {
    REVERSED_CLIENT_ID: 'com.googleusercontent.apps.338333385443-bv5fsb2jepbq003p1cq2u3p0cthflphn'
});
