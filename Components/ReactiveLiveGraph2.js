import React, { useState, useEffect, useEventListener, handler } from 'react'
import { View, StyleSheet, Text, SafeAreaView, Dimensions, Animated } from 'react-native'
import { Svg, Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg'
import * as path from 'svg-path-properties';
import * as shape from 'd3-shape';
// import d3 from 'd3'

import {
    scaleTime,
    scaleLinear,
    scaleQuantile,
    scaleSymlog,
} from 'd3-scale';



const d3 = {
    shape,
};

// DATA 
const TSCovid = require('../data/CovidTimeSeries.json')



// function getCountyInfo(county) {
//     const thisCountyData = TSCovid.filter(function (covidData) {
//         return covidData.county == county;
//     })

function getMinY() {
    return TSCovid.reduce((min, b) => Math.min(min, b.deaths), TSCovid[0].deaths);
}
function getMaxY() {
    return TSCovid.reduce((max, b) => Math.max(max, b.deaths), TSCovid[0].deaths);
}


function getMinX() {
    // return TSCovid.reduce((min, b) => Math.min(min, b.date), TSCovid[0].date);
    return TSCovid.map(d => d.date)[0];
}
function getMaxX() {
    return TSCovid.map(d => d.date)[TSCovid.length - 1];
}
const graphWidth = Dimensions.get('window').width - 20;
const graphHeight = 200;
const verticalPadding = 10;
const horizontalPadding = 10;
const cursorRadius = 7.5;
const labelWidth = 100;

export default class ReactiveLineGraph2 extends React.Component {
    cursor = React.createRef();

    label = React.createRef();

    state = {
        x: new Animated.Value(0),
    };

    graphWidth = Dimensions.get('window').width - 20;
    graphHeight = 200;
    verticalPadding = 10;
    horizontalPadding = 10;
    cursorRadius = 7.5;
    labelWidth = 100;

    moveCursor(value) {
        const { x, y } = properties.getPointAtLength(lineLength - value);
        this.cursor.current.setNativeProps({ top: y - cursorRadius, left: x - cursorRadius });
        // const label = scaleLabel(scaleY.invert(y));
        // this.label.current.setNativeProps({ text: `${label} CHF` });
    }

    componentDidMount() {
        this.state.x.addListener(({ value }) => this.moveCursor(value));
        this.moveCursor(0);
    }

    render() {
        const graphType = this.props.currGraph
        const { x } = this.state;
        const translateX = x.interpolate({
            inputRange: [0, lineLength],
            outputRange: [graphWidth - labelWidth, 0],
            extrapolate: 'clamp',  });
        const scaleX = scaleTime().domain([new Date(getMinX()), new Date(getMaxX())]).range([0, graphWidth]);
        const scaleY = scaleLinear().domain([0, getMaxY()]).range([graphHeight - verticalPadding, verticalPadding]);
        const scaleLabel = scaleQuantile().domain([0, 300]).range([0, 200, 300]);

        const line = d3.shape.line()
            .x(d => scaleX(new Date(d.date)))
            .y(d => scaleY(d.deaths))
            .curve(d3.shape.curveBasis)(TSCovid);

        const properties = path.svgPathProperties(line);
        const lineLength = properties.getTotalLength();
      


        return (
            <View>

                <SafeAreaView style={styles.graphContainer}>
                    <View style={styles.graph}>
                        <Svg>
                            <Defs>
                                <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="gradient">
                                    <Stop stopColor="red" stopOpacity={0.60} offset="0%" />
                                    <Stop stopColor="red" stopOpacity={0.35} offset="25%" />
                                    <Stop stopColor="red" stopOpacity={0.05} offset="95%" />
                                    <Stop stopColor="red" stopOpacity={0} offset="100%" />
                                </LinearGradient>
                            </Defs>
                            <Path d={line} fill="transparent" stroke="red" strokeWidth='1.5' />
                            <Path d={`${line} L ${graphWidth} ${graphHeight} L 0 ${graphHeight}`} fill="url(#gradient)" />
                            <View ref={this.cursor} style={styles.cursor} />
                        </Svg>
                        <Animated.ScrollView
                            style={StyleSheet.absoluteFill}
                            contentContainerStyle={{ width: lineLength * 2 }}
                            showsHorizontalScrollIndicator={false}
                            scrollEventThrottle={16}
                            bounces={false}
                            onScroll={Animated.event(
                                [
                                    {
                                        nativeEvent: {
                                            contentOffset: { x },
                                        },
                                    },
                                ],
                                { useNativeDriver: true },
                            )}
                            horizontal
                        />
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    graphContainer: {
        alignContent: 'center',
        justifyContent: 'center'

    },
    graph: {
        width: graphWidth,
        height: graphHeight,
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 75,
    },
    cursor: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        borderColor: 'red',
        borderWidth: 2,
        backgroundColor: 'black',

    }
})
