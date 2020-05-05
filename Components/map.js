import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import Svg from 'react-native-svg'
import { Circle, Path, G } from 'react-native-svg'
import { geoMercator, geoPath } from 'd3-geo'
import { colors } from '../styles/colors'

export default function Map() {
    const NYgeo = require('../data/NY.json');
    const coordinates = require('../data/coordinates')

    const projection = geoMercator()
    const pathBuilder = geoPath(projection);
    const buroughs = ['Bronx', 'New York', 'Queens', 'Richmond', 'Kings']
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

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
        recentDate = respJson.map(d => d.test_date)[respJson.length - 1]
        var recentData = respJson.filter(function (e) {
            return e.test_date == recentDate;
        });
        setData(recentData)
        setLoading(false)
    }

    useEffect(() => {
        getNYData()
    }, []);


    function findMaxPositives(data) {
        console.log('doing max')
        return Math.max.apply(Math, data.map(function (o) { return o.cumulative_number_of_positives; }));
    };

    // const MaxDeaths = (NYData) => {
    //     return Math.max.apply(Math, NYData.map(function(o) { return o.deaths; }))
    // }
    const MaxCases = findMaxPositives(data)

    function getPath(pathD) {
        return pathBuilder(pathD)
    };

    function circleX(county) {
        return projection([coordinates[county].Longitude, coordinates[county].Latitude])[0]
        console.log('drawing circle')
    }

    function circleY(county) {
        return projection([coordinates[county].Longitude, coordinates[county].Latitude])[1]
    }

    function findOpacity(pathD) {
        var paintingCounty = pathD.properties.name;
        // if (buroughs.includes(paintingCounty)) {
        //     var thisCounty = NYData.filter(function (countyData) {
        //         return countyData.county == 'New York City';
        //     })[0]
        //     console.log('here')
        //     console.log(paintingCounty)

        // }
        // else {
        var thisCounty = data.filter(function (countyData) {
            return countyData.county == paintingCounty;
        })[0]
        // }
        if (thisCounty) {
            if (thisCounty.cumulative_number_of_positives > 20000) {
                return '.9'
            }
            else if (thisCounty.cumulative_number_of_positives > 15000) {
                return '.75'
            }
            else if (thisCounty.cumulative_number_of_positives > 10000) {
                return '.65'
            }
            else if (thisCounty.cumulative_number_of_positives > 5000) {
                return '.55'
            }
            else if (thisCounty.cumulative_number_of_positives > 1000) {
                return '.35'
            }
            else if (thisCounty.cumulative_number_of_positives > 500) {
                return '.25'
            }
            else if (thisCounty.cumulative_number_of_positives > 100) {
                return '.15'
            }
            else {
                return '.1'
            }
            // var normCases = (thisCounty.cumulative_number_of_positives / 10000)
            // return normCases.toFixed(2).toString()
        }
        else {
            return '.01'
        }
    }

    function getRadius(county) {
        return county.cumulative_number_of_positives / 350
    }
    if (loading) {
        context =
            <View style={{ height: 500, alignContent: 'center', justifyContent: 'center' }}>
                <ActivityIndicator />
            </View>
    }
    else {
        context =
            <Svg width="500" height="500" viewBox="265 110 30 30">
                {/* <Circle 
                cx='0'
                cy='0'
                r = '1000'
                fill='black'
                opacity='.90'/> */}

                <G>
                    {NYgeo.features.map(
                        (pathD, i) =>
                            <React.Fragment key={`${pathD.properties.name}+${Math.random()}`}>
                                <Path
                                    fill='white'
                                    opacity='1'
                                    d={getPath(pathD)}
                                    key={`${pathD.properties.name}+${Math.random()}`} />
                                {/* <Path
                                    fill={colors.myOrange}
                                    opacity='.01'
                                    d={getPath(pathD)}
                                    key={`${pathD.properties.name}+${i}`} /> */}
                                <Path
                                    fill='red'
                                    opacity={findOpacity(pathD)}
                                    stroke='black'
                                    strokeWidth='.1'
                                    d={getPath(pathD)}
                                    key={`${pathD.properties.name}+${Math.random()}`} />
                                <Path
                                    stroke='black'
                                    strokeWidth='.1'
                                    opacity='.5'
                                    d={getPath(pathD)}
                                    key={`${pathD.properties.name}+${Math.random()}`} />
                            </React.Fragment>
                    )}
                </G>
                
                {/* <G>
                    {data.map(
                        (CData, i) =>
                            <Circle
                                cx={circleX(CData.county)}
                                cy={circleY(CData.county)}
                                r={getRadius(CData)}
                                stroke='black'
                                fill='red'
                                strokeWidth='.1'
                                opacity='.25'

                            />
                    )}
                    </G> */}
            </Svg>
    }

    return (

        <View style={styles.mapContainer}>
            {context}
        </View>
    )
}

const styles = StyleSheet.create({
    mapContainer: {
        marginTop: 85,
    }
})
