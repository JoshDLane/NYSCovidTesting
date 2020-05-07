import React, { useState } from 'react';
import { useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import ReactiveLineGraph from '../Components/ReactiveLineGraph'
import DayChange from '../Components/DayChange'
import UpdateStatus from '../Components/UpdateStatus'
import CVBanner from '../Components/CVBanner'
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import { colors } from '../styles/colors'
import RatePositive from '../Components/RatePositive';


export default function TimeGraph(props) {
    const [currGraphType, setcurrGraphType] = useState('cumulative_number_of_positives')
    const [currRegion, setCurrRegion] = useState({
        label: 'Manhattan',
        value: 'New York'
    })
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedGraph, setSelectedGraph] = useState('cumulative_number_of_positives')

    async function getNYData(region) {
        setLoading(true)
        var resp = await fetch(`https://health.data.ny.gov/resource/xdss-u53e.json?county=${region}`,
            {
                method: 'get',
                headers: new Headers({
                })
            });
        var respJson = await (resp.json())
        respJson.sort((a, b) => (a.test_date > b.test_date) ? 1 : -1)
        setData(respJson)
        setLoading(false)
    }

    useEffect(() => {
        getNYData(currRegion.value)
    }, [currRegion]);

    const countyList = require('../data/dropDownOptions.json')

    function setCounty(value) {
        setCurrRegion(countyList.find(county => county.value === value))
    }

    return (
        <View style={styles.root_container}>
            <View style={{height: '11%'}}>
                <CVBanner backToHome={props.onBackButtonClick} />
            </View>
            <View style={styles.contentContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <UpdateStatus date={data.map(d => d.test_date)[data.length - 1]} />
                </View>
                <View style={styles.selectRootContainer}>
                    <View style={{justifyContent:'flex-end'}}>
                        <Text style={{ color: 'white', marginHorizontal: 10, marginVertical:3, fontSize: 20 }}>
                            NYS Subregion
                    </Text>
                    </View>
                    <RNPickerSelect
                        onValueChange={(value) => setCounty(value)}
                        items={countyList}
                        placeholder={{ label: 'Manhattan', value: 'New York' }}
                        Icon={() => {
                            return <Chevron size={2} color={colors.myGreen} />;
                        }}
                        style={{
                            viewContainer: {
                                width: 190,
                                alignContent: 'center'
                            },
                            iconContainer: {
                                top: 12,
                                right: 0,
                            },
                            placeholder: {
                                color: colors.myGreen
                            },
                            inputIOS: {
                                color: colors.myGreen,
                                fontSize: 30,
                            }
                        }}
                        value={currRegion.value}
                    />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: 20 }}>
                    <RatePositive data={data} key={data} />
                </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity onPress={() => {setcurrGraphType('new_positives'), setSelectedGraph('new_positives')}}>
                            <DayChange dataType='new_positives' data={data} key={data} selected={selectedGraph=='new_positives'}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {setcurrGraphType('total_number_of_tests'), setSelectedGraph('total_number_of_tests')}}>
                            <DayChange dataType='total_number_of_tests' data={data} key={data} selected={selectedGraph=='total_number_of_tests'}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity onPress={() => {setcurrGraphType('cumulative_number_of_positives'), setSelectedGraph('cumulative_number_of_positives')}}>
                            <DayChange dataType='cumulative_number_of_positives' data={data} key={data} selected={selectedGraph=='cumulative_number_of_positives'}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {setcurrGraphType('cumulative_number_of_tests'), setSelectedGraph('cumulative_number_of_tests')}}>
                            <DayChange dataType='cumulative_number_of_tests' data={data} key={data} selected={selectedGraph=='cumulative_number_of_tests'}/>
                        </TouchableOpacity>
                    </View>
                <View style={styles.graphContainer}>
                    {loading ?
                        <View style={{ height: 220, justifyContent: 'center' }}>
                            <ActivityIndicator />
                        </View>
                        :
                        <ReactiveLineGraph graphType={currGraphType} data={data} key={`${currGraphType}+${currRegion}`} />
                    }
                </View>
            </View>
        </View>
    )
}






const styles = StyleSheet.create({
    selectRootContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    root_container: {
        justifyContent:"space-between",
        height: '100%'
    },
    contentContainer: {
        height: '89%',
        padding: 10,
        justifyContent:'space-around'
    },
    graphContainer: {
        marginVertical:10,
        alignContent: 'center'
    }
})