import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import * as Permissions from 'expo-permissions';
import { MaterialIcons } from '@expo/vector-icons';

export default class RegisterIdentity extends React.Component {
  state = {

  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={{ width: 220, height: 220}} source={require('./assets/tick.png')} />
        </View>
        <View style={{flex: 1}}>
          <Text style={{alignSelf: 'center', fontSize: 24}}>You're all set!</Text>
          <Text style={{alignSelf: 'center', fontSize: 24}}>ID: test-0001</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
  },
  imageContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
