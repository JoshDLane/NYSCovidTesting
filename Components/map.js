import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import Svg from 'react-native-svg'
import { Path, G } from 'react-native-svg'
import { geoMercator, geoPath } from 'd3-geo'
import { dimensions } from '../styles/colors'
import config from '../config'
export default function Map() {
    const NYgeo = require('../data/NY.json');
    const coordinates = require('../data/coordinates')

    const projection = geoMercator()
    const pathBuilder = geoPath(projection);
    const buroughs = ['Bronx', 'New York', 'Queens', 'Richmond', 'Kings']
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const graphheight = dimensions.fullHeight/3.1
  
    async function getNYData() {
        setLoading(true)
        var resp = await fetch(`https://health.data.ny.gov/resource/xdss-u53e.json?$$app_token=${config.APP_TOKEN}`,
            {
                method: 'get',
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
        return Math.max.apply(Math, data.map(function (o) { return o.cumulative_number_of_positives; }));
    };

    const MaxCases = findMaxPositives(data)

    function getPath(pathD) {
        return pathBuilder(pathD)
    };
    function findOpacity(pathD) {
        var paintingCounty = pathD.properties.name;
        var thisCounty = data.filter(function (countyData) {
            return countyData.county == paintingCounty;
        })[0]
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
        }
        else {
            return '.01'
        }
    }
    if (loading) {
        context =
            <View style={{ height: graphheight, alignContent: 'center', justifyContent: 'center' }}>
                <ActivityIndicator />
            </View>
    }
    else {
        context =
            <View style={{flexDirection:'row', justifyContent:'center', alignContent:'center', width:'100%'}}>
                <Svg width={graphheight*1.333} height={graphheight} viewBox="266 110.5 23 16.5">

                    <G>
                        {NYgeo.features.map(
                            (pathD, i) =>
                                <React.Fragment key={`${pathD.properties.name}+${Math.random()}`}>
                                    <Path
                                        fill='white'
                                        opacity='1'
                                        d={getPath(pathD)}
                                        key={`${pathD.properties.name}+${Math.random()}`} />
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
                </Svg>
            </View>

    }

    return (

        <View style={styles.mapContainer}>
            {context}
        </View>
    )
}

const styles = StyleSheet.create({
    mapContainer: {
        alignContent: 'center',
        justifyContent: 'center',
    }
})
