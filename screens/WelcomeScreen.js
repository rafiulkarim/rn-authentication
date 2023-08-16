import React, {useRef, useState} from 'react';
import {
  Button,
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import {IconButton, Appbar} from 'react-native-paper';

const WelcomeScreen = () => {
  const drawer = useRef(null);
  const [drawerPosition, setDrawerPosition] = useState('left');

  const navigationView = () => (
    <View>
      <Text>Hello</Text>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={100}
      drawerPosition={drawerPosition}
      renderNavigationView={navigationView}>
      <View style={{  }}>
        <Appbar.Header style={{backgroundColor: '#61dafb'}} >
          <Appbar.Content title="Welcome" titleStyle={{color: "#fff"}}/>
          <Appbar.Action icon="menu" color='#fff' onPress={() => drawer.current.openDrawer()}/>
        </Appbar.Header>
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
