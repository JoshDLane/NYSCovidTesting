
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import NYOverview from './screens/NYOverview'
import TimeGraph from './screens/timeGraph'
import { dimensions } from './styles/colors'
import DataInfo from './Components/DataInfo'
import DataBanner from './Components/DataBanner'

function App() {
  console.disableYellowBox = true; 
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
      <View style={{ height: '91%' }}>
        {content}
      </View>
      <DataInfo visible={seeDataInfo} onCancel={cancelDataHandler} />
      <TouchableOpacity style={styles.banner} onPress={seeDataHandler}>
          <DataBanner />
      </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    height: dimensions.fullHeight,
    backgroundColor: 'black',
    justifyContent: 'space-between'
  },
  banner: {
    height: '9%'
  }
});

export default App;

