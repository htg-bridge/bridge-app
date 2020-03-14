import Expo from 'expo';
import React from 'react';
import { Button, StyleSheet, Text, View, Dimensions, Image, Alert, TouchableOpacity } from 'react-native';

export function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>To start scanning, please click Next</Text>
        <Button
          title="Next"
          onPress={() => navigation.navigate('Camera')}
        />
      </View>
    );
  }