import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import * as Permissions from 'expo-permissions';
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import IdentityConfirm from './IdentityConfirm';

export default class VerifyVoice extends React.Component {
  state = {
    timePassed: false,
    recordingImage: require('./assets/voiceIcon.png'),
  };

  componentDidMount() {
    setTimeout(() => {this.setState({recordingImage: require('./assets/recording1.png')})}, 1200);
    setTimeout(() => {this.setState({recordingImage: require('./assets/recording2.png')})}, 2400);
    setTimeout(() => {this.setState({timePassed: true})}, 5000)
  }

  recordAudio = async () => {
    const recording = new Audio.Recording();
    try {
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      // You are now recording!
    } catch (error) {
      // An error occurred!
    }
  }

  render() {
    if (this.state.timePassed) {
      return <IdentityConfirm />
    }
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={{ width: 310, height: 160, alignSelf: 'center'}} source={this.state.recordingImage} />
        </View>
        <View style={{flex: 1}}>
          <Text style={{alignSelf: 'center', fontSize: 18}}>Please say 
            <Text style={{fontSize: 18, fontWeight: 'bold'}}> "Biscuit Cookie Grumble"</Text>
          </Text>
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
