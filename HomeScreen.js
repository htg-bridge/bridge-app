import Expo from 'expo';
import React from 'react';
import { Button, StyleSheet, Text, View, Dimensions, Image, Alert, TouchableOpacity } from 'react-native';

export function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', top: -50 }}>
        <Image style={{ width: 200, height: 130}} source={require('./assets/bridge_logo.png')} />
        <View style={styles.buttonContainer}>
            <Button
                title="Adult"
                onPress={() => navigation.navigate('Bridge')}
                color="white"
            />
        </View> 
        <View style={styles.buttonContainer}>
            <Button
                raised
                title="Infant"
                onPress={() => navigation.navigate('Bridge')}
                color="white"
            />
        </View> 
      </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        margin: 20,
        width: 220,
        backgroundColor: '#5AC9B7',
        borderRadius:20,
    },
  });