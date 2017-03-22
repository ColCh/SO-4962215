console.disableYellowBox = true;

import React from 'react';
import Camera from 'react-native-camera';
import Video from 'react-native-video';
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
    videoPath: '',
    cameraType: Camera.constants.Type.back,
    recordButtonColor: new Animated.Value(0)
  }

  render() {
    let { videoPath, recording, cameraType, recordButtonColor } = this.state;
    console.log('VIDEOPATH', videoPath)

    let preview = videoPath ? (
      <Video
        source={{ uri: videoPath }}
        repeat={true}
        volume={1.0}
        muted={false}
        style={styles.preview}
      />
    ) : (
      <Camera
        ref={ref => this.cam = ref}
        captureMode={Camera.constants.CaptureMode.video}
        captureTarget={Camera.constants.CaptureTarget.disk}
        style={styles.preview}
        captureAudio={true}
        type={cameraType}
      />
    );

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        {preview}
        <View style={styles.controlPanel}>
          <View style={styles.topButtonsContainer}>
            <TouchableElastic onPress={this.removeVideo}>
              <Image
                style={[styles.xIcon, { opacity: videoPath ? 1 : 0 }]}
                source={require('./x.png')}
              />
            </TouchableElastic>
            <TouchableElastic onPress={this.toggleCamera}>
              <Image
                style={styles.cameraIcon}
                source={require('./camera.png')}
              />
            </TouchableElastic>
          </View>
          <TouchableElastic
            style={styles.recordButtonContainer}
            onPressIn={this.startRecording}
            onPressOut={this.stopRecording}
            >
            <Animated.View style={[styles.recordButton, { backgroundColor: recordButtonColor.interpolate({ inputRange: [0, 1], outputRange: ['#fff', '#ff3333'] }) }]} />
          </TouchableElastic>
        </View>
      </View>
    );
  }

  toggleCamera = () => {
    let { videoPath, cameraType } = this.state;
    let { front, back } = Camera.constants.Type;
    if (videoPath) {
      return null;
    }
    let type = cameraType;
    this.setState({ cameraType: type === back ? front : back });
  }

  startRecording = () => {
    if (this.state.videoPath) {
      return null;
    }
    this.setState({ recording: true });
    this.toggleButtonColor(1);
    this.cam.capture()
      .then(data => {
        this.setState({ videoPath: data.path });
      })
  }

  stopRecording = () => {
    if (this.state.videoPath) {
      return null;
    }
    this.setState({ recording: false });
    this.toggleButtonColor(0);
    this.cam.stopCapture();
  }

  removeVideo = () => {
    let { videoPath } = this.state;
    if (!videoPath) {
      return nul;
    }
    this.setState({ videoPath: '' });
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
  preview: {
    flex: 1
  },
  controlPanel: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'space-between'
  },
  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    marginTop: 25
  },
  xIcon: {
    height: 25,
    width: 25
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
