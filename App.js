
import React, { useState } from 'react';
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
import NYOverview from './screens/NYOverview'
import TimeGraph from './screens/timeGraph'
// import { createStackNavigator } from 'react-navigation-stack'
// import { createAppContainer } from 'react-navigation'

// const Navigator = createStackNavigator({
//   NYOverview: { screen: NYOverview},
//   TimeGraph: {screen: TimeGraph}
// })

function App() {
  
  const [screen, setScreen] = useState('home')

  if (screen == 'home') {
    content = <NYOverview onButtonClick={() => setScreen('timeSeries')} />
  }
  else {
    content = <TimeGraph onBackButtonClick={() => setScreen('home')} />
  }

  return (
    <View style={styles.container}>
      {content}
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

