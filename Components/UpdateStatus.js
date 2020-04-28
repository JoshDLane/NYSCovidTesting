import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Svg from 'react-native-svg'
import { Circle, Path, G } from 'react-native-svg'

export default function UpdateStatus(props) {

//     const fadeAnim = useRef(new Animated.Value(0)).current;
//     this.state.circleRadius.addListener( (circleRadius) => {
//     this._myCircle.setNativeProps({ r: circleRadius.value.toString() });
//   });

//   setTimeout( () => {
//     Animated.spring( this.state.circleRadius, { toValue: 100, friction: 3 } ).start();
//   }, 2000)
// }

    return (
        <View style={styles.container}>
            <Svg width='40' height='40'>
                <Circle
                    cx='20'
                    cy='20'
                    r='5'
                    strokeWidth='.5'
                    stroke='red'
                    fill='red'
                    fillOpacity='.4' />
            </Svg>
            <View style={{ justifyContent: 'center' }}>
                <Text style={styles.textstyle}>
                    Updated 4/23
            </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 125,
        marginLeft: 30,
        position: 'absolute',
        flexDirection: 'row',
        alignContent: 'center'
    },
    textstyle: {
        // marginTop: 13,
        textAlign: 'center',
        color: 'white',
        fontSize: 12,
        fontStyle: 'italic',

    }
})


