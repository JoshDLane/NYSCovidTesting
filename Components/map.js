import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedbackBase } from 'react-native'
import Svg from 'react-native-svg'
import { Circle, Path, G } from 'react-native-svg'
import d3 from 'd3'
import { geoMercator, geoPath } from 'd3-geo'

export default function Map() {
    const NYgeo = require('../data/NY.json');
    const NYData = require('../data/NYCovid.json')
    const coordinates = require('../data/coordinates')

    const projection = geoMercator()
    const pathBuilder = geoPath(projection);
    const buroughs = ['Bronx', 'New York', 'Queens', 'Richmond', 'Kings']
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    async function getNYData(region) {
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
        console.log('recent date', recentDate)
        console.log('recent data', recentData)
        setLoading(false)
    }


    useEffect(() => {
        getNYData('Bronx')
    }, []);


    function findMaxPositives(data) {
        console.log('doing max')
        return Math.max.apply(Math, data.map(function (o) { return o.cumulative_number_of_positives; }));
    };

    // const MaxDeaths = (NYData) => {
    //     return Math.max.apply(Math, NYData.map(function(o) { return o.deaths; }))
    // }
    const MaxCases = findMaxPositives(data)
    console.log(MaxCases)

    function getPath(pathD) {
        return pathBuilder(pathD)
    };

    function circleX(county) {
        console.log(county)
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
            var normCases = (thisCounty.cumulative_number_of_positives / 10000)
            return normCases.toFixed(2).toString()
        }
        else {
            return '.01'
        }
    }

    function getRadius(county) {
        return county.cumulative_number_of_positives/350
    }


    return (
        <View style={styles.mapContainer}>
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
                            <Path
                                fill='white'
                                opacity='.7'
                                d={getPath(pathD)}
                                key={pathD} />
                    )}
                </G>
                <G>
                    {NYgeo.features.map(
                        (pathD, i) =>
                            <Path
                                fill='blue'
                                opacity={findOpacity(pathD)}
                                stroke='black'
                                strokeWidth='.1'
                                d={getPath(pathD)}
                                key={pathD} />
                    )}
                </G>
                <G>
                    {NYgeo.features.map(
                        (pathD, i) =>
                            <Path
                                stroke='black'
                                strokeWidth='.1'
                                opacity='.5'
                                d={getPath(pathD)}
                                key={pathD} />
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
        </View>
    )
}

const styles = StyleSheet.create({
    mapContainer: {
        marginTop: 85,
    }
})
