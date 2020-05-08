import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ShadowPropTypesIOS } from 'react-native'
import Map from '../Components/map'
import UpdateStatus from '../Components/UpdateStatus'
import EnterDataButton from '../Components/EnterDataButton'
import CVBanner from '../Components/CVBanner'
import DayChange from '../Components/DayChange'
import RatePositive from '../Components/RatePositive'
import config from '../config'

export default function NYOverview(props) {
    const [data, setData] = useState([])
    const [recentData, setRecentData] = useState([])
    const [loading, setLoading] = useState(false)

    async function getNYData() {
        setLoading(true)
        var resp = await fetch(`https://health.data.ny.gov/resource/xdss-u53e.json?$$app_token=${config.APP_TOKEN}`,
            {
                method: 'get'
            });
        var respJson = await (resp.json())
        respJson.sort((a, b) => (a.test_date > b.test_date) ? 1 : -1)
        let recentDate = respJson.map(d => d.test_date)[respJson.length - 1]
        var myrecentData = await respJson.filter(county => county.test_date === recentDate)
        setData(respJson)
        setRecentData(myrecentData)
        setLoading(false)
    }

    useEffect(() => {
        getNYData()
    }, []);

    return (
        <View style={styles.root_container}>
            <View style={{ height: '10%' }}>
                <CVBanner />
            </View>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <UpdateStatus date={recentData.map(d => d.test_date)[recentData.length - 1]} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: 20, marginTop: 10, }}>
                    <RatePositive data={data} type='stateLevel' isLoading={loading} stateLevel={true} />
                </View>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <DayChange dataType='new_positives' data={recentData} state='true' isLoading={loading} />
                        <DayChange dataType='total_number_of_tests' data={recentData} state='true' isLoading={loading} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <DayChange dataType='cumulative_number_of_positives' data={recentData} state='true' isLoading={loading} />
                        <DayChange dataType='cumulative_number_of_tests' data={recentData} state='true' isLoading={loading} />
                    </View>
                </View>
                <Map />
                <View style={{ alignContent: 'center' }}>
                    <TouchableOpacity style={{marginBottom:0}} onPress={props.onButtonClick}>
                        <EnterDataButton />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: '89%',
        paddingTop: 10,
        paddingHorizontal: 10,
        paddingVertical:10,
        justifyContent: 'space-around'

    },
    root_container: {
        height: '100%'
    }
})