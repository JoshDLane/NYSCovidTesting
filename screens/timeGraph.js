import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import ReactiveLineGraph from '../Components/ReactiveLineGraph'
import DayChange from '../Components/DayChange'
import RegionSelect from '../Components/RegionSelect'
import InfectionRate from '../Components/InfectionRate'
import CVBanner from '../Components/CVBanner'

const TSCovid = require('../data/CovidTimeSeries.json')



export default function TimeGraph(props) {
    const [currGraphType, setcurrGraphType] = useState('cumulative_number_of_positives')
    const [currRegion, setCurrRegion] = useState('Albany')
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    async function getNYData(region) {
        var county = 'Kings'
        setLoading(true)
        var resp = await fetch(`https://health.data.ny.gov/resource/xdss-u53e.json?county=${county}`,
            {
                method: 'get',
                headers: new Headers({
                    "$$app_token": "weiei1vq5gb6wqtlqnvhqg1",
                })
            });
        var respJson = await (resp.json())

        respJson.sort((a, b) => (a.test_date > b.test_date) ? 1 : -1)
        setData(respJson)
        console.log(respJson)
        setLoading(false)
    }

    useEffect(() => {
        getNYData('Bronx')
    }, []);

    const countyList = [
        {
            label: 'Kings',
            value: 'Kings',
        },
        {
            label: 'Manhattan',
            value: 'New York'
        }
    ]
    function setCounty(value) {
        setCurrRegion(value)

    }

    let data2 = [{
        value: 'Banana',
    }, {
        value: 'Mango',
    }, {
        value: 'Pear',
    }];

    return (
        <View style={styles.root_container}>
            <CVBanner backToHome={props.onBackButtonClick} />
            <View style={styles.container}>
                <View>
                    <RegionSelect currentCounty={currRegion} />
                </View>
                <View>
                    {/* <Dropdown
                        label='Favorite Fruit'
                        data={data2}
                    />
                    <Dropdown
                        value={'Kings'}
                        data={countyList}
                        pickerStyle={{ borderBottomColor: 'white', borderWidth: 0 }}
                        dropdownOffset={{ 'top': 0 }}
                        containerStyle={styles.dropdown}
                        onChangeText={(value) => {setCounty(value)}}
                    /> */}

                </View>
                {/* <View style={{ marginTop: 25, marginRight: 15 }}>
                    <InfectionRate />
                </View> */}
                <View style={styles.updatesContainer}>
                    <View style={{ marginTop: 20, marginLeft: 0 }}>
                        <TouchableOpacity onPress={() => setcurrGraphType('new_positives')}>
                            <DayChange dataType='new_positives' data={data} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setcurrGraphType('total_number_of_tests')}>
                            <DayChange dataType='total_number_of_tests' data={data} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 20, marginLeft: 0 }}>
                        <TouchableOpacity onPress={() => setcurrGraphType('cumulative_number_of_positives')}>
                            <DayChange dataType='cumulative_number_of_positives' data={data} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setcurrGraphType('cumulative_number_of_tests')}>
                            <DayChange dataType='cumulative_number_of_tests' data={data} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.graphContainer}>
                    {loading ? <ActivityIndicator /> : <ReactiveLineGraph graphType={currGraphType} data={data} key={currGraphType} />
                    }
                </View>
            </View>
        </View>
    )
}






const styles = StyleSheet.create({
    dropdown: {
        width: '80%',
    },
    root_container: {
        width: '100%',
        height: 1000,
        backgroundColor: 'black',
    },
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