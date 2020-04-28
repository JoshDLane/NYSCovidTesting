import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Svg, Path, Circle, G } from 'react-native-svg'
import * as d3 from 'd3'


polar_to_cartesian = function(cx, cy, radius, angle) {
    var radians;
    radians = (angle - 90) * Math.PI / 180.0;
    return [Math.round((cx + (radius * Math.cos(radians))) * 100) / 100, Math.round((cy + (radius * Math.sin(radians))) * 100) / 100];
  };

  svg_arc_path = function(x, y, radius, start_angle, end_angle) {
    var end_xy, start_xy;
    start_xy = polar_to_cartesian(x, y, radius, end_angle);
    end_xy = polar_to_cartesian(x, y, radius, start_angle);
    return "M " + start_xy[0] + " " + start_xy[1] + " A " + radius + " " + radius + " 0 0 0 " + end_xy[0] + " " + end_xy[1];
  };
  
export default function InfectionRateGraphic() {
    return (
        <View>
            <Svg width='60' height='50' viewBox="0 0 1000 500">
                <Path strokeWidth="100" fill="none" stroke="green" d="M 950 500 A 450 450 0 0 0 50 500"/>


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