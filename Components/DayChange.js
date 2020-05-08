import React from 'react'
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import { colors, dimensions } from '../styles/colors'

const titleList = {
    total_number_of_tests: 'Yesterdays Tests', cumulative_number_of_tests: 'Total Tests',
    new_positives: 'Yesterdays Positives', cumulative_number_of_positives: 'Total Positives'
}



export default function DayChange(props) {

    function numberWithCommas(x) {
        console.log('height', dimensions.fullHeight)
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function getRecentValue() {
        return numberWithCommas(parseInt(props.data.map(d => d[props.dataType])[props.data.length - 1]))
    }

    function calculateNY() {
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        if (props.dataType == 'new_positives') {
            return numberWithCommas(props.data.map(d => parseInt(d['new_positives'])).reduce(reducer, 0))
        }
        else if (props.dataType == 'total_number_of_tests') {
            return numberWithCommas(props.data.map(d => parseInt(d['total_number_of_tests'])).reduce(reducer, 0))
        }
        else if (props.dataType == 'cumulative_number_of_positives') {
            return numberWithCommas(props.data.map(d => parseInt(d['cumulative_number_of_positives'])).reduce(reducer, 0))
        }
        else {
            return numberWithCommas(props.data.map(d => parseInt(d['cumulative_number_of_tests'])).reduce(reducer, 0))
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
    return (
        <View style={styles.rootContainer}>
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
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        marginHorizontal: 5,
        borderRadius: 8,
        backgroundColor: 'black'
    },
    changesTitle: {
        fontSize: 22,
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
        padding: 5,
        width: Dimensions.get('window').width / 2.3,
        borderRadius: 15,
    },
    selected: {
        borderRadius: 15,
        backgroundColor: 'rgba(78, 78, 78, .3)'
    }
})