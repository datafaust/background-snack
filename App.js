import React from 'react';
import { Alert, View, Text, TouchableOpacity } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

const LOCATION_TASK_NAME = 'background-location-task';

export default class Component extends React.Component {
  onPress = async () => {
    const { status } = await Location.requestPermissionsAsync();
    if (status === 'granted') {
      console.log('RESTARTING TRACKING....')
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
        timeInterval:5000
      });
      Alert.alert('starting tracking')
    }
  };

  closeTask = async() =>{
    Alert.alert('stopping tracking')
    await TaskManager.unregisterTaskAsync(LOCATION_TASK_NAME)
  }

  render() {
    return (
      <View>
      <View style={{marginTop:'20%', marginLeft: '30%'}}>
      <TouchableOpacity onPress={this.onPress}>
        <Text>Enable background location</Text>
      </TouchableOpacity>
      </View>

      <View style={{marginTop:'50%', marginLeft: '30%'}}>
      <TouchableOpacity onPress={this.closeTask}>
        <Text>STOP TRACKING</Text>
      </TouchableOpacity>

      </View>
      </View>
     
    );
  }
}

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    // Error occurred - check `error.message` for more details.
    return;
  }
  if (data) {
    const { locations } = data;
    console.log(locations);
    // do something with the locations captured in the background
  }
});
