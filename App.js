
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import CVBanner from './Components/CVBanner'
import Map from './Components/map'
import NYOverview from './screens/stateGeo'
import TimeGraph from './screens/timeGraph'


function App() {
  return (
    <View style={styles.container}>
      <CVBanner/>
      <TimeGraph/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 1000,
    backgroundColor: 'black',
  }
});

export default App;
