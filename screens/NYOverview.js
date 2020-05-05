import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ShadowPropTypesIOS } from 'react-native'
import Map from '../Components/map'
import UpdateStatus from '../Components/UpdateStatus'
import EnterDataButton from '../Components/EnterDataButton'
import CVBanner from '../Components/CVBanner'
import DayChange from '../Components/DayChange'
import RatePositive from '../Components/RatePositive'
export default function NYOverview(props) {
    const [data, setData] = useState([])
    const [recentData, setRecentData] = useState([])
    const [loading, setLoading] = useState(false)
    const [recentDate, setRecentDate] = useState('')
    const [nyNewPos, setNYNewPos] = useState('')
    const [nyNewTests, setnyNewTests] = useState('')
    const [nyTotPos, setnyTotPos] = useState('')
    const [nyTotTests, setnyTotTests] = useState('')

    async function getNYData() {
        setLoading(true)
        var resp = await fetch(`https://health.data.ny.gov/resource/xdss-u53e.json`,
            {
                method: 'get',
                headers: new Headers({
                    "$$app_token": "weiei1vq5gb6wqtlqnvhqg1",
                })
            });
        var respJson = await (resp.json())
        respJson.sort((a, b) => (a.test_date > b.test_date) ? 1 : -1)
        let recentDate = respJson.map(d => d.test_date)[respJson.length - 1]
        var myrecentData = await respJson.filter(county => county.test_date === recentDate)
        setRecentDate(recentDate)
        setRecentData(myrecentData)
        console.log('rec date', respJson)
        setLoading(false)
    }

    useEffect(() => {
        getNYData()
    }, []);

    return (
        <View style={styles.background}>
            <CVBanner />
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingRight: 30 }}>
                    <UpdateStatus date={recentData.map(d => d.test_date)[recentData.length - 1]} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: 20 }}>
                        <RatePositive data={recentData} type='stateLevel' isLoading={loading}/>
                </View>
                <View style={{ marginHorizontal: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity onPress={() => setcurrGraphType('new_positives')}>
                            <DayChange dataType='new_positives' data={recentData} state='true' isLoading={loading}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setcurrGraphType('total_number_of_tests')}>
                            <DayChange dataType='total_number_of_tests' data={recentData} state='true' isLoading={loading}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity onPress={() => setcurrGraphType('cumulative_number_of_positives')}>
                            <DayChange dataType='cumulative_number_of_positives' data={recentData} state='true' isLoading={loading}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setcurrGraphType('cumulative_number_of_tests')}>
                            <DayChange dataType='cumulative_number_of_tests' data={recentData} state='true' isLoading={loading}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <View style={{ marginTop: -150 }}>
                        <Map />
                    </View>
                    <View style={{ alignContent: 'center', marginTop: -140 }}>
                        <TouchableOpacity onPress={props.onButtonClick}>
                            <EnterDataButton />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingHorizontal:10,
        justifyContent: 'space-around'

    },
    background: {
    }
})