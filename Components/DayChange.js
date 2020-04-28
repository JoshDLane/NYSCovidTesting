import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native'
import { Svg, Path } from 'react-native-svg'

const titleList = {
    dailyTests: 'New Tests', totalTests: 'Total Tests',
    dailyPositives: 'New Positives', totalPositives: 'Total Positives'
}
export default function DayChange(props) {
    title = titleList[props.dataType]

    return (
        <View style={styles.rootContainer}>
            <View style={{backgroundColor: 'black'}}>
                <View>
                    <Text style={styles.changesTitle}>{title}</Text>
                </View>
                <View style={styles.updateContainer}>
                    <View style={{ alignContent: 'center', justifyContent: 'center' }}>
                        <Svg width="25px" height="25px" viewBox="0 0 60 60">
                            <Path
                                d="M 10 10 L 50 10 L 30 50 z"
                                fill='#52e4c2'
                                stroke="#52e4c2"
                                stroke-width="2" />
                        </Svg>
                    </View>
                    <View style={{ justifyContent: 'center', marginLeft: 15 }}>
                        <Text style={styles.newValue}>453</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        marginHorizontal: 5,
        marginVertical: 15,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    updateContainer: {
        flexDirection: 'row',
    },
    changesTitle: {
        fontSize: 20,
        color: "#52e4c2",
        margin: 5,
        fontWeight: '500'
    },
    newValue: {
        color: '#52e4c2',
        fontSize: 25,
        textAlign: 'center'
    }
})