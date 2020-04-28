import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, TouchableWithoutFeedbackBase } from 'react-native'
import ReactiveLineGraph from '../Components/ReactiveLineGraph'
import DayChange from '../Components/DayChange'
import RegionSelect from '../Components/RegionSelect'
import InfectionRate from '../Components/InfectionRate'

const TSCovid = require('../data/CovidTimeSeries.json')

export default function TimeGraph() {
    const [currGraphType, setcurrGraphType] = useState('cases')
    const [currRegion, setCurrRegion] = useState('New York City')


    return (
        <View style={styles.container}>
            <View>
                <RegionSelect currentCounty={currRegion} />
            </View>
            <View style={{ marginTop: 25, marginRight: 15 }}>
                <InfectionRate />
            </View>
            <View style={styles.updatesContainer}>
                <View style={{ marginTop: 20, marginLeft: 0 }}>
                    <TouchableOpacity onPress={() => setcurrGraphType('cases')}>
                        <DayChange dataType='dailyPositives' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setcurrGraphType('cases')}>
                        <DayChange dataType='dailyTests' />
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 20, marginLeft: 0 }}>
                    <TouchableOpacity onPress={() => setcurrGraphType('deaths')}>
                        <DayChange dataType='totalPositives' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setcurrGraphType('deaths')}>
                        <DayChange dataType='totalTests' />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.graphContainer}>
                <ReactiveLineGraph graphType={currGraphType} data={TSCovid} key={currGraphType} />
            </View>
        </View>
    )
}






const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        flexDirection: 'column'
    },
    graphContainer: {
        marginTop: -30,
        alignContent: 'center'
    },
    titleContainer: {
        marginTop: 50,
        width: 180,
        shadowColor: 'black',
        shadowOffset: { width: 1, hight: 2 },
        shadowRadius: 7,
        // borderColor: 'white',
        borderWidth: .5,
        borderRadius: 10,
        paddingHorizontal: 5,
    },
    updatesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})