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
     mode: Camera.constants.CaptureMode.video,
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
         style={{ flex: 1, borderWidth: 1, borderColor: 'red', }}
         aspect={Camera.constants.Aspect.fill}
         captureTarget={Camera.constants.CaptureTarget.disk}
         captureMode={Camera.constants.CaptureMode.video}
       >
         <TouchableHighlight
           style={{ borderWidth: 1, borderColor: 'blue', flex: 1 }}
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

