import Expo from 'expo';
import React from 'react';
import { Button, StyleSheet, Text, View, Dimensions, Image, Alert, TouchableOpacity } from 'react-native';

export function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', top: -50 }}>
        <Image style={{ width: 200, height: 130}} source={require('./assets/bridge_logo.png')} /> 
        <Text>To start enrolling a new person, please click Next</Text>
        <Button
          title="Next"
          onPress={() => navigation.navigate('Camera')}
        />
        <Text>To verify a person, please click Next</Text>
        <Button
          title="Next"
          onPress={() => navigation.navigate('VerifyFace')}
        />
      </View>
    );
  }