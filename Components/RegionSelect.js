import React from 'react';
import {View, Text, StyleSheet} from 'react-native';



export default function RegionSelect(props) {

    return (
        <View style={styles.regionContainer}>
            <Text style={styles.regionTitle}>
                NYS Subregion
                    </Text>
            <Text style={styles.currentRegion}>
                {props.currentCounty}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    regionContainer: {
        flexDirection: 'row',
        width: 1000,
        marginTop: 50,
    },
    regionTitle: {
        color: 'white',
        fontSize: 18,
        margin: 5
    },
    currentRegion: {
        color: '#52e4c2',
        fontSize: 18,
        margin: 5,
    },

})