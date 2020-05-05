import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import { Svg, Path } from 'react-native-svg'
import { colors } from '../styles/colors'
import { precisionPrefix } from 'd3'

const titleList = {
    total_number_of_tests: 'Yesterdays Tests', cumulative_number_of_tests: 'Total Tests',
    new_positives: 'Yesterdays Positives', cumulative_number_of_positives: 'Total Positives'
}



export default function DayChange(props) {

    function getRecentValue() {
        return props.data.map(d => d[props.dataType])[props.data.length - 1]
    }

    function calculateNY() {
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        if (props.dataType == 'new_positives') {
            return props.data.map(d => parseInt(d['new_positives'])).reduce(reducer, 0)
        }
        else if (props.dataType == 'total_number_of_tests') {
            return props.data.map(d => parseInt(d['total_number_of_tests'])).reduce(reducer, 0)
        }
        else if (props.dataType == 'cumulative_number_of_positives') {
            return props.data.map(d => parseInt(d['cumulative_number_of_positives'])).reduce(reducer, 0)
        }
        else {
            return props.data.map(d => parseInt(d['cumulative_number_of_tests'])).reduce(reducer, 0)
        }
    }
    const title = titleList[props.dataType]
    if (props.isLoading == true) {
        context = <ActivityIndicator />
    }
    else {

        if (props.state) {
            context =
                <Text style={styles.newValue}>{calculateNY()}</Text>
        }
        else {
            context =
                <Text style={styles.newValue}>{getRecentValue()}</Text>

        }

    }
    var totcontext =
        <View style={[styles.buttonContainer, props.selected ? styles.selected : styles.changesTitle]}>

            <View>
                <Text style={styles.changesTitle}>{title}</Text>
            </View>
            <View>
                <View style={{ justifyContent: 'center', marginLeft: 30, opacity: 1.5 }}>
                    {context}
                </View>
            </View>
        </View>

    return (
        <View style={styles.rootContainer}>
            <View style={{ backgroundColor: 'black' }}>
                {totcontext}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        marginHorizontal: 5,
        marginVertical: 10,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    updateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    changesTitle: {
        fontSize: 24,
        color: colors.myGreen,
        margin: 5,
        fontWeight: '500'
    },
    newValue: {
        color: colors.myOrange,
        fontSize: 30,
        textAlign: 'center'
    },
    buttonContainer: {
        width: Dimensions.get('window').width / 2.3,
        padding: 5,
        margin: 10,
        borderRadius: 15,
    },
    selected: {
        padding: 5,
        margin: 10,
        borderRadius: 15,
        backgroundColor: 'rgba(78, 78, 78, .3)'
    }
})