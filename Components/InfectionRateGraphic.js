import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Svg, Path, Circle, G } from 'react-native-svg'
import * as d3 from 'd3'

const perc = .9;
const numSections = 1;
const sectionPerc = 1 / numSections / 2;
const padRad = 0.025;
const chartInset = 10;

// Orientation of gauge:
totalPercent = .75;

const margin = {
    top: 10,
    right: 10,
    bottom: 15,
    left: 10
};

const width = 75;
const height = 30;
const radius = Math.min(width, height) / 2;
const barWidth = 40 * width / 300;


/*
  Utility methods 
*/
percToDeg = function (perc) {
    return perc * 360;
};

percToRad = function (perc) {
    return degToRad(percToDeg(perc));
};

degToRad = function (deg) {
    return deg * Math.PI / 180;
};

const arc2 = d3.arc().outerRadius(radius - chartInset).innerRadius(radius - chartInset - barWidth)
const arc1 = d3.arc().outerRadius(radius - chartInset).innerRadius(radius - chartInset - barWidth)

repaintGauge = function (perc) {
    var next_start = totalPercent;
    arcStartRad = percToRad(next_start);
    arcEndRad = arcStartRad + percToRad(perc / 2);
    next_start += perc / 2;


    arc1.startAngle(arcStartRad).endAngle(arcEndRad);

    arcStartRad = percToRad(next_start);
    arcEndRad = arcStartRad + percToRad((1 - perc) / 2);

    arc2.startAngle(arcStartRad + padRad).endAngle(arcEndRad);
}


const Tlen = width / 3;
const Tradius = Tlen / 6;
function recalcPointerPos() {
        thetaRad = percToRad(perc / 2);
        centerX = 0;
        centerY = 0;
        topX = centerX - Tlen * Math.cos(thetaRad);
        topY = centerY - Tlen * Math.sin(thetaRad);
        leftX = centerX - Tlen * Math.cos(thetaRad - Math.PI / 2);
        leftY = centerY - Tlen * Math.sin(thetaRad - Math.PI / 2);
        rightX = centerX - Tlen * Math.cos(thetaRad + Math.PI / 2);
        rightY = centerY - Tlen * Math.sin(thetaRad + Math.PI / 2);
        return "M " + leftX + " " + leftY + " L " + topX + " " + topY + " L " + rightX + " " + rightY;
    }

export default function InfectionRateGraphic() {
    return (
        <View>
            <Svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
                <Circle cx='0' cy='0' r={width/18} fill='white'
                />
                {/* <Path
                d={recalcPointerPos()}
                fill='red'/> */}
                <Path stroke-width="75" fill="none" stroke="#3498db" d="M 950 500 A 450 450 0 0 0 50 500"/>


                {/* <G transform='translate(42.5, 20)'>
                    <Path fill='red' d={arc1} />
                    <Path fill='green' d={arc2} />
                </G> */}
                {/* <Circle
                    cx='0'
                    xy='0'
                    r={width/18}
                    fill='#464A4F' /> */}
            </Svg>
        </View>
    )
}


const styles = StyleSheet.create({
    power_gauge_arc: {

    },
    power_gauge_pointer: {
    },
    power_gauge_text: {
    },
})