import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { colors } from '../styles/colors'
import { Svg, Path } from 'react-native-svg'

export default function RatePositive(props) {
    
    // Calculating 3 day averages of percentage test positives
    if (props.stateLevel == true && props.data.length > 1) {
        var dates = props.data.map(d => d['test_date'])
        uniqueD = dates.filter((v, i, a) => a.indexOf(v) === i);
        last3Days = props.data.filter(county => uniqueD.slice(uniqueD.length - 3, uniqueD.length).indexOf(county.test_date) >= 0)
        prev3Days = props.data.filter(county => uniqueD.slice(uniqueD.length - 6, uniqueD.length - 3).indexOf(county.test_date) >= 0)

        const prev3Pos = last3Days.map(d => parseInt(d['new_positives']))
        var prev3PosSum = prev3Pos.reduce((previous, current) => current += previous);
        var prev3PosAv = prev3PosSum / 3
        var prev3Test = last3Days.map(d => parseInt(d['total_number_of_tests']))
        var prev3TestSum = prev3Test.reduce((previous, current) => current += previous);
        var prev3TestAv = prev3TestSum / 3
        var curr3day = prev3PosAv / prev3TestAv


        const stepped3Pos = prev3Days.map(d => parseInt(d['new_positives']))
        var stepped3PosSum = stepped3Pos.reduce((previous, current) => current += previous);
        var stepped3PosAv = stepped3PosSum / 3
        var stepped3Test = prev3Days.map(d => parseInt(d['total_number_of_tests']))
        var stepped3TestMean = stepped3Test.reduce((previous, current) => current += previous);
        var stepped3TestAv = stepped3TestMean / 3
        var stepped3day = stepped3PosAv / prev3TestAv

    }

    else if (props.data.length > 1) {
        const prev3Pos = props.data.map(d => parseInt(d['new_positives'])).slice(props.data.length - 3, props.data.length)
        var prev3PosSum = prev3Pos.reduce((previous, current) => current += previous);
        var prev3PosAv = prev3PosSum / 3
        var prev3Test = props.data.map(d => parseInt(d['total_number_of_tests'])).slice(props.data.length - 3, props.data.length)
        var prev3TestSum = prev3Test.reduce((previous, current) => current += previous);
        var prev3TestAv = prev3TestSum / 3
        var curr3day = prev3PosAv / prev3TestAv


        var stepped3Pos = props.data.map(d => parseInt(d['new_positives'])).slice(props.data.length - 6, props.data.length - 3)
        var stepped3PosSum = stepped3Pos.reduce((previous, current) => current += previous);
        var stepped3PosAv = stepped3PosSum / 3
        var stepped3Test = props.data.map(d => parseInt(d['total_number_of_tests'])).slice(props.data.length - 6, props.data.length - 3)
        var stepped3TestSum = stepped3Test.reduce((previous, current) => current += previous);
        var stepped3TestAv = stepped3TestSum / 3
        var stepped3day = stepped3PosAv / stepped3TestAv
    }

    upArrow = <Svg width="35px" height="35px" viewBox="0 -25 50 50">
        <Path
            d='M 0 17 0 23 20 23 20 17'
            fill={colors.myRed}
            stroke={colors.myRed}
            opacity={.8}
            stroke-width="2"
            transform="rotate(-45)" 
            />
        <Path
            d='M 20 11 20 29 40 20'
            fill={colors.myRed}
            stroke={colors.myRed}
            opacity={.8}
            stroke-width="2"
            transform="rotate(-45)" 
            />
    </Svg>

    downArrow = 
    <Svg width="35px" height="35px" viewBox="-25 0 50 50">
        <Path
            d='M 0 17 0 23 20 23 20 17'
            fill='green'
            stroke='green'
            opacity={.8}
            stroke-width="2"
            transform="rotate(45)" 
            />
        <Path
            d='M 20 12 20 28 40 20'
            fill='green'
            stroke='green'
            opacity={.8}
            stroke-width="2"
            transform="rotate(45)" 
            />
    </Svg>

    if (props.data.length > 1 && stepped3day < curr3day) {
        // if current 3 day average is greater than the 3 days prior, show trending up. 
        arrow = upArrow
    }
    else {
        arrow = downArrow
    }
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    function currentPercent() {
        if (props.stateLevel == true) {


            var recentDate = props.data.map(d => d.test_date)[props.data.length - 1]
            var myrecentData = props.data.filter(county => county.test_date === recentDate)
            var cumPositives = myrecentData.map(d => parseInt(d['cumulative_number_of_positives'])).reduce(reducer, 0)
            var cumTests = myrecentData.map(d => parseInt(d['cumulative_number_of_tests'])).reduce(reducer, 0)

            return parseFloat((cumPositives / cumTests) * 100).toFixed(0) + "%"

        }
        else {
            totalPositives = props.data.map(d => d['cumulative_number_of_positives'])[props.data.length - 1]
            totalTests = props.data.map(d => d['cumulative_number_of_tests'])[props.data.length - 1]
            return parseFloat((totalPositives / totalTests) * 100).toFixed(0) + "%"

        }
    }

    if (props.isLoading == true) {
        context = <ActivityIndicator />
    }
    else {
        context =
            <React.Fragment>
                <View style={{ justifyContent: 'center' }}>
                    {<Text style={styles.percentText}>
                        {currentPercent()}
                    </Text>}
                </View>
                <View style={{ justifyContent: 'center', marginHorizontal: 5 }}>
                    {arrow}
                </View>
            </React.Fragment>
    }
    return (
        <View style={{ }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ justifyContent: 'center', marginHorizontal: 10 }}>
                    <Text style={styles.titleText}>
                        % Tests Positive
                    </Text>
                </View>
                {context}
            </View>

        </View>



    )
}

const styles = StyleSheet.create({
    percentText: {
        fontSize: 30,
        color: colors.myOrange,
        textAlign: 'center'
    },
    titleText: {
        color: colors.myGreen,
        fontSize: 25,
        textAlign: 'center'
    }
})