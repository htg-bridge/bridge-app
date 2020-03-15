import Expo from 'expo';
import React from 'react';
import { Button, StyleSheet, Text, View, Dimensions, Image, Alert, TouchableOpacity } from 'react-native';

export function RedeemScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', top: -50 }}>
        <Image style={{ width: 200, height: 130}} source={require('./assets/bridge_logo.png')} />
        <View style={styles.buttonContainer}>
            <Button
                title="Register"
                onPress={() => navigation.navigate('Register')}
                color="white"
            />
        </View> 
        <View style={styles.buttonContainer}>
            <Button
                raised
                title="Redeem"
                onPress={() => navigation.navigate('Redeem')}
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