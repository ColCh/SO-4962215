import React from 'react';
import Camera from 'react-native-camera';
import {
  View,
  StyleSheet,
  StatusBar,
  Animated,
  Image
} from 'react-native';

import TouchableElastic from 'touchable-elastic';

export default class App extends React.Component {
  state = {
    recording: false,
    previewPath: '',
    cameraType: Camera.constants.Type.back,
    recordButtonColor: new Animated.Value(0)
  }

  render() {
    let { recording, cameraType, recordButtonColor } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Camera
          style={styles.camera}
          type={cameraType}
          >
          <TouchableElastic
            style={styles.cameraIconContainer}
            onPress={this.toggleCamera}
            >
            <Image
              style={styles.cameraIcon}
              source={require('./camera.png')}
            />
          </TouchableElastic>
          <TouchableElastic
            style={styles.recordButtonContainer}
            onPressIn={this.startRecording}
            onPressOut={this.stopRecording}
            >
            <Animated.View style={[styles.recordButton, { backgroundColor: recordButtonColor.interpolate({ inputRange: [0, 1], outputRange: ['#fff', '#ff3333'] }) }]} />
          </TouchableElastic>
        </Camera>
      </View>
    );
  }

  toggleCamera = () => {
    let type = this.state.cameraType;
    this.setState({ cameraType: type === Camera.constants.Type.back ? Camera.constants.Type.front : Camera.constants.Type.back });
  }

  startRecording = () => {
    this.setState({ recording: true });
    this.toggleButtonColor(1);
  }

  stopRecording = () => {
    this.setState({ recording: false });
    this.toggleButtonColor(0);
  }

  toggleButtonColor = toValue => {
    Animated.timing(this.state.recordButtonColor, {
      toValue,
      duration: 100
    }).start();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between'
  },
  cameraIconContainer: {
    marginTop: 25,
    marginRight: 10,
    alignSelf: 'flex-end'
  },
  cameraIcon: {
    height: 35,
    width: 35
  },
  recordButtonContainer: {
    marginBottom: 10
  },
  recordButton: {
    height: 60,
    width: 60,
    borderRadius: 30
  }
});
