import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import EventDetailsScreen from './src/screens/EventDetailsScreen';
import ProfileScreen from './src/screens/ProfileScreen';

import { FavouritesProvider } from './src/context/FavouritesContext';
import { LanguageProvider } from './src/context/LanguageContext';
import AppHeader from './src/components/AppHeader';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <LanguageProvider>
        <FavouritesProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Splash"
              screenOptions={{
                header: props => <AppHeader {...props} />,
              }}
            >
              <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Signup"
                component={SignupScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'City Pulse' }}
              />
              <Stack.Screen
                name="EventDetails"
                component={EventDetailsScreen}
                options={{ title: 'Event Details' }}
              />
              <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: 'Profile' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </FavouritesProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}

export default App;
