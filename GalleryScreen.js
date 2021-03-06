import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as FaceDetector from 'expo-face-detector';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import { MaterialIcons } from '@expo/vector-icons';
import Photo from './Photo';
import RegisterIdentity from './RegisterIdentity';
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";
import "firebase/database";

const PHOTOS_DIR = FileSystem.documentDirectory + 'photos';
const GOOGLE_DRIVE_FOLDER = 'https://drive.google.com/open?id=1bW3oMv_-P703w4AN_r3NrrDBNLpDDva0';
const TRAINING_FOLDER_ID = '1bW3oMv_-P703w4AN_r3NrrDBNLpDDva0';
const firebaseConfig = {
    apiKey: "AIzaSyAHArau49Fvl5bBri69Mgra14lDle75eqo",
    authDomain: "htg-identifier.firebaseapp.com",
    databaseURL: "https://htg-identifier.firebaseio.com",
    projectId: "htg-identifier",
    storageBucket: "htg-identifier.appspot.com",
    messagingSenderId: "380084391195",
    appId: "1:380084391195:web:823729770ce8ec7d5bd7be"
};

export default class GalleryScreen extends React.Component {
    state = {
        faces: {},
        images: {},
        photos: [],
        selected: [],
        complete: false,
    };

    componentDidMount = async () => {
        const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
        this.setState({ photos });
        firebase.initializeApp(firebaseConfig)
    };

    toggleSelection = (uri, isSelected) => {
        let selected = this.state.selected;
        if (isSelected) {
            selected.push(uri);
        } else {
            selected = selected.filter(item => item !== uri);
        }
        this.setState({ selected });
    };

    storeUser = (userId, category, encodedPhotos) => {
        firebase.database().ref('users/' + userId).set({
            category: category,
            photos: encodedPhotos,
        });
    }

    saveToCloud = async () => {
        const photos = this.state.selected;
        let photosBase64 = [];

        if (photos.length > 0) {
            const promises = photos.map(photoUri => {
                var fileMetadata = {
                    'name': photoUri,
                    parents: [TRAINING_FOLDER_ID]
                };
                const readBase64 = FileSystem.readAsStringAsync(photoUri, {encoding: FileSystem.EncodingType.Base64})
                    .then(string => {
                        photosBase64.push(string);
                    })
                    .catch(err => {console.log(err)})
                //fetch('') for future API integration
                return Promise.resolve()
            })
            await Promise.all(promises);
            console.log(photosBase64)
            this.storeUser('test-0001', 'adult', photosBase64);
            
            alert('Successfully uploaded photos to cloud!');
            this.setState({ complete: true });
        } else {
            alert('No photos to save!');
        }
    };

    deleteFiles = async () => {
        const photos = this.state.selected;

        if (photos.length > 0) {
            const promises = photos.map(photoUri => {
                return FileSystem.deleteAsync(photoUri);
            });
            await Promise.all(promises);
            alert('Successfully deleted all photos!');
        } else {
            alert('No photos to save!');
        }
    };


    renderPhoto = fileName =>
        <Photo
            key={fileName}
            uri={`${PHOTOS_DIR}/${fileName}`}
            onSelectionToggle={this.toggleSelection}
        />;

    render() {
        if (this.state.complete) {
            return <RegisterIdentity />
        }
        return (
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
                        <MaterialIcons name="arrow-back" size={25} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.saveToCloud}>
                        <MaterialIcons style={{ alignSelf: 'center' }} name="cloud-upload" size={25} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.deleteFiles}>
                        <MaterialIcons name="delete" size={25} color="white" />
                    </TouchableOpacity>
                </View>
                <ScrollView contentComponentStyle={{ flex: 1 }}>
                    <View style={styles.pictures}>
                        {this.state.photos.map(this.renderPhoto)}
                    </View>
                </ScrollView>
                <View style={{ flex: 1 }}>
                    <Text style={{ alignSelf: 'center', fontSize: 16 }}>Please select 2 photos and click upload.</Text>
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
    },
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FF8127',
    },
    pictures: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    button: {
        padding: 20,
        alignSelf: 'center'
    },
    whiteText: {
        color: 'white',
    }
});
