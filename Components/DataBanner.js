import React from 'react'
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native'
import {colors, dimensions} from '../styles/colors'

export default function DataBanner () {
    return(
            <View style={styles.container}>
                <Text style={styles.text}>
                    All Data is provided directly by The New York State Department of Health.
                    Click to see more information on the data source.
                </Text>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: dimensions.fullHeight*.075,
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: '#373636',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})