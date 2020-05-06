import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Svg from 'react-native-svg'
import { Circle, Path, G } from 'react-native-svg'
const Pulse = require('react-native-pulse').default;
export default function UpdateStatus(props) {

    //     const fadeAnim = useRef(new Animated.Value(0)).current;
    //     this.state.circleRadius.addListener( (circleRadius) => {
    //     this._myCircle.setNativeProps({ r: circleRadius.value.toString() });
    //   });

    //   setTimeout( () => {
    //     Animated.spring( this.state.circleRadius, { toValue: 100, friction: 3 } ).start();
    //   }, 2000)
    // }
    async function getNYData() {
        var resp = await fetch(`https://health.data.ny.gov/resource/xdss-u53e.json`,
            {
                method: 'get',
                headers: new Headers({
                    "$$app_token": "weiei1vq5gb6wqtlqnvhqg1",
                })
            });

        var respJson = await (resp.json())

        respJson.sort((a, b) => (a.test_date > b.test_date) ? 1 : -1)
        recentDate = respJson.map(d => d.test_date)[respJson.length - 1]
        return recentDate
    }

    function date() {
        if (props.date) {
            var currDate = new Date(props.date)
            return `${currDate.getUTCMonth()}/${currDate.getUTCDate() + 1}`

            return currDate
        }
        else {
            var myDate = getNYData()
            var currDate = new Date(myDate)
            return `${currDate.getUTCMonth()}/${currDate.getUTCDate() + 1}`
        }

    }


    useEffect(() => {
        date()
    }, []);

    return (
        <View style={styles.container}>
            {/* <Svg width='40' height='40'>
                <Circle
                    cx='20'
                    cy='20'
                    r='5'
                    strokeWidth='.5'
                    stroke='red'
                    fill='red'
                    fillOpacity='.4' />
            </Svg> */}
            <View style={{ marginHorizontal: 20, alignContent: 'center', justifyContent: 'center' }}>
                <View style={{alignContent:'center', justifyContent: 'center'}}>
                    <Pulse color='red' numPulses={1} diameter={30} speed={150} duration={20000000} initialDiameter={20} />
                    <View style={styles.myCircle}>
                    </View>
                </View>
            </View>
            <View>
                <Text style={styles.textstyle}>
                    Updated {date()}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop:0,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center'
    },
    textstyle: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontStyle: 'italic',

    },
    myCircle: {
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        backgroundColor: 'red',
        position: 'absolute',
        left: -5,
        opacity: .8
    }
})


