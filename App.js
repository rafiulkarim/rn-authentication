import React from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';

const stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar animated={true} backgroundColor="#61dafb" />
      <NavigationContainer>
        <stack.Navigator>
          <stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#61dafb",
              },
              headerShown: false
            }}
          />
        </stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
