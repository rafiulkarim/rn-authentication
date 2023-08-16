import React, {useRef} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  DrawerLayoutAndroid,
  View,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import {IconButton, Text} from 'react-native-paper';

const Stack = createNativeStackNavigator();

const App = ({navigation}) => {
  const drawer = useRef(null);
  return (
    <>
      <StatusBar animated={true} backgroundColor="#61dafb" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='LoginScreen'>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: '',
              headerStyle: {
                backgroundColor: '#61dafb',
              },
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{
              title: 'Welcome',
              headerStyle: {
                backgroundColor: '#61dafb',
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
