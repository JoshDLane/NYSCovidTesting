import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { colors } from '../styles/colors'
import { Svg, Path } from 'react-native-svg'
import { arc } from 'd3'

export default function RatePositive(props) {
    if (props.data.length > 1) {
        const prev3Pos = props.data.map(d => parseInt(d['cumulative_number_of_positives'])).slice(props.data.length - 4, props.data.length)
        var prev3PosMean = prev3Pos.reduce((previous, current) => current += previous);
        var prev3PosAv = prev3PosMean / 3
        var prev3Test = props.data.map(d => parseInt(d['cumulative_number_of_positives'])).slice(props.data.length - 4, props.data.length)
        var prev3TestMean = prev3Test.reduce((previous, current) => current += previous);
        var prev3TestAv = prev3TestMean / 3
        var curr3day = prev3PosAv / prev3TestAv
        console.log(curr3day)


        var stepped3Pos = props.data.map(d => parseInt(d['cumulative_number_of_positives'])).slice(props.data.length - 5, props.data.length - 1)
        var stepped3PosMean = stepped3Pos.reduce((previous, current) => current += previous);
        var stepped3PosAv = stepped3PosMean / 3
        var stepped3Test = props.data.map(d => parseInt(d['cumulative_number_of_positives'])).slice(props.data.length - 5, props.data.length - 1)
        var stepped3TestMean = stepped3Test.reduce((previous, current) => current += previous);
        var stepped3TestAv = stepped3TestMean / 3
        var stepped3day = stepped3PosAv / stepped3TestAv
        console.log(stepped3day)


    }


    upArrow = <Svg width="35px" height="35px" viewBox="0 0 60 60">
        <Path
            d="M 50 50 L 10 50 L 30 10 z"
            fill={colors.myRed}
            stroke={colors.myRed}
            stroke-width="2" />
    </Svg>

    downArrow = <Svg width="35px" height="35px" viewBox="0 0 60 60">
        <Path
            d="M 10 10 L 50 10 L 30 50 z"
            fill={colors.myGreen}
            stroke={colors.myGreen}
            stroke-width="2" />
    </Svg>

    if (props.data.length > 1 && stepped3day < curr3day) {
        arrow = upArrow
    }
    else {
        arrow = downArrow
    }
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    function currentPercent() {
        if (props.state == 'stateLevel') {
            var cumPositives = props.data.map(d => parseInt(d['cumulative_number_of_positives'])).reduce(reducer, 0)
            var cumTests = props.data.map(d => parseInt(d['cumulative_number_of_tests'])).reduce(reducer, 0)
            return parseFloat((cumPositives / cumTests) * 100).toFixed(0) + "%"

        }
        totalPositives = props.data.map(d => d['cumulative_number_of_positives'])[props.data.length - 1]
        totalTests = props.data.map(d => d['cumulative_number_of_tests'])[props.data.length - 1]
        return parseFloat((totalPositives / totalTests) * 100).toFixed(0) + "%"
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
        <View style={{ marginVertical: 5 }}>
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