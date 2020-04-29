import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native'
import { Svg, Path } from 'react-native-svg'

const titleList = {
    total_number_of_tests: 'New Tests', cumulative_number_of_tests: 'Total Tests',
    new_positives: 'New Positives', cumulative_number_of_positives: 'Total Positives'
}
export default function DayChange(props) {
    title = titleList[props.dataType]

    function getValue() {
        console.log(props.dataType)
        console.log('pos', props.data.map(d => d[props.dataType])[props.data.length - 1])
        return props.data.map(d => d[props.dataType])[props.data.length - 1]
    }

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
                        <Text style={styles.newValue}>{getValue()}</Text>
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