import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './HomeScreen';
import { RedeemScreen } from './RedeemScreen';
import CameraScreen from './CameraScreen';
import VerifyFace from './VerifyFace';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Welcome" component={HomeScreen} />
        <Stack.Screen name="Bridge" component={RedeemScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="VerifyFace" component={VerifyFace} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;