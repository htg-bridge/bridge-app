import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import IdentityConfirm from './IdentityConfirm';
import GalleryScreen from './GalleryScreen';

export default class RecordAudio extends React.Component {
  state = {
      moveOn: false,
      recordingImage: require('./assets/voiceIcon.png'),
  };

  componentDidMount() {
      setTimeout(() => {this.setState({recordingImage: require('./assets/recording1.png')})}, 800);
      setTimeout(() => {this.setState({recordingImage: require('./assets/recording2.png')})}, 1600);
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
    if (this.state.moveOn) {
        return <GalleryScreen />
    }
    return (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image style={{ width: 310, height: 160, alignSelf: 'center'}} source={this.state.recordingImage} />
          </View>
          <View style={{flex: 1}}>
            <Text style={{alignSelf: 'center'}}>Please say GO HOME LIAO...</Text>
            <View style={styles.buttonContainer}>
                <Button
                title="Done"
                onPress={() => {this.setState({moveOn: true})}}
                color="white"
                />
            </View> 
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
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 20,
    width: 220,
    backgroundColor: '#2196F3',
    borderRadius:20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 20,
  },
  imageContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
