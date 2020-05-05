import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity, Dimensions } from 'react-native'
import { Svg, Path } from 'react-native-svg'
import { colors } from '../styles/colors'

const titleList = {
    total_number_of_tests: 'New Tests', cumulative_number_of_tests: 'Total Tests',
    new_positives: 'New Positives', cumulative_number_of_positives: 'Total Positives'
}
export default function DayChange(props) {

    title = titleList[props.dataType]

    function getValue() {
        if (props.myValue){
            return props.myValue
        }
        // else{
        //     return props.data.map(d => d[props.dataType])[props.data.length - 1]
        // }
    }
    // function getPercentChange() {
    //     if (props.data){
    //         yesterday = props.data.map(d => d[props.dataType])[props.data.length - 2]
    //         diff = props.data.map(d => d[props.dataType])[props.data.length - 1] - yesterday
    //         return diff / yesterday
    //     }

    //     // return parseFloat((diff / yesterday) * 100).toFixed(2) + "%"
    // }
    upArrow = <Svg width="25px" height="25px" viewBox="0 0 60 60">
        <Path
            d="M 50 50 L 10 50 L 30 10 z"
            fill={colors.myOrange}
            stroke={colors.myOrange}
            stroke-width="2" />
    </Svg>

    downArrow = <Svg width="25px" height="25px" viewBox="0 0 60 60">
        <Path
            d="M 10 10 L 50 10 L 30 50 z"
            fill={colors.myOrange}
            stroke={colors.myOrange}
            stroke-width="2" />
    </Svg>
    // if (getPercentChange() < 0) {
    //     arrow = downArrow
    // }
    // else {
        arrow = upArrow
    // }
    if (props.change) {
        context =
            <View>
                <View>
                    <Text style={styles.changesTitle}>{title}</Text>
                </View>
                <View style={styles.updateContainer}>
                    <View style={{ justifyContent: 'center', marginLeft: 15 }}>
                        <Text style={styles.newValue}>{getValue()}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ justifyContent: 'center', marginLeft: 5 }}>
                            <Text style={styles.newValue}>{parseFloat(getPercentChange() * 100).toFixed(2) + "%"}</Text>
                        </View>
                        <View style={{ alignContent: 'center', justifyContent: 'center' }}>
                            {arrow}
                        </View>
                    </View>

                </View>
            </View>

    }
    else {
        context = 
        <View style={{width: Dimensions.get('window').width/2.2, padding:5}}>
            <View>
                <Text style={styles.changesTitle}>{title}</Text>
            </View>
            <View>
                <View style={{ justifyContent: 'center', marginLeft: 30 }}>
                    <Text style={styles.newValue}>{getValue()}</Text>
                </View>
            </View>
        </View>

    }
    return (
        <View style={styles.rootContainer}>
            <View style={{ backgroundColor: 'black' }}>
                {context}
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
        fontSize: 25,
        color: colors.myGreen,
        margin: 5,
        fontWeight: '500'
    },
    newValue: {
        color: colors.myOrange,
        fontSize: 30,
        textAlign: 'center'
    }
})