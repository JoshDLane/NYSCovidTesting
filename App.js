
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import CVBanner from './Components/CVBanner'
import Map from './Components/map'
import NYOverview from './screens/NYOverview'
import TimeGraph from './screens/timeGraph'
import { colors, dimensions } from './styles/colors'
import DataInfo from './Components/DataInfo'
import DataBanner from './Components/DataBanner'

// import { createStackNavigator } from 'react-navigation-stack'
// import { createAppContainer } from 'react-navigation'

// const Navigator = createStackNavigator({
//   NYOverview: { screen: NYOverview},
//   TimeGraph: {screen: TimeGraph}
// })

function App() {

  const [seeDataInfo, setSeeDataInfo] = useState(false)

  const [screen, setScreen] = useState('home')

  function seeDataHandler() {
    setSeeDataInfo(true)
  }
  function cancelDataHandler() {
    setSeeDataInfo(false)
  }


  if (screen == 'home') {
    content = <NYOverview onButtonClick={() => setScreen('timeSeries')} />
  }
  else {
    content = <TimeGraph onBackButtonClick={() => setScreen('home')} />
  }

  return (
    <View style={styles.container}>
      <View style={{height:dimensions.fullHeight*.925}}>
        {content}
      </View>
      <DataInfo visible={seeDataInfo} onCancel={cancelDataHandler} />
      <TouchableOpacity onPress={seeDataHandler}>
        <DataBanner />
      </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: dimensions.fullHeight,
    backgroundColor: 'black',
  }
});

export default App;

