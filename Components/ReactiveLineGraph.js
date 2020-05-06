import React, { useState, useEffect, useEventListener, handler } from 'react'
import { ActivityIndicator, View, StyleSheet, Text, SafeAreaView, Dimensions, Animated, TextInput } from 'react-native'
import { Svg, Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg'
import * as path from 'svg-path-properties';
import * as shape from 'd3-shape';
import {colors, dimensions} from '../styles/colors'
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

const graphWidth = dimensions.fullWidth - 20;
const graphHeight = dimensions.fullHeight/4;
const verticalPadding = 10;
const horizontalPadding = 10;
const cursorRadius = 7.5;
const labelWidth = 100;
export default class ReactiveLineGraph extends React.Component {
    
    cursor = React.createRef();

    label = React.createRef();

    state = {
        x: new Animated.Value(0),
        loading: false,
        scaleX: scaleTime().domain([new Date(this.getMinX()), new Date(this.getMaxX())]).range([0, graphWidth]),
        scaleY: scaleLinear().domain([0, this.getMaxY()]).range([graphHeight - verticalPadding, verticalPadding]),
    };

    line = d3.shape.line()
    .x(d => this.state.scaleX(new Date(d.test_date)))
    .y(d => this.state.scaleY(d[this.props.graphType]))
    .curve(d3.shape.curveLinear)(this.props.data);

    y_values = this.props.data.map(d => d[this.props.graphType])
    x_values = this.props.data.map(d => d['test_date'])
    // maxDate = this.x_values[this.x_values.length - 1]
    // minDate = this.x_values[1]

    
    scaleLabel = scaleQuantile().domain([0, Math.max(...this.y_values)]).range(this.y_values);
    // scaleDate = scaleQuantile().domain([this.minDate, this.maxDate]).range(this.x_values);

    findValue(date) {
        var mydate = new Date(date)
        mydate.setUTCHours(0,0,0,0);
        mydate = mydate.toISOString().slice(0,-1)
        return this.props.data.find(d => d['test_date'] === mydate)[this.props.graphType]
    }
    getMinY() {
    return this.props.data.reduce((min, b) => Math.min(min, b[this.props.graphType]), this.props.data[0][this.props.graphType]);
}
    getMaxY() {
    return this.props.data.reduce((max, b) => Math.max(max, b[this.props.graphType]), this.props.data[0][this.props.graphType]);
}
    arrangeDate(date) {
        var currDate = new Date(date)
        return `${currDate.getUTCMonth()}/${currDate.getUTCDate()+1}`

    }

    getMinX() {
    // return TSCovid.reduce((min, b) => Math.min(min, b.date), TSCovid[0].date);
    return this.props.data.map(d => d.test_date)[0];
}
    getMaxX() {
    return this.props.data.map(d => d.test_date)[this.props.data.length - 1];
}

    properties = path.svgPathProperties(this.line);
    lineLength = this.properties.getTotalLength();
    moveCursor(value) {
        const { x, y } = this.properties.getPointAtLength(this.lineLength - value);
        this.cursor.current.setNativeProps({ top: y - cursorRadius, left: x - cursorRadius });
        const date = this.state.scaleX.invert(x)
        const label = this.findValue(date)
        this.label.current.setNativeProps({ text: `${this.arrangeDate(date)}  ${label}` });
    }

    componentDidMount() {
        if (this.state.loading == false) {
            this.state.x.addListener(({ value }) => this.moveCursor(value));
            this.moveCursor(0);
        }
    }

    render() {

    let data2 = [{
        value: 'Banana',
    }, {
        value: 'Mango',
    }, {
        value: 'Pear',
    }];

        const graphType = this.props.currGraph
        const { x } = this.state;
        const translateX = x.interpolate({
            inputRange: [0, this.lineLength],
            outputRange: [graphWidth - labelWidth, 0],
            extrapolate: 'clamp',
        });
        if (this.state.loading == true) {
            return (
                <View styel={styles.graphContainer}>
                    <ActivityIndicator/>
                </View>
            )

        }

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
                                <Path d={this.line} fill="transparent" stroke="red" strokeWidth='1.5' />
                                <Path d={`${this.line} L ${graphWidth} ${graphHeight} L 0 ${graphHeight}`} fill="url(#gradient)" />
                                <View ref={this.cursor} style={styles.cursor} />
                            </Svg>
                            <Animated.View style={[styles.label, { transform: [{ translateX }]}]}>
                                <TextInput style={{color: '#c0c0c0ff', textAlign: 'center', fontSize: 15}} ref={this.label}/>
                            </Animated.View>
                            <Animated.ScrollView
                                style={StyleSheet.absoluteFill}
                                contentContainerStyle={{ width: this.lineLength * 2 }}
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
    },
    cursor: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        borderColor: 'red',
        borderWidth: 2,
        backgroundColor: 'black',

    },
    label: {
        position: 'absolute',
        top: -15,
        left: 0,
        width: labelWidth,
    }
})
