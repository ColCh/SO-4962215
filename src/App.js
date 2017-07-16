console.disableYellowBox = true;

import React from 'react';
import Camera from 'react-native-camera';
import Video from 'react-native-video';
import {
  View,
  StyleSheet,
  StatusBar,
  Animated,
  TouchableHighlight,
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
  
  takeVideo() {
   console.log('started to take video');
   this.camera.capture({
     audio: true,
     mode: Camera.constants.CaptureMode.still,
     target: Camera.constants.CaptureTarget.disk
   }).then((data) => {
     this.setState({ path: data.path });
     console.log(data);
   }).catch((err) => console.log(err));
 }

 stopVideo() {
   this.camera.stopCapture();
   console.log(this.state.path);
 }

 renderCamera() {
   return (
     <View style={{ flex: 1 }}>
       <Camera
         ref={(cam) => {
           this.camera = cam;
         }}
         style={styles.preview}
         aspect={Camera.constants.Aspect.fill}
         captureTarget={Camera.constants.CaptureTarget.disk}
         captureMode={Camera.constants.CaptureMode.still}
       >
         <TouchableHighlight
           style={styles.capture}
           onPressIn={this.takeVideo.bind(this)}
           onPressOut={this.stopVideo.bind(this)}
           underlayColor="rgba(255, 255, 255, 0.5)"
         >
           <View />
         </TouchableHighlight>
       </Camera>
     </View>
   );
 }

  render() {
    return this.renderCamera();
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
