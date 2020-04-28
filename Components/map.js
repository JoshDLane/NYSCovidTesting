import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedbackBase } from 'react-native'
import Svg from 'react-native-svg'
import { Circle, Path, G } from 'react-native-svg'
import d3 from 'd3'
import { geoMercator, geoPath } from 'd3-geo'

export default function Map() {
    const NYgeo = require('../data/NY.json');
    const NYData = require('../data/NYCovid.json')

    const projection = geoMercator()
    const pathBuilder = geoPath(projection);
    const buroughs = ['Bronx', 'New York', 'Queens', 'Richmond', 'Kings']
    function findMaxDeaths(NYData) {
        console.log('doing max')
        return Math.max.apply(Math, NYData.map(function (o) { return o.deaths; }));
    };

    // const MaxDeaths = (NYData) => {
    //     return Math.max.apply(Math, NYData.map(function(o) { return o.deaths; }))
    // }
    const MaxDeaths = findMaxDeaths(NYData)
    console.log(MaxDeaths)

    function getPath(pathD) {
        return pathBuilder(pathD)
    };

    function circleX(county) {
        return projection([county.Longitude, county.Latitude])[0]
        console.log('drawing circle')
    }

    function circleY(county) {
        return projection([county.Longitude, county.Latitude])[1]
    }

    function findOpacity(pathD) {
        var paintingCounty = pathD.properties.name;
        if (buroughs.includes(paintingCounty)) {
            var thisCounty = NYData.filter(function (countyData) {
                return countyData.county == 'New York City';
            })[0]
            console.log('here')
            console.log(paintingCounty)

        }
        else {
            var thisCounty = NYData.filter(function (countyData) {
                return countyData.county == paintingCounty;
            })[0]
        }
        if (thisCounty) {
            var normDeath = (thisCounty.deaths / MaxDeaths) + .2
            return normDeath.toFixed(2).toString()
        }
        else {
            return '.1'
        }
    }

    function getRadius(county) {
        if (county.county == 'New York City') {
            return county.deaths/1500
        }
        else {
        return county.deaths/350
        }
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
                <G>
                    {NYData.map(
                        (CData, i) =>
                            <Circle
                                cx={circleX(CData)}
                                cy={circleY(CData)}
                                r={getRadius(CData)}
                                stroke='black'
                                fill='red'
                                strokeWidth='.1'
                                opacity='.25'

                            />
                    )}
                </G>

            </Svg>
        </View>
    )
}

const styles = StyleSheet.create({
    mapContainer: {
        marginTop: 85,
    }
})
